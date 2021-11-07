import React from 'react';
import './App.css';
import { Web3ClientContext } from './web3/context/Web3ClientContext';
import { Wallet } from './wallet/components/Wallet';
import { useEthereumBrowserWallet } from './web3/hooks/useEthereumBrowerWallet';

function App() {
  const { web3 } = useEthereumBrowserWallet();

  return (
    <div className="App">
      <header className="App-header">
        <Web3ClientContext.Provider value={web3}>
          <Wallet web3={web3} />
        </Web3ClientContext.Provider>
      </header>
    </div>
  );
}

export default App;
