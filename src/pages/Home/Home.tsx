import classNames from 'classnames'
import moment from 'moment'
import 'moment/dist/locale/vi'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from '~/../node_modules/swiper'
import Ads from '~/components/Ads'
import Artist from '~/components/Artist'
import BoxItem from '~/components/BoxItem'
import CardItem from '~/components/CardItem'
import Slider from '~/components/Slider'
import ZingChart from '~/components/ZingChart'
import PATH from '~/constants/path'
import useHome from '~/hooks/useHome'

export default function Home() {
  const {
    dataBanner,
    dataNewRelease,
    dataChill,
    dataEnergy,
    dataRemix,
    dataStatus,
    dataArtists,
    dataTop100,
    dataAlbumHot,
    dataNewReleaseChart,
    dataZingChart,
    dataWeekChartBanner
  } = useHome()

  const navigate = useNavigate()
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const dataAll = useMemo(() => dataNewRelease?.items?.all, [dataNewRelease])
  const dataOthers = useMemo(() => dataNewRelease?.items?.others, [dataNewRelease])
  const dataVpop = useMemo(() => dataNewRelease?.items?.vPop, [dataNewRelease])
  const [genre, setGenre] = useState(dataAll)
  const isLoop = useMemo(
    () => dataNewReleaseChart?.items?.find((item) => item.encodeId === 'ABCDE1'),
    [dataNewReleaseChart]
  )

  useEffect(() => {
    setGenre(dataAll)
  }, [dataAll])

  useEffect(() => {
    if (!isLoop) {
      ;(dataNewReleaseChart?.items as Array<{ encodeId: string }>)?.push({ encodeId: 'ABCDE1' })
    }
  }, [dataNewReleaseChart?.items, isLoop])

  const handleChangeGenreAll = () => {
    setGenre(dataAll)
  }
  const handleChangeGenreOthers = () => {
    setGenre(dataOthers)
  }
  const handleChangeGenreVpop = () => {
    setGenre(dataVpop)
  }

  return (
    <main className='mx-[-2px] px-[59px] pt-[32px]'>
      {dataBanner && <Slider dataBanner={dataBanner} />}
      {dataNewRelease && (
        <div className='text-white mt-12'>
          <h3 className='mb-5 text-xl font-bold capitalize'>{dataNewRelease?.title}</h3>
          <div className='flex items-center mb-4 gap-[15px] text-white text-xs font-normal'>
            <button
              onClick={handleChangeGenreAll}
              className={classNames(
                'hover:opacity-90 uppercase flex items-center justify-center rounded-full px-[26px] py-[5px]',
                {
                  'bg-[#9b4de0]': genre === dataAll,
                  'border border-[#ffffff1a]': genre !== dataAll
                }
              )}
            >
              tất cả
            </button>
            <button
              onClick={handleChangeGenreVpop}
              className={classNames(
                'hover:opacity-90 uppercase flex items-center justify-center rounded-full px-[26px] py-[5px]',
                {
                  'bg-[#9b4de0]': genre === dataVpop,
                  'border border-[#ffffff1a]': genre !== dataVpop
                }
              )}
            >
              VIỆT NAM
            </button>
            <button
              onClick={handleChangeGenreOthers}
              className={classNames(
                'hover:opacity-90 uppercase flex items-center justify-center rounded-full px-[26px] py-[5px]',
                {
                  'bg-[#9b4de0]': genre === dataOthers,
                  'border border-[#ffffff1a]': genre !== dataOthers
                }
              )}
            >
              QUỐC TẾ
            </button>
            <Link
              to='/'
              className='text-[#ffffff80] ml-auto flex items-center gap-[6px] hover:text-[#c273ed] font-medium uppercase'
            >
              TẤT CẢ
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          </div>
          <div className='grid grid-cols-3 gap-x-7'>
            {genre &&
              (genre.length > 12 ? genre.slice(0, 12) : genre).map((item) => (
                <CardItem
                  key={item.encodeId}
                  className='col-span-1 h-20 hover:bg-[#2f2739] group rounded-lg p-[10px] flex gap-[10px] items-center'
                  dataItem={item}
                  isDate={true}
                />
              ))}
          </div>
        </div>
      )}
      {dataChill && (
        <div className='mt-12'>
          <TitleListBox titleList={dataChill?.title} link={dataChill.link} />
          <div className='flex items-center gap-7'>
            {dataChill?.items?.slice(0, 5).map((item) => (
              <BoxItem
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.sortDescription}
                link={item.link}
              />
            ))}
          </div>
        </div>
      )}
      {dataEnergy && (
        <div className='mt-12'>
          <TitleListBox titleList={dataEnergy?.title} hideLink={true} />
          <div className='flex items-center gap-7'>
            {dataEnergy?.items?.slice(0, 5).map((item) => (
              <BoxItem
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.sortDescription}
                link={item.link}
              />
            ))}
          </div>
        </div>
      )}
      {dataRemix && (
        <div className='mt-12'>
          <TitleListBox titleList={dataRemix?.title} hideLink={true} />
          <div className='flex gap-7'>
            {dataRemix?.items?.slice(0, 5).map((item) => (
              <div className='flex-shrink-0 flex-1' key={item.encodeId}>
                <BoxItem srcImg={item.thumbnailM} altImg={item.title} link={item.link} />
                <Artist
                  artistsData={item.artists}
                  className='text-[#ffffff80] text-sm font-normal overflow-hidden block line-clamp-1 break-words mt-3'
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {dataStatus && (
        <div className='mt-12'>
          <TitleListBox titleList={dataStatus?.title} hideLink={true} />
          <div className='flex gap-7'>
            {dataStatus?.items?.slice(0, 5).map((item) => (
              <div className='flex-shrink-0 flex-1' key={item.encodeId}>
                <BoxItem
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.sortDescription}
                  link={item.link}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {dataArtists && (
        <div className='mt-12'>
          <TitleListBox titleList={dataArtists?.title} hideLink={true} />
          <div className='flex items-center gap-7'>
            {dataArtists?.items?.slice(0, 5).map((item) => (
              <BoxItem
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.sortDescription}
                link={item.link}
              />
            ))}
          </div>
        </div>
      )}
      {dataNewReleaseChart && (
        <div className='mt-12'>
          <TitleListBox titleList={dataNewReleaseChart?.title} link={PATH.newReleased} />
          <div className='relative'>
            <Swiper
              className='grid grid-cols-3'
              modules={[Autoplay, Navigation]}
              slidesPerView={3}
              allowTouchMove={false}
              spaceBetween={28}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
                disabledClass: 'disabled:opacity-10'
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  slidesPerGroup: 3
                }
              }}
            >
              {dataNewReleaseChart.items?.map((item, index, arr) => {
                return (
                  <SwiperSlide key={item.encodeId}>
                    {arr.length - 1 === index ? (
                      <Link
                        to={PATH.newReleased}
                        className='col-span-1 bg-[#ffffff1a] cursor-pointer rounded h-full w-full flex justify-center items-center text-[#9b4de0] font-bold uppercase'
                      >
                        Xem tất cả
                      </Link>
                    ) : (
                      <div
                        aria-hidden
                        onClick={() => navigate(PATH.newReleased)}
                        className='col-span-1 bg-[#ffffff1a] group cursor-pointer rounded p-[15px] flex gap-[10px]'
                      >
                        <div className='w-[120px]'>
                          <BoxItem
                            srcImg={item.thumbnailM}
                            altImg={item.title}
                            hideLike={true}
                            hideOption={true}
                            isLink={false}
                          />
                        </div>
                        <div className='flex-1 flex flex-col justify-between'>
                          <div>
                            <div className='text-white text-sm font-medium mb-[3px]'>{item.title}</div>
                            <Artist artistsData={item.artists} />
                          </div>
                          <div className='flex items-end justify-between'>
                            <div className='opacity-40 text-stroke text-[40px] font-black leading-none'>
                              #{index + 1}
                            </div>
                            <div className='text-[#ffffff80] text-sm font-normal'>
                              {moment.unix(item.releaseDate as number).format('DD.MM.YYYY')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <button
              ref={prevRef}
              className='hover:opacity-90 absolute z-[5] top-[50%] -translate-y-1/2 left-[-19px] text-[#32323d] flex items-center justify-center rounded-full bg-white shadow-md p-[7px]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={0.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button
              ref={nextRef}
              className='hover:opacity-90 absolute z-[5] top-[50%] -translate-y-1/2 right-[-19px] text-[#32323d] flex items-center justify-center rounded-full bg-white shadow-md p-[7px]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={0.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      )}
      <ZingChart dataChart={dataZingChart} />
      {dataWeekChartBanner && (
        <div className='mt-7 flex items-center gap-7'>
          {dataWeekChartBanner.map((item: any, index: number) => (
            <Link to={'/'} key={index} className='overflow-hidden rounded-md'>
              <img
                className='h-[112px] hover:scale-110 duration-[0.7s]'
                src={item.cover}
                alt={`Bài hát ${item.country}`}
              />
            </Link>
          ))}
        </div>
      )}
      {dataTop100 && (
        <div className='mt-12'>
          <TitleListBox titleList={dataTop100?.title} />
          <div className='flex gap-7'>
            {dataTop100.items?.slice(0, 5).map((item) => (
              <div className='flex-shrink-0 flex-1' key={item.encodeId}>
                <BoxItem
                  classNameDesc='line-clamp-1 mt-3 mb-[2px] text-white text-sm font-bold whitespace-normal'
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.title}
                  isLinkDesc={true}
                  link={item.link}
                />
                <Artist
                  artistsData={item.artists}
                  className='text-[#ffffff80] text-sm font-normal overflow-hidden block line-clamp-1 break-words'
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {dataAlbumHot && (
        <div className='mt-12'>
          <TitleListBox titleList={dataAlbumHot?.title} hideLink={true} />
          <Swiper
            className='flex gap-7'
            modules={[Autoplay]}
            slidesPerView={5}
            allowTouchMove={false}
            spaceBetween={28}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              769: {
                slidesPerView: 5,
                slidesPerGroup: 5
              }
            }}
          >
            {dataAlbumHot?.items?.map((item) => (
              <SwiperSlide key={item.encodeId}>
                <BoxItem
                  classNameDesc='line-clamp-1 mt-3 mb-[2px] text-white text-sm font-bold whitespace-normal'
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.title}
                  isLinkDesc={true}
                  link={item.link}
                />
                <Artist
                  artistsData={item.artists}
                  className='text-[#ffffff80] text-sm font-normal overflow-hidden block line-clamp-1 break-words'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <Ads className='mt-12 mb-[30px]' />
    </main>
  )
}

export const TitleListBox = ({
  titleList = 'Title',
  hideLink = false,
  link = '/'
}: {
  titleList?: string
  hideLink?: boolean
  link?: string
}) => (
  <div className='flex items-center justify-between mb-5'>
    <h3 className='text-xl font-bold capitalize text-white'>{titleList}</h3>
    {!hideLink && (
      <Link
        to={link.replace('.html', '')}
        className='text-[#ffffff80] text-xs ml-auto flex items-center gap-[6px] hover:text-[#c273ed] font-medium uppercase'
      >
        TẤT CẢ
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </Link>
    )}
  </div>
)
