import { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Link, createSearchParams, useParams, useSearchParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import Artist from '~/components/Artist'
import ArtistCard from '~/components/ArtistCard'
import BoxItem from '~/components/BoxItem'
import CardItem from '~/components/CardItem'
import PATH from '~/constants/path'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Type = 'song' | 'artist' | 'artist'
type queryConfig = {
  q: string
  type?: Type
  page?: string
}

const Search = () => {
  const { type } = useParams()
  const [searchParams] = useSearchParams()
  const queryConfig = Object.fromEntries([...searchParams]) as queryConfig
  const [isFetchData, setIsFetchData] = useState<boolean>(false)

  const { data } = useQuery({
    queryKey: ['search', queryConfig],
    queryFn: () => zingmp3Api.search({ q: queryConfig.q }),
    staleTime: 3 * 60 * 1000
  })
  const dataResult = data?.data.data

  const { data: dataType, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', { q: queryConfig.q, type: type as Type }],
    queryFn: ({ pageParam = 1 }) => zingmp3Api.searchType({ q: queryConfig.q, type: type as Type, page: pageParam }),
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length + 1
    },
    staleTime: 3 * 60 * 1000,
    enabled: type !== '' && type !== 'all'
  })

  const scrollableElement = document.getElementsByClassName('main')[0]

  useEffect(() => {
    if (dataType && dataType.pages.map((data) => data.data.data.items).includes(undefined as any)) {
      setIsFetchData(false)
    } else {
      setIsFetchData(true)
    }
  }, [dataType])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight) {
        fetchNextPage()
      }
    }
    isFetchData && scrollableElement && scrollableElement.addEventListener('scroll', handleScroll)
    return () => {
      scrollableElement && scrollableElement.removeEventListener('scroll', handleScroll)
    }
  }, [scrollableElement, fetchNextPage, isFetchData])

  return (
    <main>
      <nav className='flex items-center border-b border-[#ffffff1a]'>
        <h3 className='border-r border-[#ffffff1a] pr-5 text-[24px] font-bold capitalize text-white'>
          Kết quả tìm kiếm
        </h3>
        <ul className='ml-5 flex items-center gap-10 py-[15px] text-[14px] font-medium uppercase'>
          <li>
            <Link
              className={`${
                type === 'all'
                  ? 'border-b-2 border-[#9b4de0] py-[15px] text-white'
                  : 'py-[15px] text-[#dadada] hover:text-white'
              }`}
              to={{
                pathname: `${PATH.search}/all`,
                search: createSearchParams({
                  ...queryConfig
                }).toString()
              }}
            >
              tất cả
            </Link>
          </li>
          <li>
            <Link
              className={`${
                type === 'song'
                  ? 'border-b-2 border-[#9b4de0] py-[15px] text-white'
                  : 'py-[15px] text-[#dadada] hover:text-white'
              }`}
              to={{
                pathname: `${PATH.search}/song`,
                search: createSearchParams({
                  ...queryConfig
                }).toString()
              }}
            >
              bài hát
            </Link>
          </li>
          <li>
            <Link
              className={`${
                type === 'playlist'
                  ? 'border-b-2 border-[#9b4de0] py-[15px] text-white'
                  : 'py-[15px] text-[#dadada] hover:text-white'
              }`}
              to={{
                pathname: `${PATH.search}/playlist`,
                search: createSearchParams({
                  ...queryConfig
                }).toString()
              }}
            >
              playlist/album
            </Link>
          </li>
          <li>
            <Link
              className={`${
                type === 'artist'
                  ? 'border-b-2 border-[#9b4de0] py-[15px] text-white'
                  : 'py-[15px] text-[#dadada] hover:text-white'
              }`}
              to={{
                pathname: `${PATH.search}/artist`,
                search: createSearchParams({
                  ...queryConfig
                }).toString()
              }}
            >
              nghệ sĩ/oa
            </Link>
          </li>
        </ul>
      </nav>
      <div className='mb-10'>
        {dataResult && type === 'all' && (
          <>
            {(dataResult.songs || dataResult.artists || dataResult.playlists) && (
              <div className='mt-7 flex-1'>
                <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>Nổi Bật</h3>
                <div className='grid grid-cols-3 items-center gap-x-7'>
                  {dataResult.songs && dataResult.songs[0] && (
                    <CardItem
                      key={dataResult.songs[0].encodeId}
                      dataItem={dataResult.songs[0]}
                      classNameFigure='mr-1 relative cursor-pointer w-[84px] h-[84px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex flex-1 items-center gap-x-[10px] overflow-hidden rounded bg-[#feffff0d] p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      hideLike={false}
                      hideAlbum={true}
                      hideTime={true}
                      stringType='Bài hát'
                      dataPlaylist={dataResult.songs}
                      playlistId={''}
                    />
                  )}
                  {dataResult.artists && dataResult.artists[0] && (
                    <ArtistCard
                      key={dataResult.artists[0].id}
                      srcImg={dataResult.artists[0].thumbnailM}
                      altImg={dataResult.artists[0].name}
                      description={dataResult.artists[0].name}
                      artistsData={[dataResult.artists[0]]}
                      className='group relative flex flex-1 items-center gap-x-[10px] overflow-hidden rounded bg-[#feffff0d] p-[10px] hover:bg-[#ffffff1a]'
                      classNameFigure='mr-1 relative cursor-pointer w-[84px] h-[84px] object-cover rounded-full overflow-hidden flex-shrink-0'
                      classNameText='none'
                      hideType={false}
                    />
                  )}
                  {dataResult.playlists && dataResult.playlists[0] && (
                    <CardItem
                      key={dataResult.playlists[0].encodeId}
                      dataItem={dataResult.playlists[0]}
                      classNameFigure='mr-1 relative cursor-pointer w-[84px] h-[84px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex flex-1 items-center gap-x-[10px] overflow-hidden rounded bg-[#feffff0d] p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      hideLike={false}
                      hideAlbum={true}
                      hideTime={true}
                      stringType='Playlist'
                      dataPlaylist={dataResult.playlists}
                      playlistId={dataResult.playlists[0].encodeId}
                    />
                  )}
                </div>
              </div>
            )}

            {dataResult.topSuggest && (
              <div className='mt-12'>
                <div className='mb-5 flex items-center gap-[10px]'>
                  <img
                    src={dataResult.top.thumbnailM}
                    alt={dataResult.top.title}
                    className='h-[50px] w-[50px] overflow-hidden rounded-[5px]'
                  />
                  <h3 className='flex flex-col'>
                    <span className='text-[14px] font-bold uppercase text-[#ffffff80]'>Playlist nổi bật</span>
                    <span className='text-[18px] font-bold capitalize text-white'>{dataResult.top.title}</span>
                  </h3>
                </div>
                <div className='grid grid-cols-5 gap-7'>
                  {dataResult.topSuggest.slice(0, 5).map((item) => (
                    <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                      <BoxItem
                        id={item.encodeId}
                        classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                        srcImg={item.thumbnailM}
                        altImg={item.title}
                        description={item.title}
                        link={item.link}
                        isLinkDesc={true}
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

            {dataResult.songs && (
              <div className='mt-12 flex-1'>
                <div className='mb-5 flex items-center justify-between'>
                  <h3 className='text-[20px] font-bold capitalize text-white'>Bài hát</h3>
                  <Link
                    to={{
                      pathname: `${PATH.search}/song`,
                      search: createSearchParams({ ...queryConfig }).toString()
                    }}
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
                </div>
                <div className='grid grid-cols-2 gap-x-7'>
                  {dataResult.songs.slice(0, 6).map((item) => (
                    <CardItem
                      key={item.encodeId}
                      dataItem={item}
                      classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      hideLike={false}
                      hideAlbum={true}
                      dataPlaylist={dataResult.songs.slice(0, 6)}
                      playlistId={''}
                    />
                  ))}
                </div>
              </div>
            )}

            {dataResult.playlists && (
              <div className='mt-12'>
                <div className='mb-5 flex items-center justify-between'>
                  <h3 className='text-[20px] font-bold capitalize text-white'>Playlist/Album</h3>
                  <Link
                    to={{
                      pathname: `${PATH.search}/playlist`,
                      search: createSearchParams({ ...queryConfig }).toString()
                    }}
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
                </div>
                <div className='grid grid-cols-5 gap-7'>
                  {dataResult.playlists.slice(0, 5).map((item) => (
                    <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                      <BoxItem
                        id={item.encodeId}
                        classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                        srcImg={item.thumbnailM}
                        altImg={item.title}
                        description={item.title}
                        link={item.link}
                        isLinkDesc={true}
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

            {dataResult.artists && (
              <div className='mt-12'>
                <div className='mb-5 flex items-center justify-between'>
                  <h3 className='text-[20px] font-bold capitalize text-white'>Nghệ Sĩ/OA</h3>
                  <Link
                    to={{
                      pathname: `${PATH.search}/artist`,
                      search: createSearchParams({ ...queryConfig }).toString()
                    }}
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
                </div>
                <div className='grid grid-cols-5 gap-7'>
                  {dataResult.artists &&
                    dataResult.artists.slice(0, 5).map((item) => (
                      <div key={item.id} className='flex-1 flex-shrink-0'>
                        <ArtistCard
                          key={item.id}
                          srcImg={item.thumbnailM}
                          altImg={item.name}
                          description={item.name}
                          artistsData={[item]}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {!(dataResult.songs || dataResult.artists || dataResult.playlists) && (
              <div className='mt-[30px] flex min-h-[220px] flex-col items-center justify-center gap-5 bg-[#ffffff1a] py-[30px]'>
                <svg xmlns='http://www.w3.org/2000/svg' width={90} height={90} viewBox='0 0 90 90'>
                  <g fill='#B3B3B3'>
                    <path
                      d='M31.818 5.32c-12.09 0-22.67 8.18-25.693 19.854l2.068.555c2.784-10.8 12.489-18.344 23.625-18.344V5.321zM5.33 31.765h2.147c0-1.35.08-2.7.318-4.05l-2.068-.318c-.318 1.43-.397 2.859-.397 4.368zM31.818 25.412c-3.5 0-6.363 2.859-6.363 6.353 0 3.494 2.863 6.353 6.363 6.353 3.5 0 6.364-2.86 6.364-6.353 0-3.494-2.864-6.353-6.364-6.353zm0 10.562c-2.307 0-4.216-1.906-4.216-4.21 0-2.302 1.91-4.208 4.216-4.208 2.307 0 4.216 1.906 4.216 4.209s-1.909 4.209-4.216 4.209z'
                      transform='translate(10 5)'
                    />
                    <path
                      d='M31.818 18.026c-7.636 0-13.761 6.195-13.761 13.739 0 7.544 6.125 13.738 13.761 13.738 7.637 0 13.762-6.115 13.762-13.738 0-7.624-6.125-13.739-13.762-13.739zm0 25.412c-6.443 0-11.693-5.24-11.693-11.673s5.25-11.674 11.693-11.674 11.693 5.241 11.693 11.674c0 6.432-5.25 11.673-11.693 11.673z'
                      transform='translate(10 5)'
                    />
                    <path
                      d='M41.045 62.18v-2.224c-2.943.953-6.045 1.509-9.227 1.509-16.386-.08-29.67-13.341-29.67-29.7 0-16.36 13.284-29.62 29.67-29.62 16.387 0 29.67 13.26 29.67 29.62 0 1.19-.079 2.461-.238 3.653l2.227-.794c.08-.953.16-1.827.16-2.78C63.636 14.214 49.396 0 31.817 0 14.238 0 0 14.215 0 31.765s14.239 31.764 31.818 31.764c3.182 0 6.284-.476 9.227-1.35z'
                      transform='translate(10 5)'
                    />
                    <path
                      d='M37.307 80.365c-1.432 0-2.705-.477-3.58-1.43-1.113-1.111-1.59-2.7-1.352-4.526.239-1.668 1.114-3.335 2.466-4.685 1.352-1.35 3.023-2.224 4.693-2.462.318-.08.636-.08.955-.08.238 0 .477 0 .795.08l2.227.317V47.091c0-1.509.955-2.938 2.387-3.494l18.693-6.909c.398-.159.875-.238 1.273-.238.795 0 1.511.238 2.147.635.955.715 1.591 1.827 1.591 3.018v11.991c0 7.465 0 11.674-.08 12.07-.238 1.668-1.113 3.336-2.465 4.686-1.352 1.35-3.023 2.224-4.693 2.462-.398.159-.716.159-.955.159-1.432 0-2.704-.477-3.58-1.43-1.113-1.112-1.59-2.7-1.352-4.526.239-1.668 1.114-3.336 2.466-4.686s3.023-2.223 4.693-2.461c.319-.08.637-.08.955-.08.239 0 .477 0 .795.08l2.228.317V45.98L45.5 54.16v18.185c0 .238 0 .556-.08.794-.238 1.668-1.113 3.336-2.465 4.686-1.353 1.35-3.023 2.223-4.694 2.461-.318.08-.636.08-.954.08zm3.182-11.197c-.239 0-.398 0-.637.08-1.272.158-2.545.873-3.58 1.905-1.033 1.032-1.75 2.303-1.908 3.573-.239 1.51.318 2.383.795 2.86.398.396 1.034.793 2.148.793.238 0 .398 0 .636-.079 1.273-.159 2.546-.874 3.58-1.906 1.034-1.032 1.75-2.303 1.909-3.573 0-.239.08-.397.08-.636 0-1.19-.478-1.826-.796-2.223-.398-.238-1.114-.794-2.227-.794zm24.022-8.815c-.238 0-.397 0-.636.08-1.273.158-2.545.873-3.58 1.905-1.034 1.033-1.75 2.303-1.909 3.574-.238 1.509.319 2.382.796 2.859.398.397 1.034.794 2.148.794.238 0 .397 0 .636-.08 1.273-.159 2.545-.873 3.58-1.906 1.034-1.032 1.75-2.303 1.909-3.573 0-.238.08-.397.08-.635 0-1.192-.478-1.827-.796-2.224-.398-.397-1.114-.794-2.228-.794zM45.5 47.25v4.765l22.034-8.1v-3.733c0-1.111-1.114-1.906-2.227-1.508l-18.614 6.829c-.716.238-1.193.953-1.193 1.747z'
                      transform='translate(10 5)'
                    />
                  </g>
                </svg>
                <span className='text-[16px] text-[#ffffff80]'>Không có kết quả được tìm thấy</span>
              </div>
            )}
          </>
        )}

        {dataType && type === 'song' && (
          <>
            {dataType.pages[0].data.data && (
              <div className='mt-12 flex-1'>
                <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>Bài hát</h3>
                <div className='grid grid-cols-1'>
                  {dataType.pages
                    .map((data) => data.data.data.items)
                    .filter((itemFilter) => itemFilter !== undefined)
                    .map((itemMap) =>
                      itemMap.map((item) => (
                        <CardItem
                          key={item.encodeId}
                          dataItem={item}
                          classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                          className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                          isDate={false}
                          hideLike={false}
                          dataPlaylist={itemMap}
                          playlistId={''}
                        />
                      ))
                    )}
                </div>
              </div>
            )}
            {!dataType.pages[0].data.data.items && (
              <div className='mt-[30px] flex min-h-[220px] flex-col items-center justify-center gap-5 bg-[#ffffff1a] py-[30px]'>
                <svg xmlns='http://www.w3.org/2000/svg' width={90} height={90} viewBox='0 0 90 90'>
                  <path
                    fill='#B3B3B3'
                    d='M77.02 5.244c-1.865-1.294-4.252-1.6-6.386-.818L35.549 17.28c-2.724.998-4.555 3.609-4.555 6.495v39.278c-2.002-1.414-4.57-1.97-7.387-1.57-3.178.45-6.322 2.085-8.852 4.602-2.53 2.516-4.174 5.643-4.628 8.803-.482 3.36.416 6.369 2.53 8.47C14.396 85.09 16.753 86 19.418 86c.571 0 1.158-.042 1.754-.127 3.178-.451 6.322-2.086 8.852-4.602 2.53-2.517 4.174-5.643 4.628-8.803.072-.501.11-.993.12-1.477.002-.03.005-34.059.005-34.059l41.439-15.181v24.734c-2.002-1.413-4.57-1.97-7.388-1.57-3.178.45-6.321 2.085-8.852 4.602-2.53 2.516-4.174 5.642-4.628 8.803-.482 3.36.416 6.369 2.53 8.47 1.74 1.731 4.097 2.642 6.762 2.642.572 0 1.158-.042 1.755-.126 3.177-.452 6.321-2.087 8.851-4.603 2.53-2.516 4.174-5.643 4.628-8.803.072-.5.125-44.979.125-44.979 0-2.261-1.114-4.384-2.98-5.677zM30.995 70.782c-.002.374-.03.759-.087 1.154-.339 2.36-1.602 4.73-3.557 6.675-1.956 1.944-4.34 3.2-6.712 3.538-2.17.308-4.056-.207-5.307-1.45-1.25-1.245-1.768-3.12-1.458-5.279.339-2.36 1.602-4.73 3.558-6.674 1.955-1.945 4.338-3.201 6.711-3.539.411-.058.812-.087 1.2-.087 1.662 0 3.093.53 4.107 1.538 1.01 1.004 1.541 2.42 1.545 4.064v.06zm45.222-53.04l-41.438 15.18v-9.146c0-1.318.835-2.509 2.078-2.964L71.942 7.957c.988-.362 2.05-.226 2.915.373.864.6 1.36 1.544 1.36 2.592v6.82zm0 36.469c-.002.375-.03.76-.087 1.157-.339 2.36-1.602 4.73-3.557 6.675-1.955 1.944-4.339 3.2-6.712 3.538-2.171.309-4.056-.207-5.307-1.45-1.25-1.244-1.768-3.119-1.458-5.278.339-2.36 1.602-4.73 3.558-6.675 1.955-1.944 4.338-3.2 6.711-3.538.411-.058.812-.087 1.2-.087 1.662 0 3.093.53 4.107 1.538 1.01 1.004 1.542 2.42 1.546 4.067v.053z'
                  />
                </svg>
                <span className='text-[16px] text-[#ffffff80]'>Không có Bài Hát được tìm thấy</span>
              </div>
            )}
          </>
        )}

        {dataType && type === 'playlist' && (
          <>
            {dataType.pages[0].data.data && (
              <div className='mt-12 flex-1'>
                <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>Playlist/Album</h3>
                <div className='grid grid-cols-5 gap-7'>
                  {dataType.pages
                    .map((data) => data.data.data.items)
                    .filter((item) => item !== undefined)
                    .map((item) =>
                      item.map((item) => (
                        <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                          <BoxItem
                            id={item.encodeId}
                            classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                            srcImg={item.thumbnailM}
                            altImg={item.title}
                            description={item.title}
                            link={item.link}
                            isLinkDesc={true}
                          />
                          <Artist
                            artistsData={item.artists}
                            className='line-clamp-1 block overflow-hidden break-words text-[14px] font-normal text-[#ffffff80]'
                          />
                        </div>
                      ))
                    )}
                </div>
              </div>
            )}
            {!dataType.pages[0].data.data.items && (
              <div className='mt-[30px] flex min-h-[220px] flex-col items-center justify-center gap-5 bg-[#ffffff1a] py-[30px]'>
                <svg xmlns='http://www.w3.org/2000/svg' width={90} height={90} viewBox='0 0 90 90'>
                  <g fill='#B3B3B3'>
                    <path
                      d='M31.818 5.32c-12.09 0-22.67 8.18-25.693 19.854l2.068.555c2.784-10.8 12.489-18.344 23.625-18.344V5.321zM5.33 31.765h2.147c0-1.35.08-2.7.318-4.05l-2.068-.318c-.318 1.43-.397 2.859-.397 4.368zM31.818 25.412c-3.5 0-6.363 2.859-6.363 6.353 0 3.494 2.863 6.353 6.363 6.353 3.5 0 6.364-2.86 6.364-6.353 0-3.494-2.864-6.353-6.364-6.353zm0 10.562c-2.307 0-4.216-1.906-4.216-4.21 0-2.302 1.91-4.208 4.216-4.208 2.307 0 4.216 1.906 4.216 4.209s-1.909 4.209-4.216 4.209z'
                      transform='translate(10 5)'
                    />
                    <path
                      d='M31.818 18.026c-7.636 0-13.761 6.195-13.761 13.739 0 7.544 6.125 13.738 13.761 13.738 7.637 0 13.762-6.115 13.762-13.738 0-7.624-6.125-13.739-13.762-13.739zm0 25.412c-6.443 0-11.693-5.24-11.693-11.673s5.25-11.674 11.693-11.674 11.693 5.241 11.693 11.674c0 6.432-5.25 11.673-11.693 11.673z'
                      transform='translate(10 5)'
                    />
                    <path
                      d='M41.045 62.18v-2.224c-2.943.953-6.045 1.509-9.227 1.509-16.386-.08-29.67-13.341-29.67-29.7 0-16.36 13.284-29.62 29.67-29.62 16.387 0 29.67 13.26 29.67 29.62 0 1.19-.079 2.461-.238 3.653l2.227-.794c.08-.953.16-1.827.16-2.78C63.636 14.214 49.396 0 31.817 0 14.238 0 0 14.215 0 31.765s14.239 31.764 31.818 31.764c3.182 0 6.284-.476 9.227-1.35z'
                      transform='translate(10 5)'
                    />
                    <path
                      d='M37.307 80.365c-1.432 0-2.705-.477-3.58-1.43-1.113-1.111-1.59-2.7-1.352-4.526.239-1.668 1.114-3.335 2.466-4.685 1.352-1.35 3.023-2.224 4.693-2.462.318-.08.636-.08.955-.08.238 0 .477 0 .795.08l2.227.317V47.091c0-1.509.955-2.938 2.387-3.494l18.693-6.909c.398-.159.875-.238 1.273-.238.795 0 1.511.238 2.147.635.955.715 1.591 1.827 1.591 3.018v11.991c0 7.465 0 11.674-.08 12.07-.238 1.668-1.113 3.336-2.465 4.686-1.352 1.35-3.023 2.224-4.693 2.462-.398.159-.716.159-.955.159-1.432 0-2.704-.477-3.58-1.43-1.113-1.112-1.59-2.7-1.352-4.526.239-1.668 1.114-3.336 2.466-4.686s3.023-2.223 4.693-2.461c.319-.08.637-.08.955-.08.239 0 .477 0 .795.08l2.228.317V45.98L45.5 54.16v18.185c0 .238 0 .556-.08.794-.238 1.668-1.113 3.336-2.465 4.686-1.353 1.35-3.023 2.223-4.694 2.461-.318.08-.636.08-.954.08zm3.182-11.197c-.239 0-.398 0-.637.08-1.272.158-2.545.873-3.58 1.905-1.033 1.032-1.75 2.303-1.908 3.573-.239 1.51.318 2.383.795 2.86.398.396 1.034.793 2.148.793.238 0 .398 0 .636-.079 1.273-.159 2.546-.874 3.58-1.906 1.034-1.032 1.75-2.303 1.909-3.573 0-.239.08-.397.08-.636 0-1.19-.478-1.826-.796-2.223-.398-.238-1.114-.794-2.227-.794zm24.022-8.815c-.238 0-.397 0-.636.08-1.273.158-2.545.873-3.58 1.905-1.034 1.033-1.75 2.303-1.909 3.574-.238 1.509.319 2.382.796 2.859.398.397 1.034.794 2.148.794.238 0 .397 0 .636-.08 1.273-.159 2.545-.873 3.58-1.906 1.034-1.032 1.75-2.303 1.909-3.573 0-.238.08-.397.08-.635 0-1.192-.478-1.827-.796-2.224-.398-.397-1.114-.794-2.228-.794zM45.5 47.25v4.765l22.034-8.1v-3.733c0-1.111-1.114-1.906-2.227-1.508l-18.614 6.829c-.716.238-1.193.953-1.193 1.747z'
                      transform='translate(10 5)'
                    />
                  </g>
                </svg>
                <span className='text-[16px] text-[#ffffff80]'>Không có Playlist/Album được tìm thấy</span>
              </div>
            )}
          </>
        )}

        {dataType && type === 'artist' && (
          <>
            {dataType.pages[0].data.data && (
              <div className='mt-12 flex-1'>
                <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>Nghệ Sĩ/OA</h3>
                <div className='grid grid-cols-5 gap-7'>
                  {dataType.pages
                    .map((data) => data.data.data.items)
                    .filter((item) => item !== undefined)
                    .map((item) =>
                      item.map((item) => (
                        <div key={item.id} className='flex-1 flex-shrink-0'>
                          <ArtistCard
                            key={item.id}
                            srcImg={item.thumbnailM}
                            altImg={item.name}
                            description={item.name}
                            artistsData={[item]}
                          />
                        </div>
                      ))
                    )}
                </div>
              </div>
            )}
            {!dataType.pages[0].data.data.items && (
              <div className='mt-[30px] flex min-h-[220px] flex-col items-center justify-center gap-5 bg-[#ffffff1a] py-[30px]'>
                <svg xmlns='http://www.w3.org/2000/svg' width={90} height={90} viewBox='0 0 90 90'>
                  <g fill='#B3B3B3'>
                    <path
                      d='M36.314 55.944c-1.294 0-2.336-1.055-2.336-2.366 0-.434-.35-.788-.78-.788-.428 0-.778.354-.778.788 0 1.311-1.042 2.366-2.337 2.366-.429 0-.78.354-.78.788 0 .434.351.788.78.788 1.294 0 2.337 1.055 2.337 2.366 0 .434.35.789.779.789.428 0 .779-.355.779-.789 0-1.311 1.042-2.366 2.336-2.366.43 0 .78-.354.78-.788 0-.434-.35-.788-.78-.788zm-3.116 1.576c-.224-.295-.485-.56-.778-.788.293-.227.555-.493.779-.788.223.295.487.561.779.788-.293.228-.555.493-.78.788zm-3.154-44.946c-1.294 0-2.337-1.054-2.337-2.365 0-.434-.35-.79-.779-.79-.429 0-.779.356-.779.79 0 1.31-1.042 2.365-2.337 2.365-.428 0-.778.355-.778.79 0 .433.35.787.778.787 1.295 0 2.337 1.055 2.337 2.366 0 .434.35.789.78.789.428 0 .778-.355.778-.789 0-1.311 1.042-2.366 2.337-2.366.429 0 .779-.354.779-.788 0-.434-.35-.789-.779-.789zm-3.116 1.577c-.224-.295-.486-.56-.779-.788.293-.227.555-.493.78-.789.223.296.486.562.778.79-.293.227-.555.492-.779.787zm-3.992 16.57c-.233-.67-.755-1.199-1.421-1.44v-6.76l-8.569 2.897v5.44c-1.217.444-1.84 1.804-1.402 3.027.328.925 1.2 1.547 2.181 1.557 1.295-.01 2.327-1.074 2.318-2.386-.01-.985-.623-1.872-1.539-2.207v-1.154l5.453-1.833v1.41c-1.217.433-1.85 1.783-1.422 3.015.201.589.63 1.072 1.19 1.342.56.27 1.204.306 1.79.097.587-.21 1.067-.644 1.333-1.208.267-.564.298-1.21.088-1.798zm-9.21 3.144c-.43 0-.78-.355-.78-.789 0-.433.351-.789.78-.789.428 0 .778.356.778.79 0 .433-.35.788-.779.788zm.778-5.826v-1.488l5.453-1.833v1.488l-5.453 1.833zm6.232 4.248c-.43 0-.78-.354-.78-.788 0-.433.352-.789.78-.789.428 0 .779.356.779.79 0 .433-.35.787-.78.787zm20.213-13.592c-5.725 0-10.36 4.692-10.36 10.487 0 .366 0 .7.059 1.075l-17.585 19.91 1.383 1.4-2.766 2.799 1.724 1.745-3.32 3.351.983.996 3.31-3.361 1.724 1.744 2.765-2.799 1.383 1.4 19.103-17.9c.526.089 1.061.128 1.597.128 5.725 0 10.36-4.692 10.36-10.488 0-5.795-4.635-10.487-10.36-10.487zM16.081 56.87L13.6 54.356l1.791-1.813 2.483 2.514-1.792 1.813zm4.138-1.39l-5.267-5.322 13.086-14.864 6.6 6.683-14.42 13.503h.001zm15.463-14.41l-6.699-6.782 1.986-2.306c.925 3.361 3.447 6.042 6.718 7.156l-2.005 1.932zm5.267-2.8c-4.956 0-8.977-4.07-8.977-9.088 0-5.016 4.02-9.087 8.977-9.087 4.956 0 8.978 4.07 8.978 9.087 0 5.018-4.022 9.088-8.978 9.088z'
                      transform='translate(10 11)'
                    />
                    <path
                      d='M42.468 21.643l-.272 1.37c.427.09.844.223 1.246.394l.555-1.282c-.493-.21-1.005-.37-1.529-.482zm-9.113 7.54h1.382c0-3.48 2.785-6.298 6.222-6.298v-1.4c-4.207 0-7.604 3.45-7.604 7.697zm30.924 6.259c0-.484.392-.876.876-.876s.876.392.876.876c0 18.273-14.634 33.088-32.697 33.088-4.83.005-9.6-1.075-13.958-3.16-1.296-.619-2.55-1.323-3.752-2.107-.263-.17-.415-.468-.398-.781.016-.313.198-.593.477-.735.279-.142.612-.125.875.046 1.139.742 2.326 1.409 3.553 1.994 4.122 1.974 8.634 2.995 13.204 2.99 17.088 0 30.943-14.026 30.943-31.335zM8.957 54.759c.19.248.235.579.116.868-.12.29-.384.493-.695.535-.31.041-.619-.086-.81-.334-1.308-1.697-2.453-3.514-3.42-5.426C1.827 45.758.622 40.635.63 35.442c0-18.273 14.635-33.088 32.696-33.088.484 0 .877.392.877.876s-.393.877-.877.877c-17.088 0-30.943 14.025-30.943 31.334 0 4.994 1.152 9.818 3.333 14.174.917 1.813 2.003 3.535 3.243 5.144h-.001zm31.457-43.237c-.304-.076-.543-.309-.629-.61-.086-.301-.004-.625.214-.85.218-.224.539-.316.843-.24 9.6 2.417 17.189 10.01 19.652 19.727.118.47-.165.946-.635 1.065-.469.119-.945-.165-1.064-.634-2.305-9.094-9.407-16.199-18.38-18.458zm2.203-9.152c-.477-.079-.8-.53-.722-1.008.08-.477.53-.8 1.008-.721C55.682 2.748 66.06 12.378 69.276 25.014c.077.304-.013.625-.238.844-.224.218-.548.3-.85.216-.3-.085-.534-.324-.61-.628C64.531 13.481 54.705 4.363 42.617 2.37z'
                      transform='translate(10 11)'
                    />
                  </g>
                </svg>
                <span className='text-[16px] text-[#ffffff80]'>Không có Nghệ sĩ/OA được tìm thấy</span>
              </div>
            )}
          </>
        )}

        {/* Loading */}
        {!dataResult && type === 'all' && (
          <>
            <div className='mt-14 grid grid-cols-3 gap-7'>
              <Skeleton width={'full'} height={104} />
              <Skeleton width={'full'} height={104} />
              <Skeleton width={'full'} height={104} />
            </div>
            <div className='mt-14 grid w-full grid-cols-2 gap-3'>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='flex w-full gap-2'>
                    <Skeleton width={40} height={40} />
                    <div className='w-[80%]'>
                      <Skeleton width={'60%'} height={10} />
                      <Skeleton width={'40%'} height={10} />
                    </div>
                    <Skeleton width={'40px'} height={10} />
                  </div>
                ))}
            </div>
            <div className='mt-14 grid w-full grid-cols-5 gap-7'>
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
          </>
        )}

        {!dataType && type === 'song' && (
          <div className='mt-16 grid w-full grid-cols-1 gap-3'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='flex w-full gap-2'>
                  <Skeleton width={40} height={40} />
                  <div className='w-[40%]'>
                    <Skeleton width={'80%'} height={10} />
                    <Skeleton width={'60%'} height={10} />
                  </div>
                  <div className='w-[40%]'>
                    <Skeleton width={'60%'} height={10} />
                  </div>
                  <Skeleton width={'40px'} height={10} />
                </div>
              ))}
          </div>
        )}

        {!dataType && type === 'playlist' && (
          <div className='mt-16 grid w-full grid-cols-5 gap-7'>
            {Array(15)
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

        {!dataType && type === 'artist' && (
          <div className='mt-16 grid w-full grid-cols-5 gap-7'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='grid grid-cols-1 text-center'>
                  <Skeleton circle height={208} width={208} />
                  <Skeleton height={10} width={'60%'} style={{ marginTop: 14 }} />
                  <Skeleton height={10} width={'40%'} />
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default Search
