'use client'

import React, { createContext, useContext, useState } from 'react'

type User = {
  id: string
  name: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = () => {
    // 这里应该是实际的登录逻辑
    setUser({
      id: '1',
      name: 'Test User',
      avatar: '/default-avatar.png'
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}