import React, { useEffect, useState } from 'react';
import { UniContext } from './contexts/UniContext';
import WalletConnect from './views/WalletConnect';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import University from './views/University';
import Register from './views/Register';
import Mint from './views/MInt';
import Final from './views/Final';
import { IUni, IUser } from './interfaces/University';

declare let window: any
const App: React.FC = () => {
  const [uni, setUni] = useState<IUni>()
  const [user, setUser] = useState<IUser>()
  const [isConnected, setIsConnected] = useState<boolean>()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((res: Array<string>) => { res.length > 0 ? setIsConnected(true) : setIsConnected(false) })
        .catch((err: any) => { console.log(err) })
    } else { console.log('Please install metamask') }
  })

  return (
    <>
      <UniContext.Provider value={{ uni, setUni, user, setUser }}>
        <BrowserRouter>
          <Routes>
            {isConnected
              ? <Route path='/' element={<University />} />
              : <Route path='/' element={<WalletConnect />} />
            }
            <Route path='/university' element={<University />} />
            <Route path='/register' element={<Register />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/final' element={<Final />} />
            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </BrowserRouter>
      </UniContext.Provider>
    </>

  );
}

export default App;
