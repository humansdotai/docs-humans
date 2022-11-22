---
order: 2
---

# ⚙️ Humansd Command-Line Interface (CLI)

An introduction to the using the `humansd` CLI along with a brief description of commands and flags. {synopsis}

## Introduction

`humansd` is a command line client for the Humans network. Humans users can use `humansd` to send transactions to the Humans network and query the blockchain data.

::: tip
See ["Humans Setup"](/dev/cli/humansd-binary.html) for instructions on installing `humansd`.
:::

### Working Directory

The default working directory for the `humansd` is `$HOME/.humans`, which is mainly used to store configuration files and blockchain data. The Humans `key` data is saved in the working directory of `humansd`. You can also specify the `humansd` working directory by using the `--home` flag when executing `humansd`.

### Connecting to a Full-Node

By default, `humansd` uses `tcp://localhost:26657` as the RPC address to connect to the Humans network. This default configuration assumes that the machine executing `humansd` is running as a full-node.

The RPC address can be specified to connect to any full-node with an exposed RPC port by adding the `--node` flag when executing `humansd`

### Global Flags

#### GET Commands

All GET commands have the following global flags:

| Name, shorthand | type   | Default Value | Description                          |
| --------------- | ------ | ------------- | ------------------------------------ |
| --chain-id      | string |               | The network Chain ID                 |
| --home          | string | $HOME/.humans | Directory for config and data        |
| --trace         | string |               | Print out full stack trace on errors |
| --log\_format   | string | plain         | Logging format (json \| plain)       |

#### POST Commands

All POST commands have the following global flags:

| Name, shorthand   | type   | Default               | Description                                                                                                    |
| ----------------- | ------ | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| --account-number  | int    | 0                     | `AccountNumber` to sign the tx                                                                                 |
| --broadcast-mode  | string | sync                  | Transaction broadcasting mode (sync \| async \| block)                                                         |
| --dry-run         | bool   | false                 | Ignore the --gas flag and perform a simulation of a transaction, but don't broadcast it                        |
| --fees            | string |                       | Fees to pay along with transaction                                                                             |
| --from            | string |                       | Name of private key with which to sign                                                                         |
| --gas             | string | 200000                | Gas limit to set per-transaction; set to "simulate" to calculate required gas automatically                    |
| --gas-adjustment  | float  | 1                     | Adjustment factor to be multiplied against the estimate returned by the tx simulation; if the gas limit is set |
| --gas-prices      | string |                       | Gas prices in decimal format to determine the transaction fee                                                  |
| --generate-only   | bool   | false                 | Build an unsigned transaction and write it to STDOUT                                                           |
| --help, -h        | string |                       | Print help message                                                                                             |
| --keyring-backend | string | os                    | Select keyring's backend                                                                                       |
| --ledger          | bool   | false                 | Use a connected Ledger device                                                                                  |
| --memo            | string |                       | Memo to send along with transaction                                                                            |
| --node            | string | tcp://localhost:26657 | specifies `<host>:<port>` for the Tendermint RPC interface endpoint for this chain                             |
| --offline         | string |                       | Offline mode (does not allow any online functionality)                                                         |
| --sequence        | int    | 0                     | Sequence number to sign the tx                                                                                 |
| --sign-mode       | string |                       | Choose sign mode (direct \| amino-json), this is an advanced feature                                           |
| --trust-node      | bool   | true                  | Don't verify proofs for responses                                                                              |
| --yes             | bool   | true                  | Skip tx broadcasting prompt confirmation                                                                       |
| --chain-id        | string |                       | The network Chain ID                                                                                           |
| --home            | string | $HOME/.humans         | Directory for config and data                                                                                  |
| --trace           | string |                       | Print out full stack trace on errors                                                                           |

## Next Steps

#### Learn more about the:

- [Run a Full Node on Testnet][page-node-daemon]
- [Setup a System Daemon][page-system-daemon]
- [Setup a Validator Node][page-validator]

#### 

[page-system-daemon]: ../../run-nodes/testnet/system-daemon.html
[page-validator]: ../../run-nodes/validators/validating-on-testnet.html
[page-node-daemon]: ../../run-nodes/testnet/node-daemon.html