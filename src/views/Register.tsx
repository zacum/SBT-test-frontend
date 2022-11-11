import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useUniContext } from '../contexts/UniContext'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-dropdown'
import '../assets/css/style.css'
import axios from 'axios'
import { IDegree } from '../interfaces/University'


const Register: React.FC = () => {
  const navigate = useNavigate()
  const { uni, setUser } = useUniContext()
  const [degree, setDegree] = useState<Array<string>>([])
  const [fname, setFname] = useState<string>('')
  const [sname, setSname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [idnum, setIdnum] = useState<string>('')
  const [seldeg, setSeldeg] = useState<string>('')

  useEffect(() => {
    const getDeg = async () => {
      const degdata = await axios.get('http://localhost:8000/degrees/')
      let x: Array<string> = []
      degdata?.data?.map((arr: IDegree) => {
        x.push(arr.name)
        setDegree(x)
      })
    }
    if (!uni) {
      navigate('/university')
      return
    }
    getDeg()
  }, [])

  const handleSubmit = () => {
    if (!seldeg) {
      alert("Please select degree from dropdown menu!")
      return
    }
    else {
      setUser({
        'fname': fname,
        'sname': sname,
        'email': email,
        'idnum': idnum,
        'degree': seldeg
      });
      navigate('/mint')
    }
  }

  return (
    <>
      <Header />
      <div className='flex justify-center my-24 relative'>
        <div className='absolute flex justify-center items-center left-[50px] w-[200px] h-[200px] p-[20px]'><div><img className='h-full' src={uni?.img} /></div></div>
        <div className='w-[330px]'>
          <p className='font-sf-compact-rounded font-[600] text-[32px] leading-[38px] mb-5'>Fill with your personal information</p>
          <p className='font-sf-compact-rounded font-[600] text-[16px] leading-[19px] mb-5 opacity-40'>{uni?.name}</p>
          <form onSubmit={handleSubmit}>
            <input className='w-full px-[20px] py-[18px] border border-solid border-black border-opacity-40 rounded-[12px] outline-0 mb-5' onChange={(e) => setFname(e?.target?.value)} type='text' placeholder='first name' required />
            <input className='w-full px-[20px] py-[18px] border border-solid border-black border-opacity-40 rounded-[12px] outline-0 mb-5' onChange={(e) => setSname(e?.target?.value)} type='text' placeholder='last name' required />
            <input className='w-full px-[20px] py-[18px] border border-solid border-black border-opacity-40 rounded-[12px] outline-0 mb-5' onChange={(e) => setEmail(e?.target?.value)} type='email' placeholder='email' required />
            <input className='w-full px-[20px] py-[18px] border border-solid border-black border-opacity-40 rounded-[12px] outline-0 mb-5' onChange={(e) => setIdnum(e?.target?.value)} type='text' placeholder='id number' required />
            <Dropdown className='mb-5' options={degree} onChange={(e) => setSeldeg(e?.value)} placeholder='degree' />
            <div className='flex justify-end'>
              <input className='flex justify-center items-center rounded-[12px] font-sf-compact-rounded font-[600] text-[16px] leading-[19px] bg-black py-[18px] px-[16px] text-white cursor-pointer' type='submit' value='Next' />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Register