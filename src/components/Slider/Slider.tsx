import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from '~/../node_modules/swiper'
import 'swiper/css'
import { Link } from 'react-router-dom'
import { ItemBanner } from '~/types/home'
interface Props {
  dataBanner?: Array<ItemBanner>
}

const Slider = ({ dataBanner }: Props) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return (
    <Swiper
      className='group'
      modules={[Autoplay, Navigation]}
      slidesPerView={3}
      allowTouchMove={false}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        stopOnLastSlide: false
      }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current
      }}
    >
      {dataBanner?.map((item) => (
        <SwiperSlide key={item.encodeId} className='ease-in-out duration-500 rounded-lg overflow-hidden'>
          <Link to={'/'}>
            <img alt='' src={item.banner} className='w-full h-full object-cover' />
          </Link>
        </SwiperSlide>
      ))}
      <button
        ref={prevRef}
        className='invisible group-hover:visible hover:opacity-90 absolute z-[5] top-[50%] -translate-y-1/2 left-[25px] text-white flex items-center justify-center rounded-full bg-[#ffffff26] shadow-md p-[10px]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-9 h-9'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
      </button>
      <button
        ref={nextRef}
        className='invisible group-hover:visible hover:opacity-90 absolute z-[5] top-[50%] -translate-y-1/2 right-[25px] text-white flex items-center justify-center rounded-full bg-[#ffffff26] shadow-md p-[10px]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-9 h-9'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </button>
    </Swiper>
  )
}

export default Slider
