import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useScrollTop(dependencyList: any = []) {
  useEffect(() => {
    document.getElementsByClassName('main')[0].scroll({
      top: 0,
      behavior: 'smooth'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList)
}
