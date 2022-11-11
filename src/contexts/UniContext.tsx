import { useContext, createContext } from 'react'
import { IUni, IUser } from '../interfaces/University'

export interface IUniInfo {
    uni?: IUni;
    setUni: (c: IUni) => void;
    user?: IUser;
    setUser: (c: IUser) => void;
}

export const UniContext = createContext<IUniInfo>({
    uni: {},
    setUni: () => { },
    user: {},
    setUser: () => { }
});

export const useUniContext = () => useContext(UniContext)