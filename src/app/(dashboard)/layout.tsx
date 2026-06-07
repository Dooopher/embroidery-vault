import { logout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import { DashboardSidebar } from '@/components/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden md:flex fixed inset-y-0 w-64">
        <DashboardSidebar />
      </aside>

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="flex h-16 items-center justify-end border-b bg-white px-4">
          <form action={logout}>
            <Button variant="outline" type="submit">
              Log out
            </Button>
          </form>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}