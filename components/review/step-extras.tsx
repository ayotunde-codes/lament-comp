'use client'
import VoiceRecorder from './voice-recorder'
import type { ReviewFormData } from '@/hooks/use-review-flow'

const EMOJIS = ['😊', '😤', '😭', '🔥', '💀', '🙄', '😮', '😂']
const STICKERS = ['🎉', '💔', '🙏', '🤡', '👎', '👏', '😴', '🤯']

interface Props {
  formData: ReviewFormData
  setField: <K extends keyof ReviewFormData>(key: K, value: ReviewFormData[K]) => void
  onNext: () => void
}

export default function StepExtras({ formData, setField, onNext }: Props) {
  function toggleEmoji(e: string) {
    setField('emoji', formData.emoji === e ? '' : e)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-primary">Add Details</h2>
        <p className="text-sm text-muted mt-1">Rate your experience and add extras</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">How was your experience? <span className="text-danger text-xs">*required</span></p>
        <div className="flex items-center gap-2" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map(pos => (
            <button
              key={pos}
              type="button"
              onClick={() => setField('rating', pos)}
              className={`text-3xl transition-transform hover:scale-110 active:scale-95 ${pos <= formData.rating ? 'text-star' : 'text-muted opacity-30'}`}
              aria-label={`${pos} star${pos > 1 ? 's' : ''}`}
              role="radio"
              aria-checked={formData.rating === pos}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">
          Add emoji <span className="text-muted font-normal text-xs">(optional)</span>
        </p>
        <div className="flex gap-2 flex-wrap">
          {EMOJIS.map(e => (
            <button
              key={e}
              onClick={() => toggleEmoji(e)}
              className={`text-2xl w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                formData.emoji === e ? 'border-accent bg-accent/20 scale-110' : 'border-border bg-elevated hover:border-accent/50'
              }`}
              aria-label={`Select ${e}`}
              aria-pressed={formData.emoji === e}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">
          Add GIF / Sticker <span className="text-muted font-normal text-xs">(optional)</span>
        </p>
        <div className="grid grid-cols-4 gap-2">
          {STICKERS.map(s => (
            <button
              key={s}
              onClick={() => toggleEmoji(s)}
              className={`text-3xl h-14 rounded-xl flex items-center justify-center border transition-all ${
                formData.emoji === s ? 'border-accent bg-accent/20 scale-105' : 'border-border bg-elevated hover:border-accent/50'
              }`}
              aria-label={`Select sticker ${s}`}
              aria-pressed={formData.emoji === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">
          Add voice rant <span className="text-muted font-normal text-xs">(optional)</span>
        </p>
        <VoiceRecorder voiceUrl={formData.voiceUrl} onRecorded={url => setField('voiceUrl', url)} />
      </div>

      <button
        onClick={onNext}
        disabled={formData.rating === 0}
        className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}
