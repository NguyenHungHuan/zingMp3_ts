import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
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
        <SwiperSlide key={item.encodeId} className='overflow-hidden rounded-lg duration-500 ease-in-out'>
          <Link to={item.link.replace('.html', '')}>
            <img alt='' src={item.banner} className='h-full w-full object-cover' />
          </Link>
        </SwiperSlide>
      ))}
      <button
        ref={prevRef}
        className='invisible absolute left-[25px] top-[50%] z-[5] flex -translate-y-1/2 items-center justify-center rounded-full bg-[#ffffff26] p-[10px] text-white shadow-md hover:opacity-90 group-hover:visible'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-9 w-9'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
      </button>
      <button
        ref={nextRef}
        className='invisible absolute right-[25px] top-[50%] z-[5] flex -translate-y-1/2 items-center justify-center rounded-full bg-[#ffffff26] p-[10px] text-white shadow-md hover:opacity-90 group-hover:visible'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-9 w-9'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </button>
    </Swiper>
  )
}

export default Slider
