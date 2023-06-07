import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import Slider from '~/components/Slider'
import { useState, useEffect, useMemo, Fragment } from 'react'
import { DataBanner, DataPlaylist, DataNewRelease, artists } from '~/types/home'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import moment from 'moment'
import 'moment/dist/locale/vi'
import BoxItem from '~/components/BoxItem'

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

  console.log(dataHome?.data.data.items)

  const dataAll = useMemo(() => (dataNewRelease as DataNewRelease)?.items?.all, [dataNewRelease])
  const dataOthers = useMemo(() => (dataNewRelease as DataNewRelease)?.items?.others, [dataNewRelease])
  const dataVpop = useMemo(() => (dataNewRelease as DataNewRelease)?.items?.vPop, [dataNewRelease])
  const [genre, setGenre] = useState(dataAll)

  useEffect(() => {
    setGenre(dataAll)
  }, [dataAll])

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
    <main className='pt-8'>
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
                    <figure className='relative cursor-pointer w-[60px] h-[60px] object-cover rounded overflow-hidden'>
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
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold capitalize text-white'>{dataChill?.title}</h3>
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
          </div>
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
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold capitalize text-white'>{dataEnergy?.title}</h3>
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
          </div>
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
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold capitalize text-white'>{dataArtists?.title}</h3>
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
          </div>
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
      {(dataTop100 as DataPlaylist) && (
        <div className='mt-12'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold capitalize text-white'>{dataTop100?.title}</h3>
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
          </div>
          <div className='flex items-center gap-7'>
            {(dataTop100 as DataPlaylist).items?.slice(0, 5).map((item) => (
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
      {(dataAlbumHot as DataPlaylist) && (
        <div className='mt-12'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold capitalize text-white'>{dataAlbumHot?.title}</h3>
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
          </div>
          <div className='flex items-center gap-7'>
            {(dataAlbumHot as DataPlaylist).items?.slice(0, 5).map((item) => (
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
    </main>
  )
}
