import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const bookmarkGroups = [
  {
    id: 1,
    title: '开发',
    bookmarks: [
      { id: 1, title: 'GitHub', description: '全球最大的代码托管平台' },
      { id: 2, title: 'Stack Overflow', description: '程序员问答社区' },
    ]
  },
  {
    id: 2,
    title: '新闻',
    bookmarks: [
      { id: 3, title: 'Hacker News', description: '科技创业新闻聚合网站' },
      { id: 4, title: 'TechCrunch', description: '科技创业公司新闻网站' },
    ]
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      {bookmarkGroups.map(group => (
        <div key={group.id} className="rounded-lg border border-gray-200 p-4">
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