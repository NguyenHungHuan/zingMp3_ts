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
  useClick,
  useDismiss,
  useInteractions,
  type Placement
} from '@floating-ui/react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
  numberDelay?: number
  NumberOffsetX?: number
  NumberOffsetY?: number
  isHover?: boolean
  isClick?: boolean
  setActive?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  placement = 'bottom-start',
  numberDelay = 0,
  NumberOffsetX = 5,
  NumberOffsetY = 0,
  isHover = true,
  isClick = false,
  setActive
}: Props) {
  const [open, setOpen] = useState(false)
  const { x, y, refs, strategy, context } = useFloating({
    placement: placement,
    open: open,
    onOpenChange: (open) => {
      setActive && setActive(open)
      setOpen(open)
    },
    middleware: [
      offset({
        mainAxis: NumberOffsetX,
        alignmentAxis: NumberOffsetY
      }),
      shift(),
      flip()
    ],
    whileElementsMounted: autoUpdate
  })
  const id = useId()
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: isHover,
      delay: { open: numberDelay },
      handleClose: safePolygon()
    }),
    useClick(context, {
      enabled: isClick
    }),
    dismiss
  ])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {open && (
        <FloatingPortal id={id}>
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              zIndex: 200
            }}
            aria-hidden
            onClick={(e) => e.stopPropagation()}
            {...getFloatingProps()}
          >
            {renderPopover}
          </div>
        </FloatingPortal>
      )}
    </Element>
  )
}
