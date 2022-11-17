---
order: 1
---

# Modules Overview 

<!-- ::: tip
Note that only the custom modules related to perpetual swaps are active on testnet: `common`, `epochs`, `pricefeed`, `vpool`, and `perp`.
:::


## Humans Custom Modules

| Module                                    | Active? | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [common][code-x-common]                   | ✔️       | Holds helper and utility functions to be utilized by other `x/` cosmos-sdk modules.                                                                                                                                                                                                                                                                                                                             |
| [dex][code-x-dex]                         | ⭕️       | Responsible for creating, joining, and exiting liquidity pools. It also allows users to swap between two assets in an existing pool. It's a fully functional AMM.                                                                                                                                                                                                                                               |
| [epochs][code-x-epochs]                   | ✔️       | Often in the SDK, we would like to run certain code every-so often. The purpose of `epochs` module is to allow other modules to set that they would like to be signaled once every period. So another module can specify it wants to execute code once a week, starting at UTC-time = x. `epochs` creates a generalized epoch interface to other modules so that they can easily be signalled upon such events. |
| [incentivization][code-x-incentivization] | ⭕️       |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [lockup][code-x-lockup]                   | ⭕️       |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [oracle][code-x-oracle]                   | ⭕️       |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [perp][code-x-perp]                       | ✔️       | Powers the Nibi-Perps exchange. This module enables traders to open long and short leveraged positions and houses all of the PnL calculation and liquidation logic.                                                                                                                                                                                                                                             |
| [pricefeed][code-x-pricefeed]             | ✔️       | Handles the posting of prices for various asset pairs by whitelisted oracles and the logic for querying these prices.                                                                                                                                                                                                                                                                                           |
| [stablecoin][code-x-stablecoin]           | ⭕️       | Resonsible for handling mint and redeem transactions with NUSD.                                                                                                                                                                                                                                                                                                                                                 |
| [testutil][code-x-testutil]               | ✔️       | Helper functions for unit and integration tests.                                                                                                                                                                                                                                                                                                                                                                |
| [vpool][code-x-vpool]                     | ✔️       | The vpool module manages the virtual AMM pools (vpools) that support Nibi-Perps.                                                                                                                                                                                                                                                                                                                                |

[code-x-common]: https://github.com/humansChain/humans/tree/master/x/common
[code-x-dex]: https://github.com/humansChain/humans/tree/master/x/dex
[code-x-epochs]: https://github.com/humansChain/humans/tree/master/x/epochs
[code-x-pricefeed]: https://github.com/humansChain/humans/tree/master/x/pricefeed
[code-x-perp]: ./perp
[code-x-stablecoin]: https://github.com/humansChain/humans/tree/master/x/stablecoin
[code-x-testutil]: https://github.com/humansChain/humans/tree/master/x/testutil
[code-x-vpool]: ./vpool
[code-x-incentivization]: https://github.com/humansChain/humans/tree/master/x/incentivization
[code-x-lockup]: https://github.com/humansChain/humans/tree/master/x/lockup
[code-x-oracle]: https://github.com/humansChain/humans/tree/master/x/oracle -->

## Modules — Cosmos-SDK

Production-grade modules imported from the Cosmos-SDK:

| Module                                | Active? | Description                                                                                                                                                                                                   |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [auth][cosmos-x-auth]                 | ✔️       | Authentication of accounts and transactions for Cosmos SDK application.                                                                                                                                       |
| [authz][cosmos-x-authz]               | ✔️       | Authorization for accounts to perform actions on behalf of other accounts.                                                                                                                                    |
| [bank][cosmos-x-bank]                 | ✔️       | Token transfer functionalities.                                                                                                                                                                               |
| [base][cosmos-x-base]                 | ✔️       |
| [capability][cosmos-x-capability]     | ✔️       | Object capability implementation.                                                                                                                                                                             |
| [crisis][cosmos-x-crisis]             | ✔️       | Halting the blockchain under certain circumstances (e.g. if an invariant is broken).                                                                                                                          |
| [crypto][cosmos-x-crypto]             | ✔️       |
| [distribution][cosmos-x-distribution] | ✔️       | Fee distribution, and staking token provision distribution.                                                                                                                                                   |
| [evidence][cosmos-x-evidence]         | ✔️       | Evidence handling for double signing, misbehaviour, etc.                                                                                                                                                      |
| [feegrant][cosmos-x-feegrant]         | ✔️       | This module allows an account, the granter, to permit another account, the grantee, to pay for fees from the granter's account balance. Grantees will not need to maintain their own balance for paying fees. |
| [genutil][cosmos-x-genutil]           | ✔️       |
| [gov][cosmos-x-gov]                   | ✔️       | On-chain proposals and voting.                                                                                                                                                                                |
| [mint][cosmos-x-mint]                 | ✔️       | Creation of tokens native to the chain.                                                                                                                                                                       |
| [params][cosmos-x-params]             | ✔️       | Globally available parameter store.                                                                                                                                                                           |
| [slashing][cosmos-x-slashing]         | ✔️       | Validator punishment mechanisms.                                                                                                                                                                              |
| [staking][cosmos-x-staking]           | ✔️       | Proof-of-Stake layer for public blockchains.                                                                                                                                                                  |
| [tx][cosmos-x-tx]                     | ✔️       |
| [upgrade][cosmos-x-upgrade]           | ✔️       | Software upgrades handling and coordination.                                                                                                                                                                  |
| [vesting][cosmos-x-vesting]           | ✔️       |

[cosmos-x-auth]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/auth 
[cosmos-x-authz]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/authz
[cosmos-x-bank]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/bank
[cosmos-x-base]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/base
[cosmos-x-capability]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/capability
[cosmos-x-crisis]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/crisis
[cosmos-x-crypto]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/crypto
[cosmos-x-distribution]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/distribution
[cosmos-x-evidence]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/evidence
[cosmos-x-feegrant]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/feegrant
[cosmos-x-genutil]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/genutil
[cosmos-x-gov]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/gov
[cosmos-x-mint]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/mint
[cosmos-x-params]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/params
[cosmos-x-slashing]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/slashing
[cosmos-x-staking]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/staking
[cosmos-x-tx]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/tx
[cosmos-x-upgrade]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/upgrade
[cosmos-x-vesting]: https://github.com/cosmos/cosmos-sdk/tree/v0.45.6/x/vesting

## Inter-Blockchain Communcation (IBC) 

The IBC module has its [own repository, `ibc-go`](https://github.com/cosmos/ibc-go).

