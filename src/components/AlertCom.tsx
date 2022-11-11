import React from 'react'
import warnImg from '../assets/img/warn.png'

declare let window: any

const AlertCom: React.FC = () => {

  const switchNet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
      });
    }
  }
  return (
    <>
      <div className='py-[21px] pl-[21px] pr-[32px] bg-black shadow-[0_8px_16px_rgba(0,0,0,0.25)] rounded-[32px] w-[380px] h-[176px]'>
        <div><img src={warnImg} alt='warning!' /></div>
        <p className='font-sf-compact-rounded font-[600] text-[16px] leading-[19px] text-white my-[18px]'>You are connected to a wrong network.</p>
        <button className='font-sf-compact-rounded font-[600] text-[16px] leading-[19px] text-white bg-[#8247E5] rounded-[12px] py-[18px] px-[16px]' onClick={switchNet}>Connect to Polygon</button>
      </div>
    </>
  )
}
export default AlertCom