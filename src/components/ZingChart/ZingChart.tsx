import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataPlaylist, ItemSections } from '~/types/home'
import Artist from '../Artist'
import BoxItem from '../BoxItem'
import classNames from 'classnames'
import PATH from '~/constants/path'

interface Props {
  dataChart?: DataPlaylist<ItemSections[]>
}

export default function ZingChart({ dataChart }: Props) {
  const [active, setActive] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev > 1 ? (prev = 0) : prev + 1))
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className='relative mt-12 p-5 rounded-lg overflow-hidden'>
      <div className='absolute inset-0 bg-[#2b273f]' />
      <div className='absolute inset-0 bg-[#33104cf2]'>
        <div className='bg-alpha-top' />
        <div className='bg-alpha-bottom' />
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
      <div className='flex flex-wrap relative mx-[-15px]'>
        <div className='w-[33.33333%] flex-shrink-0 px-[14px] float-left relative'>
          <div>
            {dataChart &&
              dataChart.items.slice(0, 3).map((item, index) => (
                <div
                  key={item.encodeId}
                  onMouseEnter={() => setActive(index)}
                  className={classNames('mb-[10px] rounded overflow-hidden group bg-[#ffffff12] hover:bg-[#ffffff44]', {
                    'bg-[#ffffff33]': active === index
                  })}
                >
                  <div className='px-[15px] py-[10px] flex items-center text-left'>
                    <div className='flex-[1_1_auto] flex w-[50%] mr-[10px]'>
                      <div className='flex items-center justify-center text-xs font-bold mr-[15px] text-[#ffffff80]'>
                        <span
                          className={classNames(
                            'w-[22px] min-w-0 opacity-100 text-[#4a90e200] text-[32px] font-black leading-[1] text-center',
                            {
                              'text-stroke-1': index === 0,
                              'text-stroke-2': index === 1,
                              'text-stroke-3': index === 2
                            }
                          )}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <BoxItem
                        altImg={item.title}
                        srcImg={item.thumbnail}
                        className='flex-shrink-0 mr-[10px]'
                        classNameFigure='relative cursor-pointer w-[60px] h-[60px] object-cover rounded overflow-hidden flex-shrink-0'
                        classNameImg='absolute inset-0 flex-shrink-0'
                        buttonSizeSmall={true}
                        hideDesc={true}
                        hideLike={true}
                        hideOption={true}
                      />
                      <div className='flex flex-col break-words gap-[3px] font-medium justify-center'>
                        <div className='flex items-center'>
                          <span className='text-white text-sm break-words cursor-default'>{item.title}</span>
                        </div>
                        <Artist
                          artistsData={item.artists}
                          className='text-[#ffffff80] text-xs overflow-hidden text-ellipsis block line-clamp-1 break-words'
                        />
                      </div>
                    </div>
                    <div className='flex-[0_0_auto] ml-[10px] leading-[1.56] text-base font-bold text-white'>
                      <span>{Math.round((Number(item?.score) / Number(dataChart.chart?.totalScore)) * 100)}%</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className='flex justify-center items-center'>
            <Link
              to={PATH.zingChart}
              className='mt-[5px] mb-[12px] rounded-full text-white border border-white py-[5px] px-[25px] leading-[1.5] font-normal text-sm hover:bg-[#ffffff1a]'
            >
              Xem thêm
            </Link>
          </div>
        </div>
        <div className='w-[66.66667%] flex-shrink-0 px-[14px] float-left relative'>
          <div className='h-[300px] mb-5'>
            
          </div>
        </div>
      </div>
    </div>
  )
}
