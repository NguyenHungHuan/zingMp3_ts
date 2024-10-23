import moment from 'moment'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import Artist from '~/components/Artist'
import ArtistCard from '~/components/ArtistCard'
import BoxItem from '~/components/BoxItem'
import CardItem from '~/components/CardItem'
import { formatNumberSocial } from '~/utils/formatNumber'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Playlist = () => {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['playlist', { id: id }],
    queryFn: () => zingmp3Api.getDetailPlaylist({ id: id as string }),
    keepPreviousData: false,
    staleTime: 3 * 60 * 1000,
    enabled: id !== ''
  })
  const dataAlbum = useMemo(() => data?.data.data, [data])

  return (
    <>
      {dataAlbum && dataAlbum.isSingle === false && (
        <main className='mx-[-2px] py-10'>
          <div className='flex gap-[30px]'>
            <div key={dataAlbum.encodeId} className='sticky top-[110px] h-[540px] w-[300px] flex-shrink-0'>
              <BoxItem
                id={dataAlbum.encodeId}
                classNameDesc='mt-3 mb-[2px] text-white text-[20px] font-bold whitespace-normal text-center'
                srcImg={dataAlbum.thumbnailM}
                altImg={dataAlbum.title}
                hideOption={true}
                hideLike={true}
                description={dataAlbum.title}
                isLinkDesc={false}
                isLink={false}
              />
              <div className='flex flex-col items-center justify-center gap-1 text-center text-[12px] text-[#ffffff80]'>
                <span>{`Cập nhật: ${moment(dataAlbum.contentLastUpdate * 1000).format('L')}`}</span>
                <Artist artistsData={dataAlbum.artists} />
                <span>{`${formatNumberSocial(dataAlbum.like)} người yêu thích`}</span>
              </div>
              <div className='mt-4 flex flex-col items-center justify-center text-white'>
                <button className='flex items-center gap-2 rounded-full bg-[#9b4de0] px-5 py-2 text-[14px] uppercase'>
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
                  phát ngẫu nhiên
                </button>
              </div>
            </div>
            <div className='flex-1'>
              {dataAlbum.description && (
                <p className='mb-[10px] text-[14px] text-[#ffffff80]'>
                  Lời tựa <strong className='font-normal text-white'>{dataAlbum.description}</strong>
                </p>
              )}
              <div className='flex w-full flex-shrink-0 items-center gap-4 border-b border-[#ffffff0d] py-3 pl-2 pr-3 text-[12px] font-semibold uppercase text-[#ffffff80]'>
                <span className='flex-1'>Bài hát</span>
                <div className='flex flex-1 items-center justify-between'>
                  <span>Album</span>
                  <span>Thời gian</span>
                </div>
              </div>
              {dataAlbum.song.items.map((item) => (
                <CardItem
                  key={item.encodeId}
                  dataItem={item}
                  classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                  className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                  isDate={false}
                  hideLike={false}
                  dataPlaylist={dataAlbum.song.items}
                  playlistId={dataAlbum.encodeId}
                />
              ))}
              <p className='mt-3 flex items-center gap-2 pl-2 text-[13px] font-semibold text-[#ffffff80]'>
                <span>{`${dataAlbum.song.total} bài hát`}</span>•
                <span>{`${new Date(dataAlbum.song.totalDuration * 1000).getUTCHours()} giờ ${new Date(
                  dataAlbum.song.totalDuration * 1000
                ).getUTCMinutes()} phút`}</span>
              </p>
            </div>
          </div>
          {dataAlbum.artists && (
            <div className='mt-[48px]'>
              <h3 className='mb-5 text-[20px] font-bold text-white'>Nghệ Sĩ Tham Gia</h3>
              <div className='grid grid-cols-5 gap-[28px]'>
                {dataAlbum.artists.map((item) => (
                  <ArtistCard
                    key={item.id}
                    srcImg={item.thumbnailM}
                    altImg={item.name}
                    description={item.name}
                    artistsData={[item]}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      )}
      {dataAlbum && dataAlbum.isSingle === true && (
        <main className='mx-[-2px] py-10'>
          <div className='flex gap-[30px]'>
            <div key={dataAlbum.encodeId} className='sticky top-[110px] h-[540px] w-[300px] flex-shrink-0'>
              <BoxItem
                id={dataAlbum.encodeId}
                classNameDesc='mt-3 mb-[2px] text-white text-[20px] font-bold whitespace-normal text-center'
                srcImg={dataAlbum.thumbnailM}
                altImg={dataAlbum.title}
                hideOption={true}
                hideLike={true}
                description={dataAlbum.title}
                isLinkDesc={false}
                isLink={false}
              />
              <div className='flex flex-col items-center justify-center gap-1 text-center text-[12px] text-[#ffffff80]'>
                <span>{`Cập nhật: ${moment(dataAlbum.contentLastUpdate * 1000).format('L')}`}</span>
                <Artist artistsData={dataAlbum.artists} />
                <span>{`${formatNumberSocial(dataAlbum.like)} người yêu thích`}</span>
              </div>
              <div className='mt-4 flex flex-col items-center justify-center text-white'>
                <button className='flex items-center gap-2 rounded-full bg-[#9b4de0] px-5 py-2 text-[14px] uppercase'>
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
                  phát tất cả
                </button>
              </div>
            </div>
            <div className='flex-1'>
              {dataAlbum.description && (
                <p className='mb-[10px] text-[14px] text-[#ffffff80]'>
                  Lời tựa <strong className='font-normal text-white'>{dataAlbum.description}</strong>
                </p>
              )}
              <div className='flex w-full items-center justify-between gap-4 border-b border-[#ffffff0d] py-3 pl-2 pr-3 text-[12px] font-semibold uppercase text-[#ffffff80]'>
                <span>Bài hát</span>
                <span>Thời gian</span>
              </div>
              {dataAlbum.song.items.map((item) => (
                <CardItem
                  key={item.encodeId}
                  dataItem={item}
                  classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                  className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                  isDate={false}
                  hideLike={false}
                  hideAlbum
                  dataPlaylist={dataAlbum.song.items}
                  playlistId={dataAlbum.encodeId}
                />
              ))}
              <h3 className='mb-2 mt-5 text-[14px] font-bold text-white'>Thông tin</h3>
              <div className='flex items-center gap-4'>
                <div className='flex flex-col gap-2 text-[13px] text-[#ffffff80]'>
                  <span>Số bài hát</span>
                  <span>Ngày phát hành</span>
                  <span>Cung cấp bởi</span>
                </div>
                <div className='flex flex-col gap-2 text-[13px] text-white'>
                  <span>{dataAlbum.song.total}</span>
                  <span>{dataAlbum.releaseDate}</span>
                  <span>{dataAlbum.distributor}</span>
                </div>
              </div>
              {dataAlbum.sections && dataAlbum.sections[0] && dataAlbum.sections[0].items && (
                <div className='mt-[48px]'>
                  {dataAlbum.sections[0].title && (
                    <h3 className='mb-5 text-[20px] font-bold text-white'>{dataAlbum.sections[0].title}</h3>
                  )}
                  {dataAlbum.sections[0].items.map((item) => (
                    <CardItem
                      key={item.encodeId}
                      dataItem={item}
                      classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      hideLike={false}
                      dataPlaylist={dataAlbum.sections[0].items}
                      playlistId={dataAlbum.encodeId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {dataAlbum.artists && (
            <div className='mt-[48px]'>
              <h3 className='mb-5 text-[20px] font-bold text-white'>Nghệ Sĩ Tham Gia</h3>
              <div className='grid grid-cols-5 gap-[28px]'>
                {dataAlbum.artists.map((item) => (
                  <ArtistCard
                    key={item.id}
                    srcImg={item.thumbnailM}
                    altImg={item.name}
                    description={item.name}
                    artistsData={[item]}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      )}
      {!dataAlbum && (
        <div className='mx-[-2px] py-10'>
          <div className='flex'>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <Skeleton width={300} height={300} />
              <Skeleton
                width={280}
                height={15}
                style={{
                  marginTop: 18
                }}
              />
              <Skeleton width={250} height={10} />
              <Skeleton
                width={150}
                height={30}
                borderRadius={20}
                style={{
                  marginTop: 12
                }}
              />
            </div>
            <div className='ml-10 mt-6 grid w-full grid-cols-1 gap-3'>
              {Array(6)
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
          </div>
        </div>
      )}
    </>
  )
}

export default Playlist
