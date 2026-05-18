'use client'
import { useState } from 'react'
import { useOrganizations, useCreateOrganization } from '@/services/organizations/queries'
import { Industry, INDUSTRY_LABELS } from '@/types'

interface Props {
  orgId: string
  orgName: string
  onSelect: (id: string, name: string) => void
  onClear: () => void
}

export default function ComposeOrgPicker({ orgId, orgName, onSelect, onClear }: Props) {
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIndustry, setNewIndustry] = useState<Industry>(Industry.Tech)

  const { data } = useOrganizations({ search: query || undefined })
  const createOrg = useCreateOrganization()
  const orgs = data?.data ?? []

  function handleAdd() {
    if (!newName.trim()) return
    createOrg.mutate(
      { name: newName.trim(), industry: newIndustry },
      {
        onSuccess: (org) => {
          onSelect(org.id, org.name)
          setShowAdd(false)
          setNewName('')
          setQuery('')
        },
      }
    )
  }

  if (orgId) {
    return (
      <div className="flex items-center justify-between bg-elevated border border-accent/40 rounded-xl px-4 py-3">
        <span className="text-sm font-semibold text-primary truncate">{orgName}</span>
        <button onClick={onClear} className="text-xs text-muted hover:text-danger transition-colors shrink-0 ml-3" aria-label="Clear selection">
          Change
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Find a company..."
        className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors"
        aria-label="Find a company"
      />

      {query && orgs.length > 0 && (
        <div className="flex flex-col gap-1 max-h-44 overflow-y-auto bg-surface border border-border rounded-xl p-1">
          {orgs.slice(0, 6).map(org => (
            <button
              key={org.id}
              onClick={() => { onSelect(org.id, org.name); setQuery('') }}
              className="flex items-center gap-3 p-2.5 rounded-lg text-left hover:bg-elevated transition-colors"
            >
              <span className="w-7 h-7 rounded-md bg-elevated flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                {org.logo ?? org.name[0].toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">{org.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{org.industry}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {!showAdd ? (
        <button onClick={() => setShowAdd(true)} className="text-xs text-accent hover:underline text-left">
          Can&apos;t find a company? Add it
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-3 bg-surface border border-border rounded-xl">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Company name"
            className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary placeholder:text-muted outline-none focus:border-accent"
          />
          <select
            value={newIndustry}
            onChange={e => setNewIndustry(e.target.value as Industry)}
            className="w-full bg-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary outline-none focus:border-accent"
          >
            {Object.values(Industry).map(i => <option key={i} value={i}>{INDUSTRY_LABELS[i]}</option>)}
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={createOrg.isPending || !newName.trim()}
              className="flex-1 bg-accent text-canvas text-sm py-2 rounded-lg font-semibold hover:bg-accent-hover transition-colors disabled:opacity-40"
            >
              {createOrg.isPending ? 'Adding…' : 'Add'}
            </button>
            <button onClick={() => setShowAdd(false)} className="flex-1 border border-border text-muted text-sm py-2 rounded-lg hover:text-primary transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
