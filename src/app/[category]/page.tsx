import { notFound } from 'next/navigation'
import { categoryData } from '@/lib/data'
import CategoryPage from '@/components/CategoryPage'

export default async function DynamicCategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[await params.category]

  if (!category) {
    notFound()
  }

  return <CategoryPage data={category} />
}