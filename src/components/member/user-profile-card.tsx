'use client'

import { CheckCircle, Edit, Settings, User, XCircle } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { User as UserType } from '@/payload-types'

interface UserProfileCardProps {
  user: UserType
  accountAgeDays: number
  setUser?: (user: UserType) => void
}

export function UserProfileCard({ accountAgeDays, setUser, user }: UserProfileCardProps) {
  // Generate initials from email
  const getInitials = (email: string) => {
    const parts = email.split('@')[0].split('.')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return email.slice(0, 2).toUpperCase()
  }

  const createdAt = user.createdAt ? new Date(user.createdAt) : new Date()
  const formattedCreatedAt = createdAt.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const [showEditProfile, setShowEditProfile] = useState(false)
  const [editName, setEditName] = useState(user.name || '')
  const [editLoading, setEditLoading] = useState(false)

  // Placeholder for update logic
  const handleSaveName = async () => {
    setEditLoading(true)
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        body: JSON.stringify({ name: editName }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
      })

      if (!res.ok) throw new Error('Failed to update profile')

      setEditLoading(false)
      setShowEditProfile(false)
      toast.success('Profile updated!')

      if (typeof setUser === 'function') {
        const updatedUser = await res.json()
        setUser(updatedUser)
      } else {
        // Fallback: update local name immediately if setUser is not provided
        user.name = editName
      }
      setEditName(editName)
    } catch (_) {
      setEditLoading(false)
      alert('Failed to update profile')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={user.email} />
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              {getInitials(user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold">{user.email}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
              {user.emailVerified ? (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="warning" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Unverified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Member for {accountAgeDays} {accountAgeDays === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>

        <Separator />

        {/* Account Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Account Details</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{user.name || '-'}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Email address</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Account type</span>
              <span className="font-medium capitalize">{user.role}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Member since</span>
              <span className="font-medium">{formattedCreatedAt}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Email verified</span>
              <span className="font-medium">{user.emailVerified ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="justify-start"
              onClick={() => setShowEditProfile(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-0 shadow-2xl">
            <div className="flex items-center justify-between rounded-t-xl border-b border-border px-6 py-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                className="text-2xl font-bold text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setShowEditProfile(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form
              className="space-y-4 px-6 py-4"
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveName()
              }}
            >
              <div>
                <label
                  htmlFor="edit-name"
                  className="mb-1 block text-sm font-medium text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  className="w-full rounded border border-border bg-muted/60 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary dark:bg-muted/30"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={editLoading}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditProfile(false)}
                  disabled={editLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={editLoading || !editName.trim()}
                >
                  {editLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  )
}
