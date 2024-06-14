import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import CardItem from '~/components/CardItem'
import Chart from '~/components/Chart'
import PATH from '~/constants/path'
import useHome from '~/hooks/useHome'

export default function ZingChart() {
  const [range, setRange] = useState<Array<number>>([0, 10])
  const { dataZingChart } = useHome()
  const { data } = useQuery({
    queryKey: ['newReleaseChart'],
    queryFn: zingmp3Api.getChartHome,
    staleTime: 3 * 60 * 1000
  })
  const dataChartHome = data?.data.data

  return (
    <main className='mx-[-2px] pt-5'>
      <div className='relative mb-10 flex items-center gap-[10px]'>
        <h3 className='text-rbg text-[40px] font-bold'>#zingchart</h3>
        <button className='flex items-center justify-center hover:opacity-90'>
          <svg width={46} height={46} viewBox='0 0 44 44' fill='none'>
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
      <div className='relative'>
        <Chart dataChart={dataZingChart} />
      </div>
      {dataChartHome &&
        dataChartHome.RTChart.items
          .slice(range[0], range[1])
          .map((item, index) => (
            <CardItem
              key={item.encodeId}
              dataItem={item}
              classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
              className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
              isDate={false}
              number={index + 1}
              hideLike={false}
              hideLyric={false}
              dataPlaylist={dataChartHome.RTChart.items.slice(range[0], range[1])}
              playlistId={''}
            />
          ))}
      {range[0] === 0 && range[1] === 10 && (
        <div className='mt-5 flex w-full items-center justify-center'>
          <button
            className='flex items-center justify-center rounded-full border border-white px-5 py-2 text-white hover:bg-white/10'
            onClick={() => setRange([0, 100])}
          >
            Xem top 100
          </button>
        </div>
      )}
      <div className='relative mt-[30px] pt-[30px]'>
        <div className='absolute inset-0 mx-[-59px] bg-[url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.76/static/media/week-chart-bg.edf332e5.jpg)] bg-cover bg-[top_center] bg-no-repeat grayscale 2xl:mx-[-160px]' />
        <div className='absolute inset-0 mx-[-59px] bg-[#201335e6] 2xl:mx-[-160px]' />
        <div className='relative'>
          <Link to={`${PATH.zingWeek}/vn`} className='w-fit text-[40px] font-extrabold capitalize text-white'>
            Bảng Xếp Hạng Tuần
          </Link>
          <div className='mt-5 grid grid-cols-3'>
            <div className='col-span-1 mx-[14px] mb-[30px] rounded-2xl bg-[#ffffff0d] px-[10px] py-5'>
              <div className='flex items-start gap-2'>
                <Link
                  to={`${PATH.zingWeek}/vn`}
                  className='pb-[10px] pl-10 text-[24px] font-bold text-white hover:text-[#9b4de0]'
                >
                  Việt Nam
                </Link>
                <button className='flex items-center justify-center hover:opacity-90'>
                  <svg width={34} height={34} viewBox='0 0 44 44' fill='none'>
                    <g filter='url(#filter0_d_3141_46346)'>
                      <circle cx={22} cy={21} r={18} fill='#9b4de0' />
                    </g>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
              {dataChartHome &&
                dataChartHome.weekChart.vn.items
                  .slice(0, 5)
                  .map((item, index) => (
                    <CardItem
                      key={item.encodeId}
                      dataItem={item}
                      classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex items-center gap-x-[10px] overflow-hidden rounded p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      number={index + 1}
                      hideLike
                      hideLyric={false}
                      hideAlbum
                      textWide={false}
                      dataPlaylist={dataChartHome.weekChart.vn.items.slice(0, 5)}
                      playlistId={''}
                    />
                  ))}
              <div className='mt-[15px] flex w-full items-center justify-center'>
                <Link
                  to={`${PATH.zingWeek}/vn`}
                  className='flex items-center justify-center rounded-full border border-white px-5 py-[6px] text-white hover:bg-white/10'
                  onClick={() => setRange([0, 100])}
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className='col-span-1 mx-[14px] mb-[30px] rounded-2xl bg-[#ffffff0d] px-[10px] py-5'>
              <div className='flex items-start gap-2'>
                <Link
                  to={`${PATH.zingWeek}/us`}
                  className='pb-[10px] pl-10 text-[24px] font-bold text-white hover:text-[#9b4de0]'
                >
                  US-UK
                </Link>
                <button className='flex items-center justify-center hover:opacity-90'>
                  <svg width={34} height={34} viewBox='0 0 44 44' fill='none'>
                    <g filter='url(#filter0_d_3141_46346)'>
                      <circle cx={22} cy={21} r={18} fill='#9b4de0' />
                    </g>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
              {dataChartHome &&
                dataChartHome.weekChart.us.items
                  .slice(0, 5)
                  .map((item, index) => (
                    <CardItem
                      key={item.encodeId}
                      dataItem={item}
                      classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex items-center gap-x-[10px] overflow-hidden rounded p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      number={index + 1}
                      hideLike
                      hideLyric={false}
                      hideAlbum
                      textWide={false}
                      dataPlaylist={dataChartHome.weekChart.us.items.slice(0, 5)}
                      playlistId={''}
                    />
                  ))}
              <div className='mt-[15px] flex w-full items-center justify-center'>
                <Link
                  to={`${PATH.zingWeek}/us`}
                  className='flex items-center justify-center rounded-full border border-white px-5 py-[6px] text-white hover:bg-white/10'
                  onClick={() => setRange([0, 100])}
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
            <div className='col-span-1 mx-[14px] mb-[30px] rounded-2xl bg-[#ffffff0d] px-[10px] py-5'>
              <div className='flex items-start gap-2'>
                <Link
                  to={`${PATH.zingWeek}/kr`}
                  className='pb-[10px] pl-10 text-[24px] font-bold text-white hover:text-[#9b4de0]'
                >
                  K-Pop
                </Link>
                <button className='flex items-center justify-center hover:opacity-90'>
                  <svg width={34} height={34} viewBox='0 0 44 44' fill='none'>
                    <g filter='url(#filter0_d_3141_46346)'>
                      <circle cx={22} cy={21} r={18} fill='#9b4de0' />
                    </g>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M18.8449 13.5557C18.1011 13.14 17.7292 12.9322 17.4248 12.9672C17.1591 12.9977 16.9187 13.1388 16.7624 13.3558C16.5833 13.6045 16.5833 14.0305 16.5833 14.8825V27.1179C16.5833 27.9698 16.5833 28.3958 16.7624 28.6445C16.9186 28.8615 17.1591 29.0026 17.4247 29.0331C17.7292 29.0681 18.101 28.8604 18.8447 28.4448L29.7922 22.3277C30.568 21.8942 30.9559 21.6775 31.0849 21.3922C31.1973 21.1434 31.1973 20.8584 31.0849 20.6096C30.956 20.3243 30.5681 20.1076 29.7923 19.674L18.8449 13.5557Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
              {dataChartHome &&
                dataChartHome.weekChart.korea.items
                  .slice(0, 5)
                  .map((item, index) => (
                    <CardItem
                      key={item.encodeId}
                      dataItem={item}
                      classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                      className='group relative flex items-center gap-x-[10px] overflow-hidden rounded p-[10px] hover:bg-[#ffffff1a]'
                      isDate={false}
                      number={index + 1}
                      hideLike
                      hideLyric={false}
                      hideAlbum
                      textWide={false}
                      dataPlaylist={dataChartHome.weekChart.korea.items.slice(0, 5)}
                      playlistId={''}
                    />
                  ))}
              <div className='mt-[15px] flex w-full items-center justify-center'>
                <Link
                  to={`${PATH.zingWeek}/kr`}
                  className='flex items-center justify-center rounded-full border border-white px-5 py-[6px] text-white hover:bg-white/10'
                  onClick={() => setRange([0, 100])}
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
