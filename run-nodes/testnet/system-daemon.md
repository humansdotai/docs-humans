---
order: 2
---

#  🤖 System Daemon
A **daemon** is a service process that runs in the background and supervises the system or provides functionality to other processes. We use **daemons** to ensure that the **node daemon** persists after restarts or crashes.{synopsis}
## Cosmovisor Setup (Option 1, recommended)


Cosmovisor is process manager for Cosmos-SDK application binaries that monitors the governance module for incoming chain upgrade proposals.

If `cosmovisor` sees a proposal get approved, it can automatically download the new binary, stop the currently  running binary, switch from the old binary to the new one, and finally restart the node with the new binary. 

Cosmovisor allows you to download binaries ahead of time for chain upgrades, meaning that you can do **zero (or close to zero) downtime chain upgrades**. It's also useful if your timezone doesn't align well with a chain upgrade. 

::: tip 
We recommend using Cosmovisor to run your node. As an alternative, you can use `systemd`. 
:::

Rather than having to do stressful DevOps tasks late at night, it's better if you can automate them away, and that's what Cosmovisor tries to do. It's wise to go through the `cosmovisor` setup instructions on testnet before running a full-node on mainnet. 

::: tip
If you have not installed `humansd`, please start with the instructions on building the [`humansd` binary](/dev/cli/humansd-binary.html).
:::

::: warning
When using Cosmovisor, make sure that you DO NOT have auto download of binaries ON.
:::

1. Install Cosmovisor  
    Option 1 - From source
    ```bash
    git clone github.com/cosmos/cosmos-sdk
    cd cosmos-sdk
    git checkout cosmovisor/v0.43.x
    make cosmovisor
    cp cosmovisor/cosmovisor $GOPATH/bin/cosmovisor
    cd $HOME
    ```

    Option 2 - With `go install`:
    ```bash
    go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
    ```

2. Set up enviroment variables

    ```bash
    export DAEMON_NAME=humansd
    export DAEMON_HOME=$HOME/.humans
    source ~/.profile
    ```

3. Create required directories

    ```bash
    mkdir -p $DAEMON_HOME/cosmovisor/genesis/bin
    mkdir -p $DAEMON_HOME/cosmovisor/upgrades
    ```

4. Add the genesis version of the binary (currently it is `v1.0.0`). You can verify your binary location with `which humansd` command. For the default location you can use the example below:

    ```bash
    cp ~/go/bin/humansd $DAEMON_HOME/cosmovisor/genesis/bin
    ```

5. Create the service for the Cosmovisor

    ```bash
    sudo tee /etc/systemd/system/cosmovisor-humans.service<<EOF
    [Unit]
    Description=Cosmovisor for Humans Node
    Requires=network-online.target
    After=network-online.target

    [Service]
    Type=exec
    User=<your_user>
    Group=<your_user_group>
    ExecStart=/home/<your_user>/go/bin/cosmovisor run start --home /home/<your_user>/
    Restart=on-failure
    RestartSec=3
    Environment="DAEMON_NAME=humansd"
    Environment="DAEMON_HOME=/home/<your_user>/.humans"
    Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
    Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
    Environment="DAEMON_LOG_BUFFER_SIZE=512"
    LimitNOFILE=65535

    [Install]
    WantedBy=multi-user.target
    EOF
    ```

    Enable the service:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable cosmovisor-humans
    ```

---

## humansd systemd (Option 2)

1. Create a service file

    ```bash
    sudo tee /etc/systemd/system/humansd.service<<EOF
    [Unit]
    Description=Humans Node
    Requires=network-online.target
    After=network-online.target

    [Service]
    Type=exec
    User=<your_user>
    Group=<your_user_group>
    ExecStart=/home/<your_user>/go/bin/humansd start --home /home/<your_user>/.humans
    Restart=on-failure
    ExecReload=/bin/kill -HUP $MAINPID
    KillSignal=SIGTERM
    PermissionsStartOnly=true
    LimitNOFILE=65535

    [Install]
    WantedBy=multi-user.target
    EOF
    ```

2. Enable the service

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable humansd
    ```