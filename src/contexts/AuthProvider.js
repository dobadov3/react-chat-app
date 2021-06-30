import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import {auth} from '../firebase/config'
import {Spin} from 'antd'

export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory();

    React.useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged(user => {

            if (user){
                const {displayName, email, uid, photoURL} = user;
                setUser({displayName, email, uid, photoURL});
                setIsLoading(false)
                history.push('/')
                return
            }

            setIsLoading(false);
            history.push('/login')
        })
        
        //clean function
        return () => {
            unsubcribed();
        }
    }, [history]);
    
    return (
        <AuthContext.Provider value={{user}}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    )
}
