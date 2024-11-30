<p align="center">
  <img width="100" src="https://raw.githubusercontent.com/AtomLabss/Quark/main/assets/images/quark.png?s=200&v=4" />
</p>

<h1 align="center">Quark</h1>

<p align="center">
    A bridge/proxy allowing for Roblox and Discord communication.
</p>

<p align="center">
    <a href="https://discord.gg/dmhkzYqGQw">
      <img src="https://img.shields.io/discord/1252393773468745852?color=7489d5&logo=discord&logoColor=ffffff" />
    </a>
    <img src="https://img.shields.io/github/actions/workflow/status/AtomLabss/Quark/node.js.yml">
    <img src="https://img.shields.io/static/v1?label=status&message=beta&color=blue">
    <a href="https://top.gg/bot/1310697778711629824">
      <img src="https://img.shields.io/badge/vote-darkred?logo=top.gg&label=top.gg" />
    </a>
    <a href="https://discord.com/api/oauth2/authorize?client_id=1310697778711629824">
      <img src="https://img.shields.io/badge/invite-brightgreen?logo=discord&logoColor=ffffff&label=OAuth2&color=7489d5" />
    </a>
</p>

# Notices

> [!WARNING]
> **This project is in an early beta, and you may experience unexpected issues.**
> **Continue with your own risk!**

> [!WARNING]
> **Express Setup is currently unavailable, as we are in the process of adding Quark to AtomAPI.**
> **This notice will be updated once we have completed this on our end. Stay tuned!**

# Express Setup (with Quark's official Discord bot)

## Step 1: Discord Setup
1. [Add Quark to your designated Discord server.](https://discord.com/api/oauth2/authorize?client_id=1310697778711629824)

2. Profit. (that's literally it LMFAO)

## Step 2: Roblox Setup

1. Clone the project to your machine:

```bash
  git clone https://github.com/AtomLabss/Quark
```

2. Go to the project directory:

```bash
  cd ./Quark/src/roblox
```

3. Navigate to ServerScriptService/MainScript.lua, and populate the required values:

```bash
  nano ./MainScript.lua
```

5. Ensure that `proxyURL` is set to `https://quark.atomlabs.ie`, for Express Setup to work.

4. Copy the remainder of scripts to your Roblox game, and put them in their respective areas.

5. Navigate to Game Settings in Roblox Studio, go to the Security tab, and enable 'Allow HTTP Requests'.

6. Run your game, and ensure all is well.

7. Publish your game, if you'd like and enjoy!

# Manual Setup (with your own Discord bot)

## Step 1: Discord Setup
1. Clone the project to your machine:

```bash
  git clone https://github.com/AtomLabss/Quark
```

2. Go to the project directory:

```bash
  cd ./Quark/src/discord
```

3. Rename `example.env` to `.env`, and populate the required values:

```bash
  nano ./.env
```

4. Run the bot:

```bash
    node quark.js
```

7. Profit.

## Step 2: Roblox Setup

1. Clone the project to your machine:

```bash
  git clone https://github.com/AtomLabss/Quark
```

2. Go to the project directory:

```bash
  cd ./Quark/src/roblox
```

3. Navigate to ServerScriptService/MainScript.lua, and populate the required values:

```bash
  nano ./MainScript.lua
```

4. Copy the remainder of scripts to your Roblox game, and put them in their respective areas.

5. Navigate to Game Settings in Roblox Studio, go to the Security tab, and enable 'Allow HTTP Requests'.

6. Run your game, and ensure all is well.

7. Publish your game, if you'd like and enjoy!