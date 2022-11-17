# ⚖ Submitting Proposals
<!-- omit in toc -->

This section describes how to submit governance proposals on Humans. {synopsis}

Any HEART holder, whether bonded or unbonded, can submit proposals by sending a `TxGovProposal` transaction. This is possible using the `humansd` CLI. Each proposal type corresponds to a subcommand of `humansd tx gov submit-proposal`.

#### Table of Contents
- [⚖️ Submitting Proposals](#-submitting-proposals)
- [⚖️Table of Contents](#table-of-contents)
- [⚖️Proposal Types](#proposal-types)
- [⚖️Querying a proposal](#querying-a-proposal)


## ⚖️ Proposal Types

| Proposal Type             | Description                                                                                                                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cancel-software-upgrade` | Cancels a software upgrade.                                                                                                                                                                                                                                          |
| `community-pool-spend`    | Details a proposal for use of community funds, together with how many coins are proposed to be spent, and to which recipient account.                                                                                                                                |
| `create-pool`             | Creates a new Nibi-Perps trading pair by initializing a virtual AMM pool.                                                                                                                                                                                            |
| `ibc-upgrade`             | Updates the IBC client state in-place. An `upgraded_client_state.json` can be client-breaking.                                                                                                                                                                       |
| `param-change`            | Change module parameters.                                                                                                                                                                                                                                            |
| `software-upgrade`        | Upgrade the protocol code.                                                                                                                                                                                                                                           |
| `update-client`           | Substitutes the current IBC client for a new one. This proposal is useful for updating the light client in the case of misbehavior. See [ADR-026 of IBC-Go](https://ibc.cosmos.network/main/architecture/adr-026-ibc-client-recovery-mechanisms.html) for more info. |

## ⚖️ Querying a proposal

One can use the following command to query for proposals:

```bash
# parameters
humansd query gov proposal [proposal-id]

# example
humansd query gov proposal 1
```
