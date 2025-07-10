/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button, toast } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { signin } from 'payload-auth-plugin/client'
import React from 'react'
const AdminLoginViewClient = () => {
  const { oauth } = signin({ name: 'admin' })

  const handleGoogleSignin = async () => {
    await oauth('google')
  }
  const handleAuth0Signin = async () => {
    await oauth('auth0')
  }
  return (
    <div className="w-full h-full bg-red-500">
      <div className="flex flex-col items-start gap-y-4">
        <Button type="button" onClick={handleGoogleSignin}>
          Signin with Google
        </Button>
        <Button type="button" onClick={handleAuth0Signin}>
          Signin with Auth0
        </Button>
      </div>
    </div>
  )
}

export default AdminLoginViewClient
