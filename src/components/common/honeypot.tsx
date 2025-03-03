import { Dispatch, SetStateAction } from 'react'

type HoneypotProps = {
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <input
      autoComplete="off"
      className="sr-only"
      name="honeypot"
      tabIndex={-1}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
