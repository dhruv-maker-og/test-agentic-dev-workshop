import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 32px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <span style={{
        fontFamily: 'DM Serif Display, serif',
        fontSize: '22px',
        color: 'var(--brand)',
        letterSpacing: '-0.3px',
        cursor: 'pointer',
      }} onClick={() => navigate('/home')}>
        FoodOrder
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Cart icon placeholder — added by [FRONTEND] Issue during workshop */}
        <button
          onClick={handleLogout}
          data-testid="logout-button"
          style={{
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            const t = e.currentTarget
            t.style.borderColor = 'var(--brand)'
            t.style.color = 'var(--brand)'
          }}
          onMouseLeave={e => {
            const t = e.currentTarget
            t.style.borderColor = 'var(--border)'
            t.style.color = 'var(--text-secondary)'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
