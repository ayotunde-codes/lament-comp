'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useUploadVoiceNote } from '@/services/voice/queries'

const WAVEFORM_HEIGHTS = [8, 14, 20, 16, 26, 18, 12, 8, 18, 24, 16, 28, 20, 12, 8, 20, 26, 14, 10, 8]

interface Props {
  voiceUrl: string
  onRecorded: (url: string) => void
}

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

export default function VoiceRecorder({ voiceUrl, onRecorded }: Props) {
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { mutate: uploadVoice, isPending: isUploading } = useUploadVoiceNote()

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      chunksRef.current = []
      mr.ondataavailable = e => chunksRef.current.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        stream.getTracks().forEach(t => t.stop())
        uploadVoice(blob, { onSuccess: ({ url }) => onRecorded(url) })
      }
      mr.start()
      mediaRef.current = mr
      setRecording(true)
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000)
    } catch {
      // microphone permission denied
    }
  }, [onRecorded, uploadVoice])

  const stop = useCallback(() => {
    mediaRef.current?.stop()
    if (timerRef.current) clearInterval(timerRef.current)
    setRecording(false)
  }, [])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  if (isUploading) {
    return (
      <div className="flex items-center gap-3 bg-elevated border border-border rounded-xl px-4 py-3">
        <span className="text-sm text-muted">Uploading voice note…</span>
      </div>
    )
  }

  if (voiceUrl) {
    return (
      <div className="flex items-center gap-3 bg-elevated border border-border rounded-xl px-4 py-3">
        <audio controls src={voiceUrl} className="flex-1 h-8" />
        <button onClick={() => onRecorded('')} className="text-xs text-muted hover:text-danger transition-colors shrink-0">
          Remove
        </button>
      </div>
    )
  }

  if (recording) {
    return (
      <div className="flex items-center gap-3 bg-elevated border border-accent/40 rounded-xl px-4 py-3">
        <div className="flex items-end gap-0.5 h-8">
          {WAVEFORM_HEIGHTS.map((h, i) => (
            <div key={i} className="w-0.5 bg-accent rounded-full animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
        <span className="text-sm text-muted font-mono tabular-nums">{fmt(elapsed)}</span>
        <button onClick={stop} className="ml-auto bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-accent-hover transition-colors shrink-0">
          Stop Recording
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={start}
      className="flex items-center gap-3 w-full bg-elevated border border-border rounded-xl px-4 py-3 text-left hover:border-accent/50 transition-colors group"
    >
      <span className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-lg shrink-0 group-hover:bg-accent/30 transition-colors">
        🎙️
      </span>
      <div>
        <p className="text-sm text-primary">Tap to record</p>
        <p className="text-xs text-muted">Voice will be modified for anonymity</p>
      </div>
    </button>
  )
}
