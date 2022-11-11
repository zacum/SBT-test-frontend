import React from 'react'
import Header from '../components/Header'
import sbt from '../assets/img/SBT.png'

const Final: React.FC = () => {
  return (
    <>
      <Header />
      <div className='flex justify-center mt-40'>
        <div>
          <p className='font-sf-compact-rounded font-[600] text-[32px] leading-[38px] text-center'>Your SBT is ready</p>
          <div className='my-[24px]'><img src={sbt} alt='SBT' /></div>
          <p className='font-sf-compact-rounded font-[600] text-[16px] leading-[19px] text-center underline'>See it on Opensea</p>
        </div>
      </div>
    </>
  )
}
export default Final