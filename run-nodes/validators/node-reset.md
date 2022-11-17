---
order: 2
---

# Resetting a validator node

Instructions for validators to rebuild in the case of a chain reset. {synopsis}

Any upcoming resets will be announced in the `#testnet-announcements` channel on [Humans Discord server](https://discord.com/channels/999302051538411671/1039540079594582026). 
To reset your node and rejoin the testnet, please follow the steps below:

## Remove the old chain data and binary

```bash
sudo rm -rf $HOME/.humansd
sudo rm $HOME/go/bin/humansd
```

## Install the new binary version

```bash
# git clone git@github.com:humansdotai/humans.git # (ssh)
# git clone https://github.com/humansdotai/humans.git # (https)
cd humans
git pull
git fetch --tags
git checkout v1.0.0
make install
```

Verify the binary version by running

```bash
humansd version
# > v1.0.0
```

## Recreate the validator

Follow the same steps from ["Joining Testnet"](../testnet) and ["Validating on Testnet"](./) again.
