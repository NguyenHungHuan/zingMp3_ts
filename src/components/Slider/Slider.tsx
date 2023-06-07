import { useEffect } from 'react'
import { DataBanner } from '~/types/home'

interface Props {
  dataBanner?: DataBanner
}

const Slider = ({ dataBanner }: Props) => {
  useEffect(() => {
    const sliderEls = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2

    const intervalId = setInterval(() => {
      const limit = min > max ? sliderEls.length - 1 : max
      const list = []
      for (let i = min; i <= limit; i++) {
        list.push(i)
      }
      if (min > max) {
        for (let i = 0; i <= max; i++) {
          list.push(i)
        }
      }
      for (let i = 0; i < sliderEls.length; i++) {
        sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-[2]')
        sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-[3]')
        sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-[3]')

        if (list.some((item) => item === i)) {
          ;(sliderEls[i] as HTMLElement).style.cssText = `display: block`
        } else {
          ;(sliderEls[i] as HTMLElement).style.cssText = `display: none`
        }
      }
      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList?.add('animate-slide-right', 'order-last', 'z-[2]')
        } else if (item === min) {
          sliderEls[item]?.classList?.add('animate-slide-left', 'order-first', 'z-[3]')
        } else {
          sliderEls[item]?.classList?.add('animate-slide-left2', 'order-2', 'z-[3]')
        }
      })
      min = min === sliderEls.length - 1 ? 0 : min + 1
      max = max === sliderEls.length - 1 ? 0 : max + 1
    }, 3000)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [])

  return (
    <div className='flex items-center gap-[30px] overflow-hidden'>
      {dataBanner?.map((item, index) => (
        <img
          alt=''
          key={item.encodeId}
          src={item.banner}
          className={`slider-item flex-1 ease-linear object-cover w-[30%] rounded-lg ${
            index <= 2 ? 'block' : 'hidden'
          }`}
        />
      ))}
    </div>
  )
}

export default Slider
