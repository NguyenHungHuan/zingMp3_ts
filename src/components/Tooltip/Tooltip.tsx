import { useState, useRef, useId, type ElementType } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useDismiss,
  FloatingArrow,
  FloatingPortal,
  useInteractions
} from '@floating-ui/react'

interface Props {
  children: React.ReactNode
  as?: ElementType
  className?: string
  text?: string
}

const Tooltip = ({ children, as: Element = 'div', className, text }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<SVGSVGElement>(null)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const id = useId()
  const hover = useHover(context, { move: false })
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss])

  return (
    <>
      <Element className={className} ref={refs.setReference} {...getReferenceProps()} onClick={() => setIsOpen(false)}>
        {children}
      </Element>
      {isOpen && (
        <FloatingPortal id={id}>
          <div
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              zIndex: 100
            }}
            aria-hidden
            className='bg-[#333] px-2 py-[3px] rounded text-white text-[11px]'
            ref={refs.setFloating}
            {...getFloatingProps()}
          >
            <FloatingArrow ref={arrowRef} context={context} fill={'#333'} />
            {text}
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

export default Tooltip
