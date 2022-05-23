# Développer un Twitter incensurable grâce à la blockchain

## Démarrage

*Prérequis: Nodejs et NPM*

```sh
# Installation des dépendances
npm install
# Exécute les tests unitaires
npm test
# Lance une blockchain de développement en local
npm start
# Déploie les smarts contracts sur cette blockchain
npx hardhat run scripts/deploy.ts --network
```

```sh
# Déploie les smarts contracts sur le testnet "Fuji" d'Avalanche
PRIVATE_KEY="CLE PRIVEE A UTILISER" npx hardhat run scripts/deploy.ts --fuji
```
