import classNames from 'classnames'
import moment from 'moment'
import 'moment/dist/locale/vi'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'swiper/css'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Artist from '~/components/Artist'
import BoxItem from '~/components/BoxItem'
import CardItem from '~/components/CardItem'
import Footer from '~/components/Footer'
import Slider from '~/components/Slider'
import ZingChart from '~/components/ZingChart'
import PATH from '~/constants/path'
import useHome from '~/hooks/useHome'
import usePlayMusic from '~/hooks/usePlayMusic'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const {
    dataBanner,
    dataNewRelease,
    dataHot,
    dataChill,
    dataEnergy,
    dataRemix,
    dataStatus,
    dataArtists,
    dataTop100,
    dataAlbumHot,
    dataNewReleaseChart,
    dataZingChart,
    dataWeekChartBanner,
    isLoading
  } = useHome()

  const navigate = useNavigate()
  const dataAll = useMemo(() => dataNewRelease?.items?.all, [dataNewRelease])
  const dataOthers = useMemo(() => dataNewRelease?.items?.others, [dataNewRelease])
  const dataVpop = useMemo(() => dataNewRelease?.items?.vPop, [dataNewRelease])
  const [genre, setGenre] = useState(dataAll)
  const isLoop = useMemo(
    () => dataNewReleaseChart?.items?.find((item) => item.encodeId === 'ABCDE1'),
    [dataNewReleaseChart]
  )
  const { handleHookPlayMusic } = usePlayMusic()

  useEffect(() => {
    setGenre(dataAll)
  }, [dataAll])

  useEffect(() => {
    if (!isLoop) (dataNewReleaseChart?.items as Array<{ encodeId: string }>)?.push({ encodeId: 'ABCDE1' })
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
    <main className='mx-[-2px] pt-[32px]'>
      {dataBanner && !isLoading ? (
        <Slider dataBanner={dataBanner} />
      ) : (
        <div className='grid w-full grid-cols-3 gap-5'>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height={200} width={'full'} />
            ))}
        </div>
      )}
      {
        <div className='mt-12 text-white'>
          <h3 className='mb-5 text-[20px] font-bold capitalize'>{dataNewRelease?.title}</h3>
          {genre && (
            <div className='mb-4 flex items-center gap-[15px] text-[12px] font-normal text-white'>
              <button
                onClick={handleChangeGenreAll}
                className={classNames(
                  'flex items-center justify-center rounded-full px-[26px] py-[5px] uppercase hover:opacity-90',
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
                  'flex items-center justify-center rounded-full px-[26px] py-[5px] uppercase hover:opacity-90',
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
                  'flex items-center justify-center rounded-full px-[26px] py-[5px] uppercase hover:opacity-90',
                  {
                    'bg-[#9b4de0]': genre === dataOthers,
                    'border border-[#ffffff1a]': genre !== dataOthers
                  }
                )}
              >
                QUỐC TẾ
              </button>
            </div>
          )}
          <div className='grid grid-cols-3 gap-x-7'>
            {genre &&
              !isLoading &&
              (genre.length > 12 ? genre.slice(0, 12) : genre).map((item) => (
                <div
                  aria-hidden
                  key={item.encodeId}
                  onDoubleClick={() => {
                    handleHookPlayMusic({
                      songId: item.encodeId,
                      data: genre,
                      dataItem: item,
                      playlistId: item.encodeId
                    })
                  }}
                >
                  <CardItem
                    className='group col-span-1 flex h-20 items-center gap-[10px] rounded p-[10px] hover:bg-[#2f2739]'
                    dataItem={item}
                    isDate={true}
                    hideAlbum
                    hideTime={true}
                    dataPlaylist={genre}
                    playlistId={''}
                  />
                </div>
              ))}
            {isLoading &&
              !genre &&
              Array(12)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='col-span-1 flex h-20 items-center gap-[10px] rounded p-[10px]'>
                    <div className='flex w-full'>
                      <Skeleton width={60} height={60} />
                      <div className='flex w-full flex-col pl-3'>
                        <Skeleton height={10} width={'60%'} />
                        <Skeleton height={10} width={'40%'} />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      }
      {dataHot && !isLoading ? (
        <div className='mt-12'>
          <TitleListBox titleList={dataHot?.title} hideLink={true} />
          <div className='flex items-start gap-7'>
            {dataHot?.items
              ?.slice(0, 5)
              .map((item) => (
                <BoxItem
                  key={item.encodeId}
                  id={item.encodeId}
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.sortDescription}
                  link={item.link}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className='mt-12 grid w-full grid-cols-5 gap-7'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton height={200} width={'full'} />
                <Skeleton height={10} width={'80%'} style={{ marginTop: 14 }} />
                <Skeleton height={10} width={'60%'} />
              </div>
            ))}
        </div>
      )}
      {dataChill && !isLoading ? (
        <div className='mt-12'>
          <TitleListBox titleList={dataChill?.title} hideLink={true} />
          <div className='flex items-start gap-7'>
            {dataChill?.items
              ?.slice(0, 5)
              .map((item) => (
                <BoxItem
                  key={item.encodeId}
                  id={item.encodeId}
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.sortDescription}
                  link={item.link}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className='mt-12 grid w-full grid-cols-5 gap-7'>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <Skeleton height={200} width={'full'} />
                <Skeleton height={10} width={'80%'} style={{ marginTop: 14 }} />
                <Skeleton height={10} width={'60%'} />
              </div>
            ))}
        </div>
      )}
      {dataEnergy && (
        <div className='mt-12'>
          <TitleListBox titleList={dataEnergy?.title} hideLink={true} />
          <div className='flex items-start gap-7'>
            {dataEnergy?.items
              ?.slice(0, 5)
              .map((item) => (
                <BoxItem
                  id={item.encodeId}
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
          <div className='flex items-start gap-7'>
            {dataRemix?.items?.slice(0, 5).map((item) => (
              <div className='flex-1 flex-shrink-0' key={item.encodeId}>
                <BoxItem id={item.encodeId} srcImg={item.thumbnailM} altImg={item.title} link={item.link} />
                <Artist
                  artistsData={item.artists}
                  className='mt-3 line-clamp-1 block overflow-hidden break-words text-[14px] font-normal text-[#ffffff80]'
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {dataStatus && (
        <div className='mt-12'>
          <TitleListBox titleList={dataStatus?.title} hideLink={true} />
          <div className='flex items-start gap-7'>
            {dataStatus?.items?.slice(0, 5).map((item) => (
              <div className='flex-1 flex-shrink-0' key={item.encodeId}>
                <BoxItem
                  id={item.encodeId}
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
          <div className='flex items-start gap-7'>
            {dataArtists?.items
              ?.slice(0, 5)
              .map((item) => (
                <BoxItem
                  id={item.encodeId}
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
          <div className='relative h-[150px]'>
            <Swiper
              className='grid h-full grid-cols-3'
              modules={[Autoplay, Navigation]}
              slidesPerView={3}
              allowTouchMove={false}
              spaceBetween={28}
              navigation={{
                prevEl: '.button-prev-navigate',
                nextEl: '.button-next-navigate',
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
              {dataNewReleaseChart.items?.slice(0, 8).map((item, index) => (
                <SwiperSlide key={item.encodeId}>
                  <div
                    aria-hidden
                    onClick={() => navigate(PATH.newReleased)}
                    className='group col-span-1 flex cursor-pointer gap-[10px] rounded bg-[#ffffff1a] p-[15px]'
                  >
                    <div className='w-[120px]'>
                      <BoxItem
                        id={item.encodeId}
                        srcImg={item.thumbnailM}
                        altImg={item.title}
                        hideLike={true}
                        hideOption={true}
                        isLink={false}
                      />
                    </div>
                    <div className='flex flex-1 flex-col justify-between'>
                      <div>
                        <div className='mb-[3px] line-clamp-2 text-[14px] font-medium text-white'>{item.title}</div>
                        <Artist artistsData={item.artists} />
                      </div>
                      <div className='flex items-end justify-between'>
                        <div className='text-stroke text-[40px] font-black leading-none opacity-40'>#{index + 1}</div>
                        <div className='text-[14px] font-normal text-[#ffffff80]'>
                          {moment.unix(item.releaseDate as number).format('DD.MM.YYYY')}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <Link
                  to={PATH.newReleased}
                  className='col-span-1 flex h-full w-full cursor-pointer items-center justify-center rounded bg-[#ffffff1a] font-bold uppercase text-[#9b4de0]'
                >
                  Xem tất cả
                </Link>
              </SwiperSlide>
            </Swiper>
            <button className='button-prev-navigate absolute left-[-19px] top-[50%] z-[5] flex -translate-y-1/2 items-center justify-center rounded-full bg-white p-[7px] text-[#32323d] shadow-md hover:opacity-90'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={0.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='button-next-navigate absolute right-[-19px] top-[50%] z-[5] flex -translate-y-1/2 items-center justify-center rounded-full bg-white p-[7px] text-[#32323d] shadow-md hover:opacity-90'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={0.5}
                stroke='currentColor'
                className='h-6 w-6'
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
            <Link
              to={`${PATH.zingWeek}/${item.country === 'korea' ? 'kr' : item.country}`}
              key={index}
              className='w-full flex-1 overflow-hidden rounded-md'
            >
              <img
                className='h-[112px] w-full duration-[0.7s] hover:scale-110'
                src={item.cover}
                alt={`Bài hát ${item.country}`}
              />
            </Link>
          ))}
        </div>
      )}
      {dataTop100 && (
        <div className='mt-12'>
          <TitleListBox titleList={dataTop100?.title} link={PATH.top100} />
          <div className='flex items-start gap-7'>
            {dataTop100.items?.slice(0, 5).map((item) => (
              <div className='flex-1 flex-shrink-0' key={item.encodeId}>
                <BoxItem
                  id={item.encodeId}
                  classNameDesc='line-clamp-1 mt-3 mb-[2px] text-white text-[14px] font-bold whitespace-normal'
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.title}
                  isLinkDesc={true}
                  link={item.link}
                />
                <Artist
                  artistsData={item.artists}
                  className='line-clamp-1 block overflow-hidden break-words text-[14px] font-normal text-[#ffffff80]'
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
            className='flex items-start gap-7'
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
                  id={item.encodeId}
                  classNameDesc='line-clamp-1 mt-3 mb-[2px] text-white text-[14px] font-bold whitespace-normal'
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.title}
                  isLinkDesc={true}
                  link={item.link}
                />
                <Artist
                  artistsData={item.artists}
                  className='line-clamp-1 block overflow-hidden break-words text-[14px] font-normal text-[#ffffff80]'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className='mx-[-59px]'>
        <Footer />
      </div>
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
  <div className='mb-5 flex items-center justify-between'>
    <h3 className='text-[20px] font-bold capitalize text-white'>{titleList}</h3>
    {!hideLink && (
      <Link
        to={link.replace('.html', '')}
        className='ml-auto flex items-center gap-[6px] text-[12px] font-medium uppercase text-[#ffffff80] hover:text-[#c273ed]'
      >
        TẤT CẢ
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </Link>
    )}
  </div>
)
