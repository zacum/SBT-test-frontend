import { useContext, createContext } from 'react'

export interface ISigner {
  signer: any;
  setSigner: (s: any) => void;
}

export const SignerContext = createContext<ISigner>({
  signer: null,
  setSigner: () => { },
})
export const useSignerContext = () => useContext(SignerContext)