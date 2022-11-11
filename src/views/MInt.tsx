import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useUniContext } from '../contexts/UniContext'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import abi from '../contracts/contract.json'
import axios from 'axios'
import AlertCom from '../components/AlertCom'

declare let window: any;

const MUMBAI_CHAIN_ID: number = 80001

const Mint: React.FC = () => {
  const { user, uni } = useUniContext()
  const [seckey, setSeckey] = useState<string>()
  const navigate = useNavigate()
  const [account, setAccount] = useState<string>()
  const [aler, setAler] = useState<boolean>(false)

  useEffect(() => {
    if (!uni) navigate('/university')
    if (!user) navigate('/register')
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((res: Array<string>) => setAccount(res[0]))
        .catch((err: any) => { console.log(err) })
    } else { console.log('Please install metamask') }
  })

  const handleMint = async () => {
    window.ethereum
      .request({ method: 'eth_chainId' })
      .then((res: string) => {
        if (parseInt(res, 16) !== 80001) {
          setAler(true)
          setTimeout(() => {
            setAler(false)
          }, 3000)
        }
      })
      .catch((err: any) => console.log(err))
    if (uni?.seckey == seckey) {
      const address: string = process.env.REACT_APP_CONTRACT_ADDRESS || '0x39eca1cd8935B4dbA41380d75226D490cb46F118'
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const sbt = new ethers.Contract(
        address,
        abi,
        signer
      )

      const secretSigner = new ethers.Wallet(process.env.REACT_APP_SIGNER_PRIVATE_KEY || '')

      // signature
      const nonce = (await sbt.nonces(account)).toNumber()

      const msgHash = ethers.utils.solidityKeccak256(
        ['uint256', 'address', 'uint256'],
        [MUMBAI_CHAIN_ID, account, nonce + 1]
      )
      const msgHashBinary = ethers.utils.arrayify(msgHash);
      const sig = await secretSigner.signMessage(msgHashBinary)

      await sbt.connect(signer).mint(sig)
      sbt.on("LogMinted", async (sender, newId) => {
        if (sender.toLowerCase() == account?.toLowerCase()) {
          axios.post('http://localhost:8000/mdata/', {
            "tokenid": newId.toNumber(),
            "metadata": {
              "image": uni?.img,
              "name": uni?.name,
              "description": "This SBT is a validation of your university degree",
              "attributes": [
                {
                  "trait_type": "Degree",
                  "value": user?.degree
                },
                {
                  "trait_type": "Name",
                  "value": user?.fname
                },
                {
                  "trait_type": "Last name",
                  "value": user?.sname
                }
              ]
            }
          })
          navigate('/final')
        }
      })

    }
    else {
      alert('Invalid secret key!')
    }
  }

  return (
    <>
      <Header />
      <div className='flex justify-center mt-24'>
        <div className='w-[400px]'>
          <p className='font-sf-compact-rounded font-[600] text-[32px] leading-[38px] text-center mb-5'>Mint your grade SBT</p>
          <div className='bg-[#FAFAFA] border border-solid border-black border-opacity-10 rounded-[32px] pl-[32px] py-[20px] my-[44px]'>
            <p className='font-sf-compact-rounded font-[600] text-[18px] leading-[21px]'>{user?.fname} {user?.sname}</p>
            <p className='font-sf-compact-rounded font-[400] text-[14px] leading-[17px] my-[8px]'>{user?.degree} at {uni?.name}</p>
            <p className='font-sf-compact-rounded font-[400] text-[14px] leading-[17px] opacity-40'>{user?.idnum}</p>
          </div>
          <div className='flex justify-between'>
            <input className='pl-[18px] py-[20px] border border-solid border-black border-opacity-40 rounded-[12px] w-[288px]' onChange={(e) => setSeckey(e?.target?.value)} type='text' placeholder='secret key' />
            <button className='flex justify-center items-center px-[16px] py-[18px] bg-black rounded-[12px] text-white' onClick={handleMint}>Mint SBT</button>
          </div>
        </div>
      </div>
      {aler &&
        <div className='absolute top-[127px] right-[46px]'>
          <AlertCom />
        </div>
      }
    </>
  )
}
export default Mint