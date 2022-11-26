---
order: 1
---

# ⚙️ Installing the Humans Binary

Instructions on building and installing the `humansd` binary. `humans` is a command-line client for the Humans blockchain. Humans users can use `humansd` to send transactions to the Humans network, query data from the chain, and run nodes. To install the `humans` binary, you can either (1) download the binary from the humansdotai/humans releases page (2) or build the binary directly from the source code. {synopsis}

## Install Option 1 | Downloading the binary

You'll need one of the `darwin_` binaries if you're using macOS and one of the `linux_` binaries if you're using something like Ubuntu or WSL.

To know whether you'll need the `amd64` or `arm64`, run one of the following commands:

```bash
dpkg --print-architecture
# returns "amd64" on Ubuntu
```

```bash
uname -m
# returns values like x86_64, i686, arm, and aarch64
```

Download the binary from the [humansdotai/humans releases](https://github.com/humansdotai/humans/releases) page (the current testnet is `v1.0.0`). The assets are at the bottom after the release notes. 

![](../../img/github_release.png)

After downloading the tar file containing the binary, you'll need to unpack it. Here's an example command for unpacking the tar file.

```bash
tar -xvf humans_latest_linux_amd64.tar.gz
# The tar file unpacks with "humansd" as the default name.
```

Finally, add the `humansd` binary to your `$PATH` with one of the methods below.

```bash
# Add to shell config
export PATH=<path-to-humansd>:$PATH
```

```bash
# Or, copy directly to a /usr/local/bin folder
sudo cp humansd /usr/local/bin/humansd
```

## Install Option 2 | Building from the Source Code

### 2.1 — Install make and gcc

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt install git build-essential ufw curl jq snapd --yes
```

### 2.2 — Install Go

The installation process for Go depends on your OS. Humans is meant to build with a Unix system such as macOS, Ubuntu, or WSL. Please install Go v1.18 using the instructions at [go.dev/doc/install](https://go.dev/doc/install). For Ubuntu, you can use:

```bash
wget https://golang.org/dl/go1.18.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz
```

You'll also want to set the following environment variables in your shell config (e.g. `.bashrc`, `.zshrc`).

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
```

### 2.3 — Compile the source code

To build the binary from source, begin by cloning the `humansdotai/humans` repo. 

```bash
cd $HOME
git clone https://github.com/humansdotai/humans
cd humans
git checkout v1.0.0
go build -o humansd cmd/humansd/main.go
# After build, copy directly to a /usr/local/bin folder
sudo cp humansd /usr/local/bin/humansd
```
## Post-installation

Running these commands should have made `humansd` available in your `$PATH`. You should now be able to view a list of all available commands:

```bash
humansd
```

::: tip
If the "`humansd: command not found`" error message is returned, confirm that the Golang binary path is correctly configured by running the following command (or setting it in your shell config):
```bash
export PATH=$PATH:$(go env GOPATH)/bin
```
:::

---

## Local development

Lastly, you can run the chain for local development with 

```bash
go run cmd/humansd/main.go
```

After opening another terminal, you'll be able to use the full suite of `humansd` commands.

## Docker Engine

You'll need Docker to run commands that use external containers like `make proto-gen`. Instructions for installing Docker can be found [here](https://docs.docker.com/engine/install/).

---

