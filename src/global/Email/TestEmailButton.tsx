'use client'
import React, { useState } from 'react'

import { useTheme } from '@/providers/Theme'

export const TestEmailButton: React.FC = () => {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('Test Email')
  const [content, setContent] = useState('<p>This is a test email from Payload CMS.</p>')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { theme } = useTheme()

  const sendTestEmail = async () => {
    setLoading(true)
    setResult(null)
    try {
      console.log('[TestEmailButton] Sending test email with:', { content, subject, to })
      const res = await fetch('/api/email/send', {
        body: JSON.stringify({ emailTo: to, subject, template: content }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      console.log('[TestEmailButton] Response status:', res.status)
      const data = await res.json()
      console.log('[TestEmailButton] Response data:', data)
      if (data.success) {
        setResult('success: ' + data.message)
      } else {
        setResult('failed: ' + (data.error || data.message))
      }
    } catch (err) {
      console.error('[TestEmailButton] Error sending test email:', err)
      setResult('failed: ' + (err instanceof Error ? err.message : String(err)))
    }
    setLoading(false)
  }

  const isDark = theme === 'dark'
  const cardStyle: React.CSSProperties = {
    background: isDark ? '#18181b' : '#fff',
    border: isDark ? '1px solid #27272a' : '1px solid #e5e7eb',
    borderRadius: 12,
    boxShadow: isDark ? '0 2px 16px 0 rgba(0,0,0,0.7)' : '0 2px 16px 0 rgba(0,0,0,0.08)',
    color: isDark ? '#f4f4f5' : '#18181b',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 24,
    maxWidth: 480,
    padding: 24,
  }
  const labelStyle: React.CSSProperties = {
    color: isDark ? '#e0e0e0' : '#222',
    display: 'block',
    fontWeight: 600,
    marginBottom: 6,
  }
  const inputStyle: React.CSSProperties = {
    background: isDark ? '#232326' : '#fafafa',
    border: isDark ? '1px solid #444' : '1px solid #ccc',
    borderRadius: 6,
    boxSizing: 'border-box',
    color: isDark ? '#f4f4f5' : '#18181b',
    fontSize: 15,
    marginBottom: 16,
    outline: 'none',
    padding: '8px 12px',
    transition: 'border 0.2s',
    width: '100%',
  }
  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    fontFamily: 'monospace',
    minHeight: 80,
    resize: 'vertical',
  }
  const buttonStyle: React.CSSProperties = {
    background: loading || !to ? (isDark ? '#333' : '#ccc') : isDark ? '#2563eb' : '#2563eb',
    border: 'none',
    borderRadius: 6,
    boxShadow: isDark ? '0 1px 4px 0 rgba(0,0,0,0.5)' : '0 1px 4px 0 rgba(0,0,0,0.08)',
    color: '#fff',
    cursor: loading || !to ? 'not-allowed' : 'pointer',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.2,
    marginTop: 8,
    padding: '10px 20px',
    transition: 'background 0.2s',
    width: '100%',
  }
  const resultStyle: React.CSSProperties = {
    color: result?.startsWith('success')
      ? isDark
        ? '#22c55e'
        : '#16a34a'
      : isDark
        ? '#f87171'
        : '#dc2626',
    fontWeight: 500,
    marginTop: 16,
    whiteSpace: 'pre-line',
  }

  return (
    <div style={cardStyle}>
      <h3
        style={{
          color: isDark ? '#fff' : '#18181b',
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 18,
        }}
      >
        Send Test Email
      </h3>
      <div>
        <label style={labelStyle} htmlFor="test-email-to">
          To
        </label>
        <input
          id="test-email-to"
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="recipient@example.com"
          style={inputStyle}
          autoComplete="off"
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="test-email-subject">
          Subject
        </label>
        <input
          id="test-email-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle} htmlFor="test-email-content">
          Content
        </label>
        <textarea
          id="test-email-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          style={textareaStyle}
        />
      </div>
      <button onClick={sendTestEmail} disabled={loading || !to} type="button" style={buttonStyle}>
        {loading ? 'Sending...' : 'Send Test Email'}
      </button>
      {result && <div style={resultStyle}>{result}</div>}
    </div>
  )
}
