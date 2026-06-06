import Link from 'next/link'
import { login } from '../actions'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams

  const errorMessage =
    resolvedSearchParams.error === 'invalid_credentials'
      ? 'Invalid email or password.'
      : null

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Sign In
          </CardTitle>
          <CardDescription>
            Enter your email to access Embroidery Vault
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">
                {errorMessage}
              </p>
            )}

            <Button formAction={login} className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}