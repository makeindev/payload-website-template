import Link from 'next/link'

export const AuthBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="rounded-md border p-6">{children}</div>
      <Link className="text-xs text-muted-foreground" href="/">
        &larr; Back to home
      </Link>
    </div>
  )
}
