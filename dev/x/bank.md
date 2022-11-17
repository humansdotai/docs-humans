# bank

bank module allows you to manage assets for accounts loaded into the local keys module {synopsis}

## Available Commands

#### Transactions

| `humansd tx bank` | Description |
| :--- | :--- |
| [send](#humansd-tx-bank-send) | Send funds from one account to another.

#### Queries

| `humansd query bank` | Description |
| :--- | :--- |
| [balances](#humansd-query-bank-balances) | Query for account balances by address |
| [total](#humansd-query-bank-total) | Query the total supply of coins of the chain |
| [denom-metadata](#humansd-query-denom-metadata) | Query the client metadata for coin denominations | 

---

### humansd query bank balances 

Query the total balance of an account or of a specific denomination.

```sh
humansd query bank balances [address] [flags]
```

**Args:**

| Name    | Description | 
| ---     | ----------- |
| address | Bech32 address that the query will return balances for |

**Flags:**

| Name, shorthand |  Description |
| :---            |  :---        |
| --help, -h    |  Help for balances |
| --denom       |  The specific balance denomination to query for |
| --count-total |  Count total number of records in all balances to query for |
| --height  | Use a specific block height to query state at (this can error if the node is pruning state) |

### humansd query bank total

Query total supply of coins that are held by accounts in the chain.

```text
humansd query bank total [flags]
```

**Flags:**

| Name, shorthand |  Description |
| :---            |  :---        |
| --help, -h | Help for coin-type |
| --denom | The specific balance denomination to query for |

### humansd tx bank send

Sending tokens to another address, this command includes `generate`, `sign` and `broadcast` steps.

```text
humansd tx bank send [from_key_or_address] [to_address] [amount] [flags]
```

**Flags:**

| Name, shorthand |  Description |
| :---            |  :---        |
| --help, -h | Help for send |
