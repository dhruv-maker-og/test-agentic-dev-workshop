import { useState } from 'react'

interface HabitFormProps {
  onSubmit: (data: { name: string; description: string; frequency: string }) => void
  onCancel: () => void
  initialData?: { name: string; description: string; frequency: string }
}

export default function HabitForm({ onSubmit, onCancel, initialData }: HabitFormProps) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [frequency, setFrequency] = useState(initialData?.frequency ?? 'daily')
  const isEditing = !!initialData

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) return
    onSubmit({ name: name.trim(), description: description.trim(), frequency })
  }

  return (
    <div
      data-testid="habit-form"
      style={{
        padding: '1.5rem',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '1.5rem',
      }}
    >
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
        {isEditing ? 'Edit Habit' : 'Create New Habit'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
            Name
          </label>
          <input
            data-testid="habit-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Morning Run"
            required
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              fontSize: '0.9rem',
            }}
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
            Description
          </label>
          <input
            data-testid="habit-description-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Run for 30 minutes every morning"
            required
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              fontSize: '0.9rem',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
            Frequency
          </label>
          <select
            data-testid="habit-frequency-input"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              fontSize: '0.9rem',
              backgroundColor: 'var(--surface)',
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            data-testid="habit-form-submit"
            type="submit"
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
            {isEditing ? 'Save Changes' : 'Create Habit'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
