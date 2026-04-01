'use client'

import { useServerInsertedHTML } from 'next/navigation'

interface JsonLdProps {
  id: string
  json: string
}

export default function JsonLd({ id, json }: JsonLdProps) {
  useServerInsertedHTML(() => (
    <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  ))

  return null
}
