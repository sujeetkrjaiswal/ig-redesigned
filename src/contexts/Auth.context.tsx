import axios from 'axios'
import React, { createContext, FC, useEffect, useState } from 'react'
import { UserModel } from 'src/models/user.model'

const AuthContext = createContext<UserModel | null>(null)

export const AuthProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null)
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get<UserModel>('/assets/user.json')
      setUser(res.data)
    }
    loadData()
  }, [])
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthContext
