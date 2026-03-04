import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Invalid credentials'); return }
      localStorage.setItem('token', data.token)
      navigate('/home')
    } catch {
      setError('Unable to connect to server')
    }
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '40px 20px',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background accents */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,75,49,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,75,49,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'var(--surface)',
        borderRadius: '20px',
        padding: '48px 44px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '28px',
          color: 'var(--brand)',
          display: 'block',
          marginBottom: '6px',
        }}>FoodOrder</span>

        <h1 style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.3px', marginBottom: '4px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Sign in to your account to continue
        </p>

        {error && (
          <div style={{
            background: 'var(--brand-light)',
            border: '1px solid #FFCFC4',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            fontSize: '13px',
            color: 'var(--brand)',
            marginBottom: '18px',
          }}>
            ⚠ {error}
          </div>
        )}

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '7px' }}>
            Email address
          </label>
          <input
            data-testid="email-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%', padding: '11px 14px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)',
              fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
              background: 'var(--bg)', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.background = 'white' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg)' }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '7px' }}>
            Password
          </label>
          <input
            data-testid="password-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', padding: '11px 14px',
              border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)',
              fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
              background: 'var(--bg)', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.background = 'white' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg)' }}
          />
        </div>

        <button
          data-testid="login-button"
          onClick={handleLogin}
          style={{
            width: '100%', padding: '12px',
            background: 'var(--brand)', color: 'white',
            border: 'none', borderRadius: 'var(--radius-sm)',
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 500,
            cursor: 'pointer', marginTop: '8px', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--brand-dark)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--brand)')}
        >
          Sign in
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          No account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: 'var(--brand)', fontWeight: 500, cursor: 'pointer' }}
          >
            Create one
          </span>
        </div>
      </div>
    </div>
  )
}
