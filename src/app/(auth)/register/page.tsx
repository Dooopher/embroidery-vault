import Link from 'next/link'
import { signup } from '../actions'

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

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams

  const errorMessage =
    resolvedSearchParams.error === 'could_not_create'
      ? 'Account could not be created.'
      : null

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription>
            Start organizing your embroidery designs
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

            <Button formAction={signup} className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}