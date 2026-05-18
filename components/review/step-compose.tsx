'use client'
import { useState } from 'react'
import VoiceRecorder from './voice-recorder'
import ComposeOrgPicker from './compose-org-picker'
import { REVIEW_TAGS } from '@/constants/review-tags'
import { TENURE_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS } from '@/constants/trust-signals'
import type { ReviewFormData } from '@/hooks/use-review-flow'
import { motion } from 'framer-motion'

const MOODS = ['😊', '😤', '😭', '🔥', '💀', '🙄', '😮', '😂', '🎉', '💔', '🙏', '🤡', '👎', '👏', '😴', '🤯']
const MAX_CHARS = 1000
const MAX_TAGS = 3

interface Props {
  formData: ReviewFormData
  setField: <K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => void
  onReview: () => void
}

export default function StepCompose({ formData, setField, onReview }: Props) {
  const [showVoice, setShowVoice] = useState(false)
  const [showMood, setShowMood] = useState(false)

  const remaining = MAX_CHARS - formData.body.length
  const canSubmit = !!formData.orgId && formData.body.trim().length > 0 && formData.rating > 0
  const blockerMsg = !formData.orgId
    ? 'Pick a company first.'
    : !formData.body.trim()
      ? 'Pour something in.'
      : formData.rating === 0
        ? 'Tap a rating to continue.'
        : ''

  function toggleTag(tag: string) {
    const current = formData.tags
    if (current.includes(tag)) {
      setField('tags', current.filter(t => t !== tag))
    } else if (current.length < MAX_TAGS) {
      setField('tags', [...current, tag])
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-semibold text-primary tracking-tight leading-tight">Drop a Spill.</h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mt-2">Sealed. No name. No trace.</p>
      </div>

      <section className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Where did this happen?</p>
        <ComposeOrgPicker
          orgId={formData.orgId}
          orgName={formData.orgName}
          onSelect={(id, name) => { setField('orgId', id); setField('orgName', name) }}
          onClear={() => { setField('orgId', ''); setField('orgName', '') }}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Your overall feeling</p>
        <div className="flex items-center gap-2" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map(pos => (
            <motion.button
              key={pos}
              type="button"
              onClick={() => setField('rating', pos)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              animate={pos <= formData.rating ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`text-3xl ${pos <= formData.rating ? 'text-star' : 'text-muted opacity-30'}`}
              aria-label={`${pos} star${pos > 1 ? 's' : ''}`}
              role="radio"
              aria-checked={formData.rating === pos}
            >
              ★
            </motion.button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Spill it</p>
          <span className="font-mono text-[10px] text-muted tabular-nums">{remaining} left</span>
        </div>
        <textarea
          value={formData.body}
          onChange={e => e.target.value.length <= MAX_CHARS && setField('body', e.target.value)}
          placeholder="Title changed. Scope didn't. Pay bumped, expectations doubled. The people were good. The system wasn't."
          rows={5}
          className="w-full bg-elevated border border-border rounded-xl px-4 py-3 text-sm text-primary placeholder:text-muted outline-none focus:border-accent transition-colors resize-none"
        />
        <p className="text-[11px] text-muted italic">First line becomes the headline.</p>
      </section>

      {/* Tag picker */}
      <section className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">What does this cover?</p>
          <span className="font-mono text-[10px] text-muted tabular-nums">
            {formData.tags.length}/{MAX_TAGS}
          </span>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select up to 3 topics">
          {REVIEW_TAGS.map(tag => {
            const active = formData.tags.includes(tag)
            const disabled = !active && formData.tags.length >= MAX_TAGS
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                disabled={disabled}
                aria-pressed={active}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-accent/15 border-accent/50 text-accent'
                    : disabled
                      ? 'border-border text-muted opacity-30 cursor-not-allowed'
                      : 'border-border text-muted hover:border-accent/40 hover:text-primary'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      {/* Trust signals */}
      <section className="flex flex-col gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">About you <span className="normal-case">(optional)</span></p>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] text-muted">Role family</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Role">
            {ROLE_OPTIONS.map(opt => {
              const active = formData.role === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setField('role', active ? '' : opt.value as ReviewFormData['role'])}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-accent/15 border-accent/50 text-accent'
                      : 'border-border text-muted hover:border-accent/40 hover:text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tenure */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] text-muted">Tenure</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tenure">
            {TENURE_OPTIONS.map(opt => {
              const active = formData.tenure === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setField('tenure', active ? '' : opt.value as ReviewFormData['tenure'])}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-accent/15 border-accent/50 text-accent'
                      : 'border-border text-muted hover:border-accent/40 hover:text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] text-muted">Status</p>
          <div className="flex gap-1.5" role="group" aria-label="Employment status">
            {STATUS_OPTIONS.map(opt => {
              const active = formData.status === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setField('status', active ? '' : opt.value as ReviewFormData['status'])}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-accent/15 border-accent/50 text-accent'
                      : 'border-border text-muted hover:border-accent/40 hover:text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {showMood && (
        <section className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Set the mood</p>
          <div className="grid grid-cols-8 gap-2">
            {MOODS.map(e => (
              <button
                key={e}
                onClick={() => setField('emoji', formData.emoji === e ? '' : e)}
                className={`text-2xl h-11 rounded-xl flex items-center justify-center border transition-all ${
                  formData.emoji === e ? 'border-accent bg-accent/20 scale-105' : 'border-border bg-elevated hover:border-accent/50'
                }`}
                aria-pressed={formData.emoji === e}
                aria-label={`Select ${e}`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>
      )}

      {showVoice && (
        <section className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Voice note</p>
          <VoiceRecorder voiceUrl={formData.voiceUrl} onRecorded={url => setField('voiceUrl', url)} />
        </section>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        <button
          onClick={() => setShowVoice(v => !v)}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border transition-colors ${
            showVoice || formData.voiceUrl ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted hover:text-primary'
          }`}
          aria-pressed={showVoice}
        >
          🎙 Voice
        </button>
        <button
          onClick={() => setShowMood(v => !v)}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border transition-colors ${
            showMood || formData.emoji ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted hover:text-primary'
          }`}
          aria-pressed={showMood}
        >
          <span>{formData.emoji || '😶'}</span> Mood
        </button>
        <motion.button
          onClick={onReview}
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.04 } : {}}
          whileTap={canSubmit ? { scale: 0.96 } : {}}
          className="ml-auto bg-accent text-canvas font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review &amp; seal →
        </motion.button>
      </div>
      {blockerMsg && (
        <p className="text-[11px] text-muted italic text-center -mt-2">{blockerMsg}</p>
      )}
    </div>
  )
}
