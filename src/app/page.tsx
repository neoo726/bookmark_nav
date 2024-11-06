import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// This would typically come from a database or API
const bookmarkGroups = [
  {
    id: 1,
    title: 'Development',
    bookmarks: [
      { id: 1, title: 'GitHub', description: 'Where the world builds software' },
      { id: 2, title: 'Stack Overflow', description: 'Where Developers Learn, Share, & Build Careers' },
    ]
  },
  {
    id: 2,
    title: 'News',
    bookmarks: [
      { id: 3, title: 'Hacker News', description: 'A social news website focusing on computer science and entrepreneurship' },
      { id: 4, title: 'TechCrunch', description: 'The latest technology news and information on startups' },
    ]
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      {bookmarkGroups.map(group => (
        <div key={group.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
          <h2 className="text-xl font-bold mb-4">{group.title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.bookmarks.map(bookmark => (
              <Card key={bookmark.id}>
                <CardHeader>
                  <CardTitle>{bookmark.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{bookmark.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}