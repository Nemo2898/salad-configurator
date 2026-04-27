import type { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal(props: ModalProps) {
  if (!props.isOpen) return null

  return <div>{props.children}</div>
}
