import React, { useState } from 'react'
import { createPortal } from 'react-dom'

export const IFrameComponent = ({
  children,
  head,
  ...props
}) => {
  const [contentRef, setContentRef] = useState(null)
  const mountNodeBody = contentRef?.contentWindow?.document?.body
  const mountNodeHead = contentRef?.contentWindow?.document?.head

  return (
    <iframe {...props} ref={setContentRef}>
      {mountNodeHead && createPortal(head, mountNodeHead)}
      {mountNodeBody && createPortal(children, mountNodeBody)}
    </iframe>
  )
}
