import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import Slider from '~/components/Slider'
import { useState, useEffect, useMemo, Fragment, useRef } from 'react'
import { DataBanner, DataPlaylist, DataNewRelease, artists } from '~/types/home'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'moment'
import 'moment/dist/locale/vi'
import BoxItem from '~/components/BoxItem'
import Ads from '~/components/Ads'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from '~/../node_modules/swiper'
import 'swiper/css'

export default function Home() {
  const { data: dataHome } = useQuery({
    queryKey: ['home'],
    queryFn: zingmp3Api.getHome
  })

  const dataBanner: DataBanner = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hSlider')?.items,
    [dataHome?.data.data.items]
  )
  const dataNewRelease = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionType === 'new-release'),
    [dataHome?.data.data.items]
  )
  const dataChill = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme'),
    [dataHome?.data.data.items]
  )
  const dataEnergy = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme2'),
    [dataHome?.data.data.items]
  )
  const dataArtists = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hArtistTheme'),
    [dataHome?.data.data.items]
  )
  const dataTop100 = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'h100'),
    [dataHome?.data.data.items]
  )
  const dataAlbumHot = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hAlbum'),
    [dataHome?.data.data.items]
  )
  const dataNewReleaseChart = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hNewrelease'),
    [dataHome?.data.data.items]
  )
  const dataZingChart = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hZC'),
    [dataHome?.data.data.items]
  )
  const dataWeekChartBanner = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionType === 'weekChart')?.items,
    [dataHome?.data.data.items]
  )

  console.log(dataNewReleaseChart)

  const dataAll = useMemo(() => (dataNewRelease as DataNewRelease)?.items?.all, [dataNewRelease])
  const dataOthers = useMemo(() => (dataNewRelease as DataNewRelease)?.items?.others, [dataNewRelease])
  const dataVpop = useMemo(() => (dataNewRelease as DataNewRelease)?.items?.vPop, [dataNewRelease])
  const [genre, setGenre] = useState(dataAll)

  useEffect(() => {
    setGenre(dataAll)
  }, [dataAll])

  useEffect(() => {
    dataNewReleaseChart?.items.push({ encodeId: 'ABCDE1' })
  }, [dataNewReleaseChart?.items])

  const handleChangeGenreAll = () => {
    setGenre(dataAll)
  }
  const handleChangeGenreOthers = () => {
    setGenre(dataOthers)
  }
  const handleChangeGenreVpop = () => {
    setGenre(dataVpop)
  }

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <main className='mx-[-2px] px-[59px] pt-[32px]'>
      <Slider dataBanner={dataBanner} />
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
                <div key={item.encodeId} className='col-span-1 h-20 hover:bg-[#2f2739] group rounded-lg p-[10px]'>
                  <div className='flex gap-[10px] items-center'>
                    <figure className='relative cursor-pointer w-[60px] h-[60px] object-cover rounded overflow-hidden flex-shrink-0'>
                      <img className='absolute inset-0 flex-shrink-0' src={item.thumbnail} alt={item.title} />
                      <div className='bg-[#00000080] absolute invisible group-hover:visible inset-0 w-full h-full'></div>
                      <div className='flex items-center justify-center absolute inset-0'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill={'white'}
                          viewBox='0 0 24 24'
                          strokeWidth={1}
                          stroke={'white'}
                          className='w-6 h-6 invisible group-hover:visible hover:opacity-90'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                          />
                        </svg>
                      </div>
                    </figure>
                    <div className='flex flex-col break-words gap-[3px] font-medium'>
                      <span className='text-white text-sm line-clamp-1 cursor-default'>{item.title}</span>
                      <h3 className='text-[#ffffff80] text-xs overflow-hidden whitespace-nowrap text-ellipsis block'>
                        {item.artists.length > 1 ? (
                          item.artists.map((artist: artists, index: number) => (
                            <Fragment key={artist.id}>
                              {index !== 0 && ', '}
                              <Link
                                to='/'
                                className={classNames('inline-block', {
                                  'hover:text-[#c273ed] hover:underline': index !== 4,
                                  'cursor-default pointer-events-none': index === 4
                                })}
                              >
                                {Number(index) === 4 ? '...' : artist.name}
                              </Link>
                            </Fragment>
                          ))
                        ) : (
                          <Link
                            className='text-[#ffffff80] inline-block text-xs hover:text-[#c273ed] hover:underline'
                            to='/'
                          >
                            {item.artistsNames}
                          </Link>
                        )}
                      </h3>
                      <span className='text-[#ffffff80] line-clamp-1 text-xs cursor-default'>
                        {moment(item.releaseDate * 1000).fromNow()}
                      </span>
                    </div>
                    <button className='rounded-full ml-auto invisible flex items-center justify-center w-[38px] h-[38px] group-hover:visible hover:bg-[#413a4a]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke={'white'}
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {(dataChill as DataPlaylist) && (
        <div className='mt-12'>
          <TitleListBox titleList={dataChill?.title} />
          <div className='flex items-center gap-7'>
            {(dataChill as DataPlaylist).items?.slice(0, 5).map((item) => (
              <BoxItem
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.sortDescription}
              />
            ))}
          </div>
        </div>
      )}
      {(dataEnergy as DataPlaylist) && (
        <div className='mt-12'>
          <TitleListBox titleList={dataEnergy?.title} />
          <div className='flex items-center gap-7'>
            {(dataEnergy as DataPlaylist).items?.slice(0, 5).map((item) => (
              <BoxItem
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.sortDescription}
              />
            ))}
          </div>
        </div>
      )}
      {(dataArtists as DataPlaylist) && (
        <div className='mt-12'>
          <TitleListBox titleList={dataArtists?.title} />
          <div className='flex items-center gap-7'>
            {(dataArtists as DataPlaylist).items?.slice(0, 5).map((item) => (
              <BoxItem
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.sortDescription}
              />
            ))}
          </div>
        </div>
      )}
      {(dataNewReleaseChart as DataPlaylist) && (
        <div className='mt-12'>
          <TitleListBox titleList={dataNewReleaseChart?.title} />
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
                769: {
                  slidesPerView: 3,
                  slidesPerGroup: 3
                }
              }}
            >
              {(dataNewReleaseChart as DataPlaylist).items?.map((item, index, arr) => {
                return (
                  <SwiperSlide key={item.encodeId}>
                    {arr.length - 1 === index ? (
                      <Link
                        to={'/'}
                        className='col-span-1 bg-[#ffffff1a] cursor-pointer rounded h-full w-full flex justify-center items-center text-[#9b4de0] font-bold uppercase'
                      >
                        Xem tất cả
                      </Link>
                    ) : (
                      <div className='col-span-1 bg-[#ffffff1a] group cursor-pointer rounded p-[15px] flex gap-[10px]'>
                        <div className='w-[120px]'>
                          <BoxItem srcImg={item.thumbnailM} altImg={item.title} hideLike={true} hideOption={true} />
                        </div>
                        <div className='flex-1 flex flex-col justify-between'>
                          <div>
                            <div className='text-white text-sm font-medium'>{item.title}</div>
                            <h3 className='text-[#ffffff80] mt-[3px] text-xs overflow-hidden whitespace-nowrap text-ellipsis block'>
                              {item.artists && item.artists.length > 1 ? (
                                item.artists.map((artist: artists, index: number) => (
                                  <Fragment key={artist.id}>
                                    {index !== 0 && ', '}
                                    <Link className='inline-block hover:text-[#c273ed] hover:underline' to='/'>
                                      {artist.name}
                                    </Link>
                                  </Fragment>
                                ))
                              ) : (
                                <Link
                                  className='text-[#ffffff80] inline-block text-xs hover:text-[#c273ed] hover:underline'
                                  to='/'
                                >
                                  {item.artistsNames}
                                </Link>
                              )}
                            </h3>
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
      <div className='relative mt-12 p-5 rounded-lg overflow-hidden h-[374px]'>
        <div className='absolute inset-0 bg-[#2b273f]'></div>
        <div className='absolute inset-0 bg-[#33104cf2]'>
          <div className='bg-alpha-top'></div>
          <div className='bg-alpha-bottom'></div>
        </div>
        <div className='relative flex items-center gap-[10px] mb-5'>
          <Link to={'/'} className='text-rbg text-[28px] font-bold'>
            #zingchart
          </Link>
          <button className='flex items-center justify-center hover:opacity-90'>
            <svg width={28} height={28} viewBox='0 0 44 44' fill='none'>
              <g filter='url(#filter0_d_3141_46346)'>
                <circle cx={22} cy={21} r={18} fill='#FEFFFF' />
              </g>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z'
                fill='#141414'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='mt-7 flex items-center gap-7'>
        {dataWeekChartBanner &&
          dataWeekChartBanner.map((item: any, index: number) => (
            <Link to={'/'} key={index} className='overflow-hidden rounded-md'>
              <img
                className='h-[112px] hover:scale-110 duration-[0.7s]'
                src={item.cover}
                alt={`Bài hát ${item.country}`}
              />
            </Link>
          ))}
      </div>
      {(dataTop100 as DataPlaylist) && (
        <div className='mt-12'>
          <TitleListBox titleList={dataTop100?.title} />
          <div className='flex gap-7'>
            {(dataTop100 as DataPlaylist).items?.slice(0, 5).map((item) => (
              <BoxItem
                classNameDesc='line-clamp-1 mt-3 text-white text-sm font-bold whitespace-normal'
                key={item.encodeId}
                srcImg={item.thumbnailM}
                altImg={item.title}
                description={item.title}
                artists={item.artists}
                isLink={true}
              />
            ))}
          </div>
        </div>
      )}
      {(dataAlbumHot as DataPlaylist) && (
        <div className='mt-12'>
          <TitleListBox titleList={dataAlbumHot?.title} />
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
            {(dataAlbumHot as DataPlaylist).items?.map((item) => (
              <SwiperSlide key={item.encodeId}>
                <BoxItem
                  classNameDesc='line-clamp-1 mt-3 text-white text-sm font-bold whitespace-normal'
                  srcImg={item.thumbnailM}
                  altImg={item.title}
                  description={item.title}
                  artists={item.artists}
                  isLink={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className='mt-12 mb-[30px]'>
        <Ads />
      </div>
    </main>
  )
}

interface PropsTitle {
  titleList?: string
  hideLink?: boolean
}

export const TitleListBox = ({ titleList = 'Title', hideLink = false }: PropsTitle) => (
  <div className='flex items-center justify-between mb-5'>
    <h3 className='text-xl font-bold capitalize text-white'>{titleList}</h3>
    {!hideLink && (
      <Link
        to='/'
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
