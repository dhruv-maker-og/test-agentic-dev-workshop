import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchHabitById, HabitDetail } from '../services/habitService'

export default function HabitDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [habit, setHabit] = useState<HabitDetail | null>(null)
  const [error, setError] = useState('')

  const cardStyle: React.CSSProperties = {
    padding: '1.5rem',
    backgroundColor: 'var(--surface)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-sm)',
  }

  const loadHabit = useCallback(async () => {
    if (!id) return
    try {
      const data = await fetchHabitById(parseInt(id, 10))
      setHabit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load habit')
    }
  }, [id])

  useEffect(() => {
    loadHabit()
  }, [loadHabit])

  if (error) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button
          data-testid="back-button"
          onClick={() => navigate('/home')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            cursor: 'pointer',
          }}
        >
          ← Back to Habits
        </button>
      </div>
    )
  }

  if (!habit) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div
      data-testid="habit-detail"
      style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}
    >
      <button
        data-testid="back-button"
        onClick={() => navigate('/home')}
        style={{
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface)',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}
      >
        ← Back to Habits
      </button>

      <div
        style={{
          ...cardStyle,
          marginBottom: '1.5rem',
        }}
      >
        <h2
          data-testid="habit-detail-name"
          style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}
        >
          {habit.name}
        </h2>
        <p
          data-testid="habit-detail-description"
          style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}
        >
          {habit.description}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span
            data-testid="habit-detail-frequency"
            style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}
          >
            {habit.frequency}
          </span>
          <span
            data-testid="habit-detail-streak"
            style={{ fontSize: '0.9rem', color: 'var(--brand)', fontWeight: 500 }}
          >
            🔥 {habit.streak} day streak
          </span>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
          Completion History
        </h3>
        <div data-testid="completion-history">
          {habit.logs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No completions yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {habit.logs.map((log) => (
                <li
                  key={log.id}
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  ✓ {new Date(log.completedDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
