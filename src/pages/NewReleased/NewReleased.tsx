import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import CardItem from '~/components/CardItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import usePlayMusic from '~/hooks/usePlayMusic'
import { ItemSections } from '~/types/home'

export default function NewReleased() {
  const { handleHookPlayMusic } = usePlayMusic()

  const { data } = useQuery({
    queryKey: ['NewReleaseSongs'],
    queryFn: zingmp3Api.getNewReleaseSongs,
    staleTime: 3 * 60 * 1000
  })
  const dataNewRealeaseSongs = data?.data.data

  return (
    <main className='mx-[-2px] py-8'>
      {dataNewRealeaseSongs ? (
        <>
          <div className='flex items-center gap-2 pb-8'>
            <h1 className='text-[40px] font-bold text-white'>{dataNewRealeaseSongs.title}</h1>
            <button
              onClick={() =>
                handleHookPlayMusic({
                  songId: (dataNewRealeaseSongs &&
                    dataNewRealeaseSongs.items.filter((item) => item.streamingStatus !== 2)[0].encodeId) as string,
                  data: (dataNewRealeaseSongs && dataNewRealeaseSongs.items) as ItemSections[],
                  dataItem: (dataNewRealeaseSongs &&
                    dataNewRealeaseSongs.items.filter((item) => item.streamingStatus !== 2)[0]) as ItemSections,
                  playlistId: (dataNewRealeaseSongs &&
                    dataNewRealeaseSongs.items.filter((item) => item.streamingStatus !== 2)[0].encodeId) as string
                })
              }
              className='hover:opacity-90'
            >
              <svg width={44} height={44} viewBox='0 0 44 44' fill='none'>
                <g filter='url(#filter0_d_3141_46346)'>
                  <circle cx={22} cy={21} r={18} fill='#FEFFFF' />
                </g>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z'
                  fill='#141414'
                />
                <defs>
                  <filter
                    id='filter0_d_3141_46346'
                    x={0}
                    y={0}
                    width={44}
                    height={44}
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity={0} result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy={1} />
                    <feGaussianBlur stdDeviation={2} />
                    <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0' />
                    <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_3141_46346' />
                    <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_3141_46346' result='shape' />
                  </filter>
                </defs>
              </svg>
            </button>
          </div>
          {dataNewRealeaseSongs.items.map((item, index) => (
            <CardItem
              key={item.encodeId}
              dataItem={item}
              classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
              className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
              isDate={false}
              number={index + 1}
              hideLike={false}
              hideAlbum={false}
              dataPlaylist={dataNewRealeaseSongs.items}
              playlistId={''}
            />
          ))}
        </>
      ) : (
        <div className='ml-10 grid w-full grid-cols-1 gap-3'>
          {Array(20)
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
    </main>
  )
}
