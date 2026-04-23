'use client'
import { useState } from 'react'
import { getAllOrganizations, addOrganization } from '@/lib/store'
import { Industry } from '@/types'
import type { ReviewFormData } from '@/hooks/use-review-flow'

interface Props {
  formData: ReviewFormData
  setField: <K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => void
  onNext: () => void
}

export default function StepSelectOrg({ formData, setField, onNext }: Props) {
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIndustry, setNewIndustry] = useState<Industry>(Industry.Tech)

  const orgs = getAllOrganizations().filter(o =>
    o.name.toLowerCase().includes(query.toLowerCase())
  )

  function handleAddOrg() {
    if (!newName.trim()) return
    const id = crypto.randomUUID()
    addOrganization({ id, name: newName.trim(), logo: '🏢', industry: newIndustry, averageRating: 0, reviewCount: 0 })
    setField('orgId', id)
    setField('orgName', newName.trim())
    setShowAdd(false)
    setNewName('')
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-primary">Select Organization</h2>
        <p className="text-sm text-muted mt-1">Which company are you reviewing?</p>
      </div>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search organizations..."
        className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
      />

      <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
        {orgs.map(org => (
          <button
            key={org.id}
            onClick={() => { setField('orgId', org.id); setField('orgName', org.name) }}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
              formData.orgId === org.id ? 'border-accent bg-accent/10' : 'border-border bg-surface hover:border-accent/50'
            }`}
          >
            <span className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-accent shrink-0">{org.logo}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">{org.name}</p>
              <p className="text-xs text-muted">{org.industry}</p>
            </div>
            {formData.orgId === org.id && <span className="text-accent text-sm shrink-0">✓</span>}
          </button>
        ))}
      </div>

      {!showAdd ? (
        <button onClick={() => setShowAdd(true)} className="text-sm text-accent hover:underline text-left">
          + Add New Organization
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-3 bg-surface border border-border rounded-xl">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Organization name"
            className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-muted outline-none focus:border-accent"
          />
          <select
            value={newIndustry}
            onChange={e => setNewIndustry(e.target.value as Industry)}
            className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none focus:border-accent"
          >
            {Object.values(Industry).map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={handleAddOrg} className="flex-1 bg-accent text-white text-sm py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors">Add</button>
            <button onClick={() => setShowAdd(false)} className="flex-1 border border-border text-muted text-sm py-2 rounded-lg hover:text-primary transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!formData.orgId}
        className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
