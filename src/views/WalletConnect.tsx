import React, { useEffect, useContext } from 'react'
import Header from '../components/Header'
import metamask_icon from '../assets/img/metamask_icon.png'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import { BigNumber, ethers } from 'ethers'
import abi from '../contracts/contract.json'

const Injected = new InjectedConnector({
  supportedChainIds: [1, 56, 97, 137, 80001]
});

declare let window: any;

const WalletConnect: React.FC = () => {

  const { activate, deactivate, active, account } = useWeb3React()
  const navigate = useNavigate()

  const checkBalance = () => {
    const address: string = process.env.REACT_APP_CONTRACT_ADDRESS || '0x39eca1cd8935B4dbA41380d75226D490cb46F118'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const sbt = new ethers.Contract(
      address,
      abi,
      provider
    )
    if (sbt) {
      sbt.balanceOf(account).then((res: BigNumber) => {
        res.toNumber() > 0 ? navigate('/final') : navigate('/university')
      }).catch((err: any) => navigate('/university'))
    }
  }

  useEffect(() => {
    if (active) {
      checkBalance()
    }
  }, [active])

  return (
    <>
      <Header />
      <div className='flex justify-center flex-col items-center mt-60'>
        <div className='font-sf-compact-rounded font-[600] text-[32px] leading-[38px]'>Mint your University Grade SBT</div>
        <button className='flex justify-center items-center py-[18px] px-[16px] gap-[12px] bg-black rounded-[12px] mt-[48px]' onClick={() => { activate(Injected) }}>
          <img src={metamask_icon} alt='metamask_icon' />
          <div className='w-[139px] h-[19px] font-sf-compact-rounded font-[600] text-[16px] leading-[19px] text-white'>Connect Metamask</div>
        </button>
      </div>
    </>
  )
}
export default WalletConnect