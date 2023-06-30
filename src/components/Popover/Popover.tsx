import { useState, useId, type ElementType } from 'react'
import {
  useFloating,
  FloatingPortal,
  shift,
  flip,
  safePolygon,
  offset,
  autoUpdate,
  useHover,
  useInteractions,
  useDelayGroupContext,
  type Placement,
  computePosition as base
} from '@floating-ui/react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
  numberDelay?: number
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  placement = 'bottom-start',
  numberDelay = 0
}: Props) {
  const [open, setOpen] = useState(false)
  const { delay } = useDelayGroupContext()
  const { x, y, refs, strategy, context } = useFloating({
    placement: placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), shift(), flip()],
    whileElementsMounted: autoUpdate
  })
  const id = useId()
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: { open: numberDelay },
      handleClose: safePolygon()
    })
  ])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        {open && (
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              zIndex: 100
            }}
            {...getFloatingProps()}
          >
            {renderPopover}
          </div>
        )}
      </FloatingPortal>
    </Element>
  )
}
