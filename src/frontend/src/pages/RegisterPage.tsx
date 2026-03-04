import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    setError('')
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Registration failed'); return }
      localStorage.setItem('token', data.token)
      navigate('/home')
    } catch {
      setError('Unable to connect to server')
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)',
    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
    background: 'var(--bg)', outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '40px 20px', minHeight: '100vh',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,75,49,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        background: 'var(--surface)', borderRadius: '20px', padding: '48px 44px',
        width: '100%', maxWidth: '420px', boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)', position: 'relative', zIndex: 1,
      }}>
        <span style={{
          fontFamily: 'DM Serif Display, serif', fontSize: '28px',
          color: 'var(--brand)', display: 'block', marginBottom: '6px',
        }}>FoodOrder</span>

        <h1 style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.3px', marginBottom: '4px' }}>
          Create account
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Start ordering from your favourite restaurants
        </p>

        {error && (
          <div style={{
            background: 'var(--brand-light)', border: '1px solid #FFCFC4',
            borderRadius: 'var(--radius-sm)', padding: '10px 14px',
            fontSize: '13px', color: 'var(--brand)', marginBottom: '18px',
          }}>
            ⚠ {error}
          </div>
        )}

        {[
          { label: 'Full name', type: 'text', placeholder: 'Jane Smith', value: name, setter: setName, testid: 'name-input' },
          { label: 'Email address', type: 'email', placeholder: 'you@example.com', value: email, setter: setEmail, testid: 'email-input' },
          { label: 'Password', type: 'password', placeholder: 'At least 8 characters', value: password, setter: setPassword, testid: 'password-input' },
        ].map(field => (
          <div key={field.testid} style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '7px' }}>
              {field.label}
            </label>
            <input
              data-testid={field.testid}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.background = 'white' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'var(--bg)' }}
            />
          </div>
        ))}

        <button
          data-testid="register-button"
          onClick={handleRegister}
          style={{
            width: '100%', padding: '12px', background: 'var(--brand)', color: 'white',
            border: 'none', borderRadius: 'var(--radius-sm)',
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 500,
            cursor: 'pointer', marginTop: '8px', transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--brand-dark)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--brand)')}
        >
          Create account
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: 'var(--brand)', fontWeight: 500, cursor: 'pointer' }}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  )
}
