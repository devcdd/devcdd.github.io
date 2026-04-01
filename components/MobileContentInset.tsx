import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function MobileContentInset({ children }: Props) {
  return <div className="px-3 sm:px-0">{children}</div>
}
