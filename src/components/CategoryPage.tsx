import { CategoryData } from '@/lib/data'
import BookmarkGroup from '@/components/BookmarkGroup'

type CategoryPageProps = {
  data: CategoryData
}

export default function CategoryPage({ data }: CategoryPageProps) {
  return (
    <div className="space-y-8">
      {data.bookmarkGroups.map(group => (
        <BookmarkGroup key={group.id} title={group.title} bookmarks={group.bookmarks} />
      ))}
    </div>
  )
}