import BookmarkCard from './BookmarkCard'
import { Bookmark } from '@/lib/data'

type BookmarkGroupProps = {
  title: string
  bookmarks: Bookmark[]
}

export default function BookmarkGroup({ title, bookmarks }: BookmarkGroupProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {bookmarks.map(bookmark => (
          <BookmarkCard key={bookmark.id} {...bookmark} />
        ))}
      </div>
    </div>
  )
}