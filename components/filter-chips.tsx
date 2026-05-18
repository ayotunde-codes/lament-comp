import { INDUSTRIES } from '@/constants/industries'
import { INDUSTRY_LABELS, type Industry } from '@/types'

interface FilterChipsProps {
  selected: Industry | 'All'
  onChange: (val: Industry | 'All') => void
}

export default function FilterChips({ selected, onChange }: FilterChipsProps) {
  const options: Array<Industry | 'All'> = ['All', ...INDUSTRIES]

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: 'none' }}
      role="group"
      aria-label="Filter by industry"
    >
      {options.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          aria-pressed={selected === option}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === option
              ? 'bg-accent text-canvas'
              : 'bg-surface border border-border text-muted hover:border-accent hover:text-primary'
          }`}
        >
          {option === 'All' ? 'All' : INDUSTRY_LABELS[option]}
        </button>
      ))}
    </div>
  )
}
