---
order: 1
---

# 🤖 Validate on Testnet

Instructions for running a validator node on the Humans testnet. {synopsis}
::: tip
To begin, please follow the [instructions to join the testnet](/run-nodes/testnet/joining-testnet.html).
:::
## Install the `humansd` binary

Currently, the source code is not yet public, so pre-compiled binaries are required to run validator nodes.
Please follow the binary installation instructions if you have not already. 

#### Save the Chain ID to your `humansd` config

We recommend saving the `chain-id` into your `client.toml`. 
This prevents you from having to pass the `chain-id` flag with every CLI command.

```sh
humansd config chain-id testnet-1
```

## Send a `create-validator` transaction

Every network participant in the network can become a validator by sending a `create-validator` transaction. You will be required to specify the following parameters:

- **`commission-max-change-rate`**: The maximum daily increase of the validator commission. This parameter is fixed cannot be changed after the `create-validator` transaction is processed.
- **`commission-max-rate`**: The maximum commission rate that this validator can charge. This parameter is fixed and cannot be changed after the `create-validator` transaction is processed.
- **`commission-rate`**: The commission rate on block rewards and fees charged to delegators. **Note**: The `commission-rate` value must adhere to the following invariants:
  * Must be between 0 and the validator's `commission-max-rate`
  * Must not exceed the validator's `commission-max-change-rate`, which is the maximum percentage point change rate **per day**. In other words, a validator can only change its commission once per day and within `commission-max-change-rate` bounds.
- **`min-self-delegation`**: Minimum amount of $HEART the validator requires to have bonded at all time. If the validator's self-delegated stake falls below this limit, their validator gets jailed and kicked out of the active validator set.
- **`details`**: The validator description. More information is given on this in the next section.
- **`pubkey`**: A validator's Tendermint pubkey is associated with a private key used to sign "prevotes" and "precommits". It is prefixed with `humanvalcons` and found by executing `humansd tendermint show-address`.
- **`moniker`**: The validator's name. (It doesn't need to be unique)
 
After a validator is created, $HEART holders can delegate $HEART to the validator, effectively adding a stake to the validator's pool. The total stake of an address is the combination of $HEART bonded by delegators and $HEART self-bonded by the validator.

From all of the validators who send a `staking create-validator` transaction, those with the highest total stake are designated members of the validator set. If a validator's total stake falls too low, that validator loses his validator privileges and becomes unable to participate in consensus or generate rewards. In time, the maximum number of validators may increase via on-chain governance proposals.

```sh
humansd tx staking create-validator \
--amount 10000000uheart \
--commission-max-change-rate "0.1" \
--commission-max-rate "0.20" \
--commission-rate "0.1" \
--min-self-delegation "1" \
--details "put your validator description there" \
--pubkey=$(humansd tendermint show-validator) \
--moniker <your_moniker> \
--chain-id testnet-1 \
--gas-prices 0.025uheart \
--from <key-name>
```

You can verify your node is in the Active/Inactive validator set status by viewing the [Humans testnet block explorer](https://explorer.humans.zone/humans-testnet/staking)

### Editing the public description

You can edit your validator's public description. This info helps identify your validator and will be used by delegators to decide which validators to stake on. Make sure to provide input for every flag below. If a flag is not included in the command, the field will default to empty (`--moniker` defaults to the machine name). If a field has been set before and isn't modified, it retains its value.

The `<key_name>` passed as the value for the `--from` flag specifies which validator you are editing. If you don't want to include certain flags, remember that the `--from` the flag, in particular, must be included to identify which validator to update.

`--identity` can be used as to verify identity with systems like Keybase or UPort. When using with Keybase `--identity` should be populated with a 16-digit string that is generated with a [keybase.io](https://keybase.io) account. It's a cryptographically secure method of verifying your identity across multiple online networks. The Keybase API allows us to retrieve your Keybase avatar. This is how you can add a logo to your validator profile.

## States for validators  

After a validator is created with a `create-validator` transaction, the validator is in one of three states:

- `in validator set`: Validator is in the active set and participates in consensus. The validator is earning rewards and can be slashed for misbehavior.
- `jailed`: Validator misbehaved and is in jail, i.e. outside of the validator set.

  - If the jailing is due to being offline for too long (i.e. having missed more than `95%` out of the last `30,000` blocks), the validator can send an `unjail` transaction in order to re-enter the validator set.
  - If the jailing is due to double signing, the validator cannot be unjailed.

- `unbonded`: Validator is not in the active set, and therefore not signing blocks. The validator cannot be slashed and does not earn any reward. It is still possible to delegate HEART to an unbonded validator. Undelegating from an `unbonded` validator is immediate, meaning that the tokens are not subject to the unbonding period.

## Unjailing a validator

When a validator is "jailed" for downtime, you must submit a `slashing unjail` transaction from the operator account in order to be able to get block proposer rewards again (depends on the zone fee distribution).

```bash
humansd tx slashing unjail \
  --from=<key_name> \
  --chain-id=<chain_id>
```

## Confirming your validator is running 

Your validator is active if the following command returns anything:

```bash
humansd query tendermint-validator-set | grep "$(humansd tendermint show-address)"
```

You should now see your validator in one of the Humans explorers. You are looking for the `bech32` encoded `address` in the `~/.humans/config/priv_validator.json` file.
