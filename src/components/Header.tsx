'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [language, setLanguage] = useState('English')
  const { user, login, logout } = useAuth()

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <h1 className="text-xl font-bold">Bookmark Navigator</h1>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="focus:ring-0 focus:ring-offset-0">
              <span className="font-bold">{language}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLanguage('English')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('中文')}>
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={logout}>
                登出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={login}>登录</Button>
        )}
      </div>
    </header>
  )
}