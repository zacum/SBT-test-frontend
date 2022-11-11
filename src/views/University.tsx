import React, { useContext, useEffect, useState } from 'react'
import { useUniContext } from '../contexts/UniContext'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IUni } from '../interfaces/University'
import { useWeb3React } from '@web3-react/core'
import AlertCom from '../components/AlertCom'

const University: React.FC = () => {

  const navigate = useNavigate()
  const { setUni } = useUniContext()
  const [uniList, setUniList] = useState<Array<IUni>>()
  const { active } = useWeb3React()

  useEffect(() => {
    if (!active) {
      navigate('/')
    }
    const getUnilist = async () => {
      const unis = await axios.get('http://localhost:8000/universities/')
      setUniList(unis.data)
    }
    getUnilist()
  }, [])

  return (
    <>
      <Header />
      <div className='my-24'>
        <p className="font-sf-compact-rounded font-[600] text-[32px] leading-[38px] text-center mb-[82px]">Choose your university</p>
        <div className='flex justify-center'>
          <div className='grid grid-cols-3 gap-12'>
            {uniList && uniList.map((arr) => (
              <div className='flex justify-center cursor-pointer' onClick={() => { setUni(arr); navigate('/register') }} key={arr?.id} >
                <div>
                  <div className='flex justify-center items-center w-[200px] h-[200px] p-[30px] bg-[#ffffff] rounded-[32px] shadow-[0_8px_16px_rgba(0,0,0,0.25)]'><img className='w-full' src={arr?.img} /></div>
                  <p className='font-sf-compact-rounded font-[600] text-[18px] leading-[21px] text-center mt-[16px]'>{arr?.name}</p>
                </div>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default University