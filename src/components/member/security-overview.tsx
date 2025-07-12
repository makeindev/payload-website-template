'use client'

import { AlertTriangle, CheckCircle2, Globe, Lock, Shield } from 'lucide-react'
import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import type { User } from '@/payload-types'

interface SecurityOverviewProps {
  user: User
}

export function SecurityOverview({ user }: SecurityOverviewProps) {
  // Calculate security score based on various factors
  const getSecurityScore = () => {
    let score = 0
    const factors = []

    // Email verification (30 points)
    if (user.emailVerified) {
      score += 30
      factors.push('Email verified')
    } else {
      factors.push('Email not verified')
    }

    // Account age (20 points if > 1 day)
    const accountAge = user.createdAt
      ? Math.floor(
          (new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24),
        )
      : 0
    if (accountAge > 1) {
      score += 20
      factors.push('Established account')
    }

    // Role assignment (20 points)
    if (user.role) {
      score += 20
      factors.push('Role assigned')
    }

    // Password set (30 points - assuming if user exists, password is set)
    score += 30
    factors.push('Password protected')

    return { factors, score }
  }

  const { factors, score } = getSecurityScore()

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: 'Strong', variant: 'success' as const }
    if (score >= 60) return { label: 'Good', variant: 'warning' as const }
    return { label: 'Needs Improvement', variant: 'destructive' as const }
  }

  const scoreStatus = getScoreStatus(score)

  const securityFeatures = [
    {
      action: !user.emailVerified ? 'Verify Email' : null,
      description: 'Confirms your email address ownership',
      icon: CheckCircle2,
      name: 'Email Verification',
      status: user.emailVerified,
    },
    {
      action: 'Change Password',
      description: 'Account secured with password',
      icon: Lock,
      name: 'Password Protection',
      status: true, // Assuming password is always set for authenticated users
    },
    {
      action: 'View Activity',
      description: 'Track account access activity',
      icon: Globe,
      name: 'Login Monitoring',
      onClick: () => setShowLoginHistory(true),
      status: true,
    },
  ]

  const [showLoginHistory, setShowLoginHistory] = useState(false)
  const [page, setPage] = useState(1)
  const perPage = 5
  const loginHistory = user.loginHistory || []
  const totalPages = Math.ceil(loginHistory.length / perPage)
  const paginatedHistory = loginHistory.slice((page - 1) * perPage, page * perPage)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Security Score</span>
            <Badge variant={scoreStatus.variant}>{scoreStatus.label}</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall security</span>
              <span className={`font-medium ${getScoreColor(score)}`}>{score}/100</span>
            </div>
            <Progress value={score} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Based on {factors.length} security factors
            </p>
          </div>
        </div>

        <Separator />

        {/* Security Features */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Security Features</h4>
          <div className="space-y-3">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-1.5 ${
                      feature.status
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                    }`}
                  >
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{feature.name}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                {feature.action && (
                  <Button variant="outline" size="sm" className="text-xs" onClick={feature.onClick}>
                    {feature.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Login History */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Recent Login</h4>
          {user.loginHistory && user.loginHistory.length > 0 ? (
            <div className="rounded-lg border border-border bg-muted/60 p-3 shadow-sm dark:bg-muted/30">
              <div className="mb-1 flex items-center gap-2 text-sm">
                <span className="font-medium text-muted-foreground">Date:</span>
                <span className="text-foreground">
                  {new Date(user.loginHistory[user.loginHistory.length - 1].date).toLocaleString()}
                </span>
              </div>
              {user.loginHistory[user.loginHistory.length - 1].ip && (
                <div className="mb-1 flex items-center gap-2 text-sm">
                  <span className="font-medium text-muted-foreground">IP:</span>
                  <span className="text-foreground">
                    {user.loginHistory[user.loginHistory.length - 1].ip}
                  </span>
                </div>
              )}
              {user.loginHistory[user.loginHistory.length - 1].userAgent && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-muted-foreground">Browser:</span>
                  <span
                    className="max-w-xs truncate text-foreground"
                    title={user.loginHistory[user.loginHistory.length - 1].userAgent!}
                  >
                    {user.loginHistory[user.loginHistory.length - 1].userAgent}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">No login history recorded yet.</div>
          )}
        </div>

        <Separator />

        {/* Security Recommendations */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recommendations</h4>
          <div className="space-y-2">
            {!user.emailVerified && (
              <div className="flex items-start gap-2 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Verify your email address
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Email verification is required for account security and password recovery.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Modal for Login History */}
      {showLoginHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-0 shadow-2xl">
            <div className="flex items-center justify-between rounded-t-xl border-b border-border px-6 py-4">
              <h3 className="text-lg font-semibold">Login History</h3>
              <button
                className="text-2xl font-bold text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setShowLoginHistory(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-4">
              {loginHistory.length === 0 ? (
                <div className="text-sm text-muted-foreground">No login history recorded yet.</div>
              ) : (
                <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                  {paginatedHistory.map((entry, idx) => (
                    <div
                      key={idx}
                      className="mb-2 rounded-lg border border-border bg-muted/60 p-3 shadow-sm last:mb-0 dark:bg-muted/30"
                    >
                      <div className="mb-1 flex items-center gap-2 text-sm">
                        <span className="font-medium text-muted-foreground">Date:</span>
                        <span className="text-foreground">
                          {new Date(entry.date).toLocaleString()}
                        </span>
                      </div>
                      {entry.ip && (
                        <div className="mb-1 flex items-center gap-2 text-sm">
                          <span className="font-medium text-muted-foreground">IP:</span>
                          <span className="text-foreground">{entry.ip}</span>
                        </div>
                      )}
                      {entry.userAgent && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-muted-foreground">Browser:</span>
                          <span
                            className="max-w-xs truncate text-foreground"
                            title={entry.userAgent!}
                          >
                            {entry.userAgent}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
