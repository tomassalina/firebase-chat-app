import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export const AuthContextProvider = ({ children }) => {
  const [currenUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      console.log(user)
    })

    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ currenUser }}>
      {children}
    </AuthContext.Provider>
  )
}
