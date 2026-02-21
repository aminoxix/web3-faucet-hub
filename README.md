# faucet hub

your one-stop shop for testnet tokens. connect your wallet, pick a chain, click collect. that's it. no more hunting for faucet links across 47 browser tabs.

## what it does

- **16 faucets, one dashboard** - ethereum, polygon, arbitrum, optimism, base, avalanche, bnb, fantom, linea, zksync, scroll, celo, moonbeam, gnosis, metis... all in one place
- **auto-copy address** - clicks the collect button, copies your address, opens the faucet. you just paste and go
- **send tokens** - got testnet tokens? send them to a friend (or your other wallet, we don't judge)
- **deposit** - share your address to receive tokens from others

## tech

`next.js` · `typescript` · `tailwind css` · `web3-onboard` · `ethers.js`

## run it

```bash
npm install
npm run dev
```

open [localhost:3000](http://localhost:3000) and connect your wallet.

## faucets

| chain     | token  | network        | source       |
| --------- | ------ | -------------- | ------------ |
| ethereum  | eth    | sepolia        | google cloud |
| ethereum  | eth    | holesky        | google cloud |
| polygon   | pol    | amoy           | polygon      |
| arbitrum  | eth    | sepolia        | alchemy      |
| optimism  | eth    | sepolia        | alchemy      |
| base      | eth    | sepolia        | alchemy      |
| avalanche | avax   | fuji           | core         |
| bnb chain | tbnb   | testnet        | bnb chain    |
| fantom    | ftm    | testnet        | fantom       |
| linea     | eth    | sepolia        | infura       |
| zksync    | eth    | sepolia        | alchemy      |
| scroll    | eth    | sepolia        | scroll       |
| celo      | celo   | alfajores      | celo         |
| moonbeam  | dev    | moonbase alpha | moonbeam     |
| gnosis    | xdai   | chiado         | gnosis       |
| metis     | tmetis | sepolia        | metis        |

## project structure

```
src/
├── components/
│   └── DashboardLayout.tsx    # sidebar + nav
├── contexts/
│   └── WalletProvider.tsx     # wallet auth
├── pages/
│   ├── landing.tsx            # connect wallet
│   └── dashboard/
│       ├── index.tsx          # faucet grid
│       ├── deposit.tsx        # receive tokens
│       └── send.tsx           # send tokens
└── styles/
    └── globals.css            # dark glassmorphism vibes
```

## license

> the **faucet hub** project is released under the [GNU General Public License V3](https://github.com/aminoxix/web3-faucet-hub/blob/main/LICENSE). <br> developed & maintained by aminos. Copyright 2026 © aminos.
