---
description: Humans is a decentralized blockchain governed by its community members.
---

# ⚖ Governance and HEART

Governance is an on-chain process by which members of the Humans Ecosystem can come to consensus and influence changes in the protocol by voting on "**proposals**".  {synopsis}

Participants can stake HEART to vote on proposals and the amount of HEART staked corresponds 1-to-1 with voting power.

## Lifecycle of a Proposal

**Right to submit a proposal:** All $HEART holders, irrespective if their tokens are bonded or unbonded, can submit proposals by sending a `TxGovProposal` transaction.  Once submitted, a proposal can be identified by its unique `proposalID`.

The governance process is divided into the following steps:

* **Proposal submission:** Proposal is submitted to the blockchain with a deposit. When the deposit reaches the `MinDeposit`, the proposal gets confirmed and the voting period begins.
  * **Claiming deposit:** Users that deposited on proposals can recover their deposits if the proposal is ACCEPTED or if the proposal never reaches the voting period.
* **Vote:**  During the voting period, bonded HEART holders (i.e. stakers) can then send `TxGovVote` transactions to vote on the proposal. When a threshold amount of support is reached, the following can occur:
  * Inheritance and penalties: Delegators inherit their validator's vote if they don't vote themselves.
* If the proposal involves a software upgrade:
  * **Signal:** Validators start signaling that they are ready to switch to the new version.
  * **Switch:** When more than 67% of validators signal that they are ready to switch to the software upgrade, their software automatically upgrades to the new version.x`


### ⚖️ — Deposit

To avoid spamming, proposals must be submitted with a deposit in the coins defined in the `MinDeposit` param. The voting period begins only when the proposal's deposit equals `MinDeposit`.

When a proposal is submitted, it needs to be accompanied by a deposit that has a positive value. The initial deposit can be inferior to the `MinDeposit` param.  The initial submitter isn't required to pay the entire deposit on their own. If a proposal's deposit is lower than the `MinDeposit`, other token holders can contribute to the proposal's deposit by sending a `Deposit` transaction. The deposit is kept in an escrow in the governance `ModuleAccount` until the proposal is finalized (passed or rejected).

When the proposal's deposit equals the value of `MinDeposit`, the proposal enters the voting period. If a proposal's deposit does not equal the value of `MinDeposit` before the `MaxDepositPeriod` expires, proposal closes and nobody can deposit on it anymore.

#### Deposit refund and burn

When a proposal is finalized, the coins from the deposit are either refunded or burned, according to the final tally of the proposal:

* If the proposal is approved or if it's rejected but _not_ vetoed, the deposits will automatically be refunded to their respective depositor (transferred from the governance `ModuleAccount` to the depositor's wallet).
* When the proposal is vetoed with a supermajority, the deposits get burned from the governance `ModuleAccount`.

### ⚖️ — Voting

#### Participants

_Participants_ are users that have the right to vote on proposals. In the Cosmos Hub, participants are bonded HEART stakers. Unbonded HEART holders and other users do not get the right to participate in governance. However, they are able to submit and deposit on proposals.

Note that some _participants_ can be prohibited from voting on a proposal under a certain validator if the participant has:

* bonded or unbonded HEART to the respective validator after the proposal entered the voting period.
* achieved validator status after the proposal enters the voting period

This does not prevent _participant_ to vote with HEART bonded to other validators. For example, suppose there are two validators: `valA` and `valB`. Suppose a _participant_ bonds some $HEART to `valA` before a proposal enters voting period and bonds other $HEART to `valB` after the proposal enters its voting period. In that case, the vote made under `valB` will be prohibited.

#### Voting period

When a proposal's deposit equals the value of `MinDeposit`, it immediately enters `Voting period`. The `Voting period` is defined as the time interval between the moment the vote begins and the moment the vote closes. To prevent double voting, the `Voting period` should always be shorter than `Unbonding period`. The initial value of `Voting period` is 3 days.

#### Option set

The _option set_ of a proposal  indicates a set of choices participants can choose when casting their vote.

The initial option set includes the following options:

* `Yes`
* `No`
* `NoWithVeto`
* `Abstain`

`NoWithVeto` counts as `No` but also adds a `Veto` vote. With the `Abstain` option, voters signal that they do not intend to vote in favor or against the proposal but accept the final result of the vote.

#### Weighted Votes

ADR-037 introduced the weighted vote feature that allows a staker to split their votes into more voting options. For example, a user can use 70% of his voting power to vote Yes and 30% of his voting power to vote No.


It's not unusual for an address to be owned by more than one individual. For example, a company can have multiple stakeholders who want to vote differently. In this scenario, it makes sense to allow them to split their voting power. Currently, they can't do "passthrough voting" and give their users voting rights over their tokens. However, the system allows exchanges to poll their users for voting preferences and vote on-chain proportionally to the results of the poll.


To represent weighted vote on chain, we use the following [Protobuf](https://developers.google.com/protocol-buffers/docs/overview) message.

```protobuf
// WeightedVoteOption defines a unit of vote for vote split.
message WeightedVoteOption {
  VoteOption option = 1;
  string     weight = 2 [
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable)   = false,
    (gogoproto.moretags)   = "yaml:\"weight\""
  ];
}
```

For a weighted vote to be valid, the `options` field must not contain duplicate vote options, and the sum of weights of all options must be equal to 1.

```protobuf
// Vote defines a vote on a governance proposal.
// A Vote consists of a proposal ID, the voter, and the vote option.
message Vote {
  option (gogoproto.goproto_stringer) = false;
  option (gogoproto.equal)            = false;

  uint64 proposal_id = 1 [(gogoproto.moretags) = "yaml:\"proposal_id\""];
  string voter       = 2;
  reserved 3;
  reserved "option";
  repeated WeightedVoteOption options = 4 [(gogoproto.nullable) = false];
}
```

References - Cosmos-SDK `gov` module protos: [\[WeightedVoteOption\]](https://github.com/cosmos/cosmos-sdk/blob/v0.43.0-alpha1/proto/cosmos/gov/v1beta1/gov.proto#L32-L40) [\[Vote\]](https://github.com/cosmos/cosmos-sdk/blob/v0.43.0-alpha1/proto/cosmos/gov/v1beta1/gov.proto#L126-L137)&#x20;

#### Quorum

A quorum is defined as the minimum percentage of voting power that needs to be cast on a proposal for the result to be valid.

#### Threshold

A threshold represents the minimum proportion of `Yes` votes (excluding `Abstain` votes) for the proposal to be accepted.

Initially, the threshold is set at 50% with a possibility to veto if more than 1/3rd of votes (excluding `Abstain` votes) are `NoWithVeto` votes. This means that proposals are accepted if the proportion of `Yes` votes (excluding `Abstain` votes) at the end of the voting period is more than 50% and if the proportion of `NoWithVeto` votes is less than 1/3 (excluding `Abstain` votes).

#### Inheritance

If a delegator does not vote, it will inherit its validator vote.

* If the delegator votes before his validator, he will not inherit the validator's vote.
* If the delegator votes after his validator, he will override his validator's vote with his own.
* If the proposal is urgent, the vote may close before the delegators have a chance to react and override their validator's vote. This is not an issue because proposals require more than 2/3rd of the total voting power to pass before the end of the voting period. If more than 2/3rd of validators collude, they can censor the votes of delegators anyway.

#### Validator’s punishment for non-voting

At present, validators are not punished for failing to vote.

#### Governance address

Later, we may add permission keys that can only sign _txs_ from certain modules. For the MVP, the `Governance address` will be the main validator address generated during the account creation. This address corresponds to a PrivKey, different from the Tendermint PrivKey, which is responsible for signing consensus messages. As such, Validators do not have to sign governance transactions with the sensitive Tendermint PrivKey.

### ⚖️ — Software Upgrades

If proposals are of type `SoftwareUpgradeProposal`, nodes are required to upgrade their software to the new version that was voted on. This process is divided into 2 steps:

#### Signal

After a `SoftwareUpgradeProposal` is accepted, validators need to download and install the new version of the software while continuing to run the previous version. Once a validator downloads and installs the upgrade, he will start signaling to the network that he is ready to switch by including the proposal's proposalID in his _pre-commits_.

Note: There is only one signal slot per _pre-commit_. If several `SoftwareUpgradeProposals` are accepted in a short time frame, a pipeline will form, and each of the proposals will be implemented one after the other in the order they were accepted.

#### Switch

Once a block contains more than 2/3rd _pre-commits_ where a common `SoftwareUpgradeProposal` is signaled, all the nodes (including validator nodes, non-validating full nodes and light nodes) are expected to switch to the new version of the software.