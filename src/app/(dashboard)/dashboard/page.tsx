import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { count } = await supabase
    .from('designs')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h2>

        <p className="text-muted-foreground">
          Welcome back. Here is an overview of your vault.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Total Designs
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {count || 0}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Account
          </h3>

          <p className="mt-2 text-sm font-medium">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">
          Upload and Gallery features coming next.
        </p>
      </div>
    </div>
  )
}