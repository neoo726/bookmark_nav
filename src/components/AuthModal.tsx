'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/components/AuthProvider'
import { useLanguage } from '@/contexts/LanguageContext'
import { Mail, Globe, MessageCircle } from 'lucide-react'

type AuthMode = 'login' | 'register'

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const { login } = useAuth()
  const { language } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该是实际的登录或注册逻辑
    login()
    onClose()
  }

  const handleThirdPartyAuth = (provider: string) => {
    // 这里应该是实际的第三方认证逻辑
    console.log(`Authenticating with ${provider}`)
    login()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? (language === '中文' ? '登录' : 'Login') : (language === '中文' ? '注册' : 'Register')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{language === '中文' ? '邮箱' : 'Email'}</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{language === '中文' ? '密码' : 'Password'}</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            {mode === 'login' ? (language === '中文' ? '登录' : 'Login') : (language === '中文' ? '注册' : 'Register')}
          </Button>
        </form>
        <div className="mt-4">
          <Button variant="outline" className="w-full" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? (language === '中文' ? '创建新账号' : 'Create new account') : (language === '中文' ? '已有账号？登录' : 'Already have an account? Login')}
          </Button>
        </div>
        <div className="mt-4 space-y-2">
          <Button variant="outline" className="w-full" onClick={() => handleThirdPartyAuth('Google')}>
            <Mail className="mr-2 h-4 w-4" /> {language === '中文' ? '使用 Google 账号登录' : 'Sign in with Google'}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleThirdPartyAuth('Microsoft')}>
            <Globe className="mr-2 h-4 w-4" /> {language === '中文' ? '使用 Microsoft 账号登录' : 'Sign in with Microsoft'}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleThirdPartyAuth('WeChat')}>
            <MessageCircle className="mr-2 h-4 w-4" /> {language === '中文' ? '使用微信登录' : 'Sign in with WeChat'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}