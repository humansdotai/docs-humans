---
order: 3
---

# 🤖 Join Testnet

**Testnets** are testing instances of the Humans blockchain. **Testnet** tokens are separate and distinct from real assets. In order to join a network, you'll need to use its corresponding version of the binary to [run a full node](/dev/cli/humansd-binary.html).{synopsis}

## Available Networks

Below you can find a table of each Humans testnet and its current status. 

| Network | Chain ID  | Description              | Version | Status |
| ------- | --------- | ------------------------ | ------- | ------ |
| Testnet | testnet-1 | Humans's default testnet | v1.0.0  | Active |

::: tip
You can see current status of the blockchain at the [Humans Block Explorer](https://explorer.humans.zone/humans-testnet).
The block explorer allows you to search through transactions, blocks, wallet addresses, and other on-chain data.
:::

## Blockchain Parameters

| Block Time | Unbonding Time | Voting Period |
| ---------- | -------------- | ------------- |
| 6 seconds  | 14 days        | 3 days        |

---

## Pre-requisites 

### Minimum hardware requirements

- Memory: 8 GB RAM
- CPU: Quad-Core
- Disk: 250 GB SSD Storage
- Bandwidth: 1 Gbps for Download / 100 Mbps for Upload

### Operating system

The following tutorial is done on an Ubuntu Linux 20.04 (LTS) x64 instance machine.

### Update the system

```bash
sudo apt update
sudo apt upgrade --yes
```

### Verify humansd version

Please check for the correct version of the binary. 

::: tip
If you have not installed `humansd`, please start with the instructions on building the [`humansd` binary](/dev/cli/humansd-binary.html). Please note that the version is displayed ONLY if you run the released binary, otherwise nothing will be displayed.
:::

```bash
humansd version
v1.0.0
```

---

## Cosmovisor 

Please follow the [`cosmovisor` setup instructions](/run-nodes/testnet/system-daemon.html) if you haven't already.

## Init the Chain

1. Init the chain

    ```bash
    humansd init <moniker-name> --chain-id=testnet-1 --home $HOME/.humans
    ```

2. Create a local key pair

    ```bash
    humansd keys add <key-name>
    humansd keys show <key-name> -a
    ```

3. Copy the genesis file to the `$HOME/.humans/config` folder.
  
    You can download a copy of the genesis file from the Tendermint RPC endpoint. 
    
    ```bash
    curl -s https://rpc-testnet.humans.zone/genesis | jq -r .result.genesis > genesis.json
    ```
    
    Then copy the genesis file to the `$HOME/.humans/config` folder.
    
    ```bash
    cp genesis.json $HOME/.humans/config/genesis.json
    ```

4. Update persistent peers list in the configuration file `$HOME/.humans/config/config.toml`.

    Save the following text in a file named `persistent_peers.txt`.

    ```
    1df6735ac39c8f07ae5db31923a0d38ec6d1372b@45.136.40.6:26656
    9726b7ba17ee87006055a9b7a45293bfd7b7f0fc@45.136.40.16:26656
    6e84cde074d4af8a9df59d125db3bf8d6722a787@45.136.40.18:26656
    eda3e2255f3c88f97673d61d6f37b243de34e9d9@45.136.40.13:26656
    4de8c8acccecc8e0bed4a218c2ef235ab68b5cf2@45.136.40.12:26656
    ```

    Navigate to the directory with the `persistent_peers.txt` file and run

    ```bash
    export PEERS=$(cat persistent_peers.txt| tr '\n' '_' | sed 's/_/,/g;s/,$//;s/^/"/;s/$/"/') && sed -i "s/persistent_peers = \"\"/persistent_peers = ${PEERS}/g" $HOME/.humans/config/config.toml
    ```

5. Set minimum gas prices

    ```bash
    sed -i 's/minimum-gas-prices =.*/minimum-gas-prices = "0.025uheart"/g' $HOME/.humans/config/app.toml
    ```

6. Update block time parameters

    ```bash
    CONFIG_TOML="$HOME/.humans/config/config.toml"
     sed -i 's/timeout_propose =.*/timeout_propose = "100ms"/g' $CONFIG_TOML
     sed -i 's/timeout_propose_delta =.*/timeout_propose_delta = "500ms"/g' $CONFIG_TOML
     sed -i 's/timeout_prevote =.*/timeout_prevote = "100ms"/g' $CONFIG_TOML
     sed -i 's/timeout_prevote_delta =.*/timeout_prevote_delta = "500ms"/g' $CONFIG_TOML
     sed -i 's/timeout_precommit =.*/timeout_precommit = "100ms"/g' $CONFIG_TOML
     sed -i 's/timeout_precommit_delta =.*/timeout_precommit_delta = "500ms"/g' $CONFIG_TOML
     sed -i 's/timeout_commit =.*/timeout_commit = "1s"/g' $CONFIG_TOML
     sed -i 's/skip_timeout_commit =.*/skip_timeout_commit = false/g' $CONFIG_TOML
    ```

7. Configure pruning
   
    For lower disk space usage we recommend setting up pruning using the configurations below. You can change this to your own pruning configurations if you want:

     ```bash
    PRUNING="custom"
    PRUNING_KEEP_RECENT="100"
    PRUNING_INTERVAL="10"

    sed -i -e "s/^pruning *=.*/pruning = \"$PRUNING\"/" $HOME/.humans/config/app.toml
    sed -i -e "s/^pruning-keep-recent *=.*/pruning-keep-recent = \
    \"$PRUNING_KEEP_RECENT\"/" $HOME/.humans/config/app.toml
    sed -i -e "s/^pruning-interval *=.*/pruning-interval = \
    \"$PRUNING_INTERVAL\"/" $HOME/.humans/config/app.toml
    ```

8. Start your node by choosing one of the options below:

    ```bash
    # without a daemon
    humansd start

    # with systemd
    sudo systemctl start humansd

    # with cosmovisor
    sudo systemctl start cosmovisor-humans
    ```

9. Request tokens from the [Discord Faucet for testnet-1](https://discord.gg/humansdotai) in `#testnet-faucet` if required. Use $help to see the other functions of the faucet. Replace the address below with your own address. Please note, that current weekly request limit for the Discord Humans Faucet is 10HEART (`10000000uheart`).

    :::tip
    You need to obtain the `⚔️ Testnet` role by reacting in [ 👉🏻 | #roles](https://discord.com/channels/999302051538411671/999302052192735290) to see `#testnet-faucet`.
    :::


    ```bash
    $request human1ppa65ec56rqvf4z4v393l0n7llnscw483yftrk
    ```

10. The output should look something similar to this.

    ```js
    @YourDiscordHandle - {
    "transaction": "3D14B2B146F618F81381786807A8EB7F1E3053F5494F6FDD99BF9CC20F4B7D5D",
    "block": 49335,
    "gas": 76364    
    }
    ```
---

## Next Steps

::: tip
See the [validator docs](/run-nodes/validators/validating-on-testnet.html) on how to participate as a validator.
:::

For the full list of `humansd` commands, see:
- The [`humansd` CLI introduction](/dev/cli/humansd-cli.html)
- Humans [Module Reference](../../dev/x)
