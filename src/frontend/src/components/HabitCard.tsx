import CompletionToggle from './CompletionToggle'

interface HabitCardProps {
  id: number
  name: string
  description: string
  frequency: string
  streak: number
  completedToday: boolean
  onToggle: (id: number) => void
  onClick: (id: number) => void
}

export default function HabitCard({
  id,
  name,
  description,
  frequency,
  streak,
  completedToday,
  onToggle,
  onClick,
}: HabitCardProps) {
  return (
    <div
      data-testid="habit-card"
      role="button"
      tabIndex={0}
      onClick={() => onClick(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(id)
        }
      }}
      style={{
        padding: '1.25rem',
        backgroundColor: 'var(--surface)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          data-testid="habit-name"
          style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}
        >
          {name}
        </h3>
        <p
          data-testid="habit-description"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            marginBottom: '0.5rem',
          }}
        >
          {description}
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span
            data-testid="habit-frequency"
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textTransform: 'capitalize',
            }}
          >
            {frequency}
          </span>
          <span
            data-testid="habit-streak"
            style={{
              fontSize: '0.8rem',
              color: 'var(--brand)',
              fontWeight: 500,
            }}
          >
            🔥 {streak} day streak
          </span>
        </div>
      </div>
      <div style={{ marginLeft: '1rem', flexShrink: 0 }}>
        <CompletionToggle
          completed={completedToday}
          onToggle={() => onToggle(id)}
        />
      </div>
    </div>
  )
}
