import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import { Link, useNavigate } from 'react-router-dom'
import { ItemBanner } from '~/types/home'
import PATH from '~/constants/path'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
interface Props {
  dataBanner?: Array<ItemBanner>
}

const Slider = ({ dataBanner }: Props) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [isSongOpen, setIsSongOpen] = useState(false)
  const [isSongId, setIsSongId] = useState<string>('')
  const navigate = useNavigate()

  const handleNavigate = (link: string, id: string) => {
    if (link.includes(`${PATH.baiHat}`)) {
      setIsSongOpen(true)
      setIsSongId(id)
    } else navigate(link)
  }

  const { data } = useQuery({
    queryKey: ['infoSong', isSongId],
    queryFn: () => zingmp3Api.getSongInfo({ id: isSongId }),
    staleTime: 3 * 60 * 1000,
    enabled: isSongId !== ''
  })
  const dataInfoSong = data?.data.data

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
        <SwiperSlide key={item.encodeId} className='cursor-pointer overflow-hidden rounded-lg duration-500 ease-in-out'>
          <figure aria-hidden onClick={() => handleNavigate(`${item.link.replace('.html', '')}`, item.encodeId)}>
            <img alt={item.title} src={item.banner} className='h-full w-full object-cover' />
          </figure>
        </SwiperSlide>
      ))}
      {isSongOpen && dataInfoSong && (
        <div
          className='fixed inset-0 z-50 flex cursor-default items-center justify-center bg-[#000000cc]'
          aria-hidden
          onClick={() => setIsSongOpen((prev) => !prev)}
        >
          <div className='w-[330px] rounded-lg bg-[#34224f] p-5' aria-hidden onClick={(e) => e.stopPropagation()}>
            <div className='relative flex flex-col items-center justify-center'>
              <h3 className='mb-5 text-center text-[14px] font-bold text-white'>
                Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế.
              </h3>
              <figure className='h-[180px] w-[180px] cursor-pointer overflow-hidden rounded-[5px]'>
                <img
                  alt={dataInfoSong.title}
                  src={dataInfoSong.thumbnailM}
                  className='h-full w-full object-cover transition-all duration-500 hover:scale-110'
                />
              </figure>
              <h3 className='mt-1 text-[14px] font-medium text-white'>{dataInfoSong?.title}</h3>
              <span className='text-[12px] text-[#ffffffa1]'>{dataInfoSong.artists[0].name}</span>
              <div className='mt-[30px] flex w-full flex-col gap-[10px]'>
                <button className='flex items-center justify-center gap-2 rounded-full bg-[#9b4de0] px-6 py-[9px] text-[14px] uppercase text-white hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    viewBox='0 0 24 24'
                    strokeWidth={1}
                    stroke='white'
                    className='h-5 w-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                    />
                  </svg>
                  phát bài hát
                </button>
                <button className='rounded-full bg-[#ffffff26] px-6 py-[9px] text-[14px] uppercase text-white hover:opacity-90'>
                  thêm vào danh sách phát
                </button>
                <button className='rounded-full px-6 py-[9px] text-[14px] uppercase text-white hover:opacity-90'>
                  bỏ qua
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
