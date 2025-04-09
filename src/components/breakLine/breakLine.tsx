'use client'

export default function BreakLine (text: string) {
  return text.split('\n').map((line, index) => (
      <span key={index} >
        {line}
        <br />
      </span>
    ))
}