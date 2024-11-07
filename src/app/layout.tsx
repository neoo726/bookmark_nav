import type { Metadata } from 'next'


import './globals.css'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthProvider'



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
    <html lang="en" >
      <body >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6 bg-gray-50">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}