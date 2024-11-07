import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { AuthProvider } from '@/components/AuthProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Bookmark Navigator',
  description: 'Your personal bookmark organizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-50 overflow-auto">
                  {children}
                </main>
              </div>
            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}