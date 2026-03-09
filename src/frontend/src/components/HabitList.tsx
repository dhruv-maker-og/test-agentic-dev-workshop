import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import HabitCard from './HabitCard'
import HabitForm from './HabitForm'
import {
  fetchHabits,
  createHabit,
  toggleHabitLog,
  Habit,
} from '../services/habitService'

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loadHabits = useCallback(async () => {
    try {
      const data = await fetchHabits()
      setHabits(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load habits')
    }
  }, [])

  useEffect(() => {
    loadHabits()
  }, [loadHabits])

  const handleCreate = async (data: { name: string; description: string; frequency: string }) => {
    try {
      await createHabit(data)
      setShowForm(false)
      await loadHabits()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create habit')
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await toggleHabitLog(id)
      await loadHabits()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle completion')
    }
  }

  const handleClick = (id: number) => {
    navigate(`/habits/${id}`)
  }

  return (
    <div data-testid="habit-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600 }}>My Habits</h2>
        <button
          data-testid="create-habit-button"
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: 'var(--brand)',
            color: '#fff',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          {showForm ? 'Cancel' : '+ Create Habit'}
        </button>
      </div>

      {error && (
        <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
      )}

      {showForm && (
        <HabitForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {habits.length === 0 && !showForm ? (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>
          No habits yet. Create your first habit to get started!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              name={habit.name}
              description={habit.description}
              frequency={habit.frequency}
              streak={habit.streak}
              completedToday={habit.completedToday}
              onToggle={handleToggle}
              onClick={handleClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
