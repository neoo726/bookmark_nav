import { redirect } from 'next/navigation'
import { menuItems } from '@/lib/data'

export default function Home() {
  if (menuItems.length > 0) {
    redirect(`/${menuItems[0].id}`)
  }

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">欢迎使用书签导航</h1>
    </div>
  )
}