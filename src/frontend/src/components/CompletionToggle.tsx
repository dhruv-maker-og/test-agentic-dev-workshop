interface CompletionToggleProps {
  completed: boolean
  onToggle: () => void
}

export default function CompletionToggle({ completed, onToggle }: CompletionToggleProps) {
  return (
    <button
      data-testid="completion-toggle"
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
      style={{
        padding: '6px 16px',
        borderRadius: 'var(--radius-sm)',
        border: completed ? '2px solid var(--brand)' : '2px solid var(--border)',
        backgroundColor: completed ? 'var(--brand)' : 'var(--surface)',
        color: completed ? '#fff' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.85rem',
        transition: 'all 0.2s ease',
      }}
    >
      {completed ? '✓ Done' : 'Mark Done'}
    </button>
  )
}
