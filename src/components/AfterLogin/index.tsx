'use client'
import './styles.scss'

import { Button } from '@payloadcms/ui'
import React from 'react'

import { adminAuthClient } from '@/lib/authclient'

export const AdminLogin = () => {
  const { oauth } = adminAuthClient.signin()

  const handleGoogleSignin = async () => {
    oauth('google')
  }
  const handleGithubSignin = async () => {
    oauth('github')
  }
  return (
    <div className="oauth-container">
      <Button type="button" onClick={handleGoogleSignin} className="oauth-btn">
        Signin with Google
      </Button>
      <Button type="button" onClick={handleGithubSignin} className="oauth-btn">
        Signin with Auth0
      </Button>
    </div>
  )
}
