import { logout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">
            Embroidery Vault
          </h1>

          <form action={logout}>
            <Button variant="outline" type="submit">
              Log out
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}