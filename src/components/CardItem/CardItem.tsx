import Popover from '../Popover'
import { Link } from 'react-router-dom'
import BoxItem from '../BoxItem'
import Artist from '../Artist'
import moment from 'moment'
import 'moment/dist/locale/vi'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { useState, Fragment } from 'react'
import { formatNumberSocial } from '~/utils/formatNumber'
import classNames from 'classnames'
import Tooltip from '../Tooltip'
import PATH from '~/constants/path'
import useGenerateLink from '~/hooks/useGenerateLink'
import { ItemSections } from '~/types/home'

interface Props {
  dataItem: ItemSections
  className?: string
  isDate?: boolean
  classNameFigure?: string
  number?: number
  hideLyric?: boolean
  hideLike?: boolean
  hideMv?: boolean
  hideAlbum?: boolean
  textWide?: boolean
}

export default function CardItem({
  dataItem,
  number,
  className = 'col-span-1 h-20 hover:bg-[#2f2739] group rounded-lg p-[10px] flex gap-[10px] items-center',
  classNameFigure = 'relative cursor-pointer w-[60px] h-[60px] object-cover rounded overflow-hidden flex-shrink-0',
  isDate = false,
  hideLyric = true,
  hideLike = true,
  hideMv = true,
  hideAlbum = false,
  textWide = true
}: Props) {
  const [active, setActive] = useState(false)
  const [idSong, setIdSong] = useState('')
  const handleClick = () => setIdSong(dataItem.encodeId)

  const { data, isSuccess } = useQuery({
    queryKey: ['infoSong', idSong],
    queryFn: () => zingmp3Api.getSongInfo({ id: idSong }),
    staleTime: 3 * 60 * 1000,
    enabled: idSong !== ''
  })
  const dataInfoSong = data?.data.data
  const { idPlaylist, namePlaylist } = useGenerateLink(dataInfoSong?.album.link)
  return (
    <div
      className={classNames(className, {
        'bg-[#2f2739]': active
      })}
    >
      <div className={`flex ${hideAlbum ? 'w-full' : 'w-1/2'} items-center gap-[10px]`}>
        {number && (
          <div className='mr-2 flex items-center justify-center text-xs font-bold'>
            <span
              className={classNames(
                `mr-1 ${
                  textWide ? 'min-w-[60px]' : 'min-w-[30px]'
                } text-center text-[32px] font-black leading-[1] text-[#4a90e200]`,
                {
                  'text-stroke-1 opacity-100': number === 1,
                  'text-stroke-2 opacity-100': number === 2,
                  'text-stroke-3 opacity-100': number === 3,
                  'text-stroke opacity-80': number > 3
                }
              )}
            >
              {number}
            </span>
            <div className='flex h-[36px] w-[18px] flex-col items-center justify-center text-white'>
              {dataItem.rakingStatus === 0 && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-[18px]'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                </svg>
              )}
              {Math.sign(dataItem.rakingStatus as number) === 1 && (
                <>
                  <svg
                    strokeWidth={0}
                    viewBox='0 0 15 15'
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 flex-shrink-0 text-green-500'
                  >
                    <path d='M4 9H11L7.5 4.5L4 9Z' fill='currentColor' />
                  </svg>
                  {dataItem.rakingStatus}
                </>
              )}
              {Math.sign(dataItem.rakingStatus as number) === -1 && (
                <>
                  <svg
                    strokeWidth={0}
                    viewBox='0 0 15 15'
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 flex-shrink-0 text-red-500'
                  >
                    <path d='M4 6H11L7.5 10.5L4 6Z' fill='currentColor' />
                  </svg>
                  {Math.abs(dataItem.rakingStatus as number)}
                </>
              )}
            </div>
          </div>
        )}
        <BoxItem
          effectActive={active}
          altImg={dataItem.title}
          srcImg={dataItem.thumbnail}
          className='flex-shrink-0'
          classNameFigure={classNameFigure}
          classNameImg='absolute inset-0 flex-shrink-0'
          buttonSizeSmall={true}
          hideDesc={true}
          hideLike={true}
          hideOption={true}
          isLink={false}
        />
        <div className='flex flex-col gap-[3px] break-words font-medium'>
          <div className='flex items-center'>
            <span className='line-clamp-1 cursor-default text-sm text-white'>{dataItem.title}</span>
          </div>
          {dataItem.artists ? (
            <Artist artistsData={dataItem.artists} className='line-clamp-1 overflow-hidden  text-xs text-[#ffffff80]' />
          ) : (
            <span className='line-clamp-1 block overflow-hidden text-ellipsis break-words text-xs font-normal text-[#ffffff80]'>
              {dataItem.artistsNames}
            </span>
          )}
          {isDate && (
            <span className='line-clamp-1 cursor-default text-xs text-[#ffffff80]'>
              {moment((dataItem.releaseDate as number) * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {dataItem.album && dataItem.duration && (
        <div className='flex flex-1 flex-shrink-0 items-center justify-between text-xs text-[#ffffff80]'>
          {!hideAlbum && (
            <Link to={'/'} className='hover:text-[#c273ed] hover:underline'>
              {dataItem.album.title}
            </Link>
          )}
          <span className='absolute right-0 inline-block pr-4 font-normal group-hover:hidden'>
            {Math.trunc(dataItem.duration / 60)
              .toString()
              .padStart(2, '0')}
            :{(dataItem.duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      )}
      {dataItem.mvlink && !hideMv && (
        <Tooltip text='Xem MV' className='hidden group-hover:block'>
          <button className='hidden h-[38px] w-[38px] items-center justify-center rounded-full fill-white hover:bg-[#ffffff1a] group-hover:flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              version='1.1'
              viewBox='0 0 256 256'
              className='h-[22px] w-[22px]'
            >
              <g>
                <g>
                  <path
                    fill='white'
                    d='M130,91.4c-0.2,0-0.5,0-0.7,0.1c0,0,0,0-0.1,0c-0.2,0-0.5,0-0.7,0.1c-1.8,0.3-3.4,1.3-4.4,3l-26.8,50.8L70.7,94.4c-1.4-2.4-4.3-3.5-7-2.9c0,0-0.1,0-0.1,0c-0.3,0.1-0.5,0.1-0.7,0.2c-0.2,0.1-0.5,0.2-0.7,0.3c0,0-0.1,0-0.1,0.1c0,0,0,0,0,0c-0.7,0.4-1.3,0.9-1.9,1.6c0,0,0,0,0,0c-0.5,0.6-0.8,1.3-1,2.1c0,0,0,0.1,0,0.1c-0.1,0.5-0.2,1-0.2,1.5v61c0,3.4,2.7,6.1,6.1,6.1c3.4,0,6.1-2.7,6.1-6.1v-36.3l20.7,39.3c1.5,2.6,4.6,3.7,7.4,2.8c1.7-0.4,3.2-1.4,4.1-2.9l20.7-39.2v36.3c0,3.4,2.7,6.1,6.1,6.1c3.4,0,6.1-2.7,6.1-6.1V97.5C136.1,94.1,133.4,91.4,130,91.4z'
                  />
                  <path
                    fill='white'
                    d='M197.7,91.9c-3-1.4-6.6,0-7.9,3.1l-19,47l-19-47c-1.3-3.1-4.9-4.5-7.9-3.1c-3,1.4-4.4,5.1-3,8.2l24.1,59.6c0.4,1.9,1.5,3.5,3.3,4.4c0.8,0.4,1.7,0.5,2.6,0.5c0.9,0,1.7-0.1,2.6-0.5c1.8-0.8,2.9-2.5,3.3-4.4l24.1-59.6C202.1,97,200.7,93.3,197.7,91.9z'
                  />
                  <path
                    fill='white'
                    d='M197.1,22.2H58.8C31.9,22.2,10,44.1,10,71v113.9c0,27,21.9,48.8,48.8,48.8h138.3c27,0,48.8-21.9,48.8-48.8V71.1C246,44.1,224.1,22.2,197.1,22.2z M233.8,185c0,20.2-16.4,36.6-36.6,36.6H58.8c-20.2,0-36.6-16.4-36.6-36.6V71.1c0-20.2,16.4-36.6,36.6-36.6h138.3c20.2,0,36.6,16.4,36.6,36.6L233.8,185L233.8,185z'
                  />
                </g>
              </g>
            </svg>
          </button>
        </Tooltip>
      )}
      {dataItem.hasLyric && !hideLyric && (
        <Tooltip text='Phát cùng lời bài hát' className='hidden group-hover:block'>
          <button className='hidden h-[38px] w-[38px] items-center justify-center rounded-full fill-white hover:bg-[#ffffff1a] group-hover:flex'>
            <svg
              stroke='currentColor'
              strokeWidth={0}
              viewBox='0 0 512 512'
              className='h-5 w-[19px]'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M388.938 29.47c-23.008 0-46.153 9.4-62.688 25.405 5.74 46.14 21.326 75.594 43.75 94.28 22.25 18.543 52.078 26.88 87.75 28.345 13.432-16.07 21.188-37.085 21.188-58 0-23.467-9.75-47.063-26.344-63.656C436 39.25 412.404 29.47 388.938 29.47zm-76.282 42.374c-8.808 14.244-13.75 30.986-13.75 47.656 0 23.467 9.782 47.063 26.375 63.656 16.595 16.594 40.19 26.375 63.658 26.375 18.678 0 37.44-6.196 52.687-17.093-31.55-3.2-59.626-12.46-81.875-31-23.277-19.397-39.553-48.64-47.094-89.593zm-27.78 67.72l-64.47 83.78c2.898 19.6 10.458 35.1 22.094 46.187 11.692 11.142 27.714 18.118 48.594 19.626l79.312-65.28c-21.2-3.826-41.14-14.11-56.437-29.407-14.927-14.927-25.057-34.286-29.095-54.907zM300 201.468a8 8 0 0 1 .03 0 8 8 0 0 1 .533 0 8 8 0 0 1 5.875 13.374l-34.313 38.78a8.004 8.004 0 1 1-12-10.593l34.313-38.78a8 8 0 0 1 5.562-2.78zM207.594 240L103 375.906c3.487 13.327 7.326 20.944 12.5 26.03 5.03 4.948 12.386 8.46 23.563 12.408l135.312-111.438c-17.067-3.61-31.595-11.003-42.906-21.78-11.346-10.81-19.323-24.827-23.876-41.126zM95.97 402.375c-9.12 5.382-17.37 14.08-23.126 24.406-9.656 17.317-11.52 37.236-2.25 50.47 6.665 4.337 10.566 4.81 13.844 4.344 1.794-.256 3.618-.954 5.624-1.875-3.18-9.575-6.3-20.93-2.5-33.314 3.03-9.87 10.323-19.044 23.47-27.5-2.406-1.65-4.644-3.49-6.75-5.562-3.217-3.163-5.94-6.78-8.313-10.97z' />
            </svg>
          </button>
        </Tooltip>
      )}
      {!hideLike && (
        <Tooltip text='Thêm vào thư viện' className='hidden group-hover:block'>
          <button className='hidden h-[38px] w-[38px] items-center justify-center rounded-full fill-white hover:bg-[#ffffff1a] group-hover:flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='white'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
              />
            </svg>
          </button>
        </Tooltip>
      )}
      <Popover
        setActive={setActive}
        isClick={true}
        isHover={false}
        className='relative ml-auto'
        placement='top-start'
        renderPopover={
          isSuccess && (
            <div className='w-[280px] rounded-lg bg-[#34224f] shadow-md'>
              <Popover
                numberDelay={100}
                isClick={false}
                isHover={true}
                NumberOffsetX={-15}
                NumberOffsetY={-13}
                placement='right-start'
                renderPopover={
                  <div className='w-[230px] rounded-lg bg-[#34224f] py-[10px] shadow-[0_0_5px_0_rgba(0,0,0,.2)]'>
                    <div className='p-[15px] text-xs font-normal uppercase leading-5 text-[#ffffff80]'>
                      <h3>Nghệ sĩ</h3>
                      <Artist
                        isPopoverDetail={false}
                        artistsData={dataItem.artists}
                        className='block break-words text-sm capitalize text-white'
                        classNameText='inline break-words hover:text-[#c273ed] hover:no-underline'
                      />
                      <h3>Album</h3>
                      <Link
                        to={`${PATH.album}/${namePlaylist}/${idPlaylist}`}
                        className='block text-sm capitalize text-white hover:text-[#c273ed]'
                      >
                        {dataInfoSong?.album.title}
                      </Link>
                      {dataInfoSong && dataInfoSong?.composers?.length > 0 && (
                        <>
                          <h3>Sáng tác</h3>
                          {dataInfoSong?.composers?.map((item, index) => (
                            <Fragment key={item.id}>
                              {dataInfoSong?.genres.length > 1 && index !== 0 && ', '}
                              <Link
                                to={`${PATH.ngheSi}/${item.alias}`}
                                className='inline text-sm capitalize text-white hover:text-[#c273ed]'
                                title={item.name}
                              >
                                {item.name}
                              </Link>
                            </Fragment>
                          ))}
                        </>
                      )}
                      <h3>Thể loại</h3>
                      {dataInfoSong?.genres.map((item, index) => (
                        <Fragment key={item.id}>
                          {dataInfoSong?.genres.length > 1 && index !== 0 && ', '}
                          <Link
                            to='/'
                            className='inline text-sm capitalize text-white hover:text-[#c273ed]'
                            title={item.name}
                          >
                            {item.name}
                          </Link>
                        </Fragment>
                      ))}
                      <h3>Cung cấp bởi</h3>
                      <span className='text-sm capitalize text-white'>{dataInfoSong?.distributor}</span>
                    </div>
                  </div>
                }
              >
                <ul>
                  <div className='flex items-center gap-[10px] px-[15px] pt-[15px] text-left'>
                    <div className='flex-shrink-0'>
                      <figure className='h-10 w-10 overflow-hidden rounded'>
                        <img src={dataItem.thumbnail} alt={dataItem.title} className='h-auto w-full' />
                      </figure>
                    </div>
                    <div className='w-[150px] flex-shrink flex-grow basis-auto self-center text-left'>
                      <Link
                        to={`${PATH.album}/${namePlaylist}/${idPlaylist}`}
                        className='mb-[2px] line-clamp-1 text-sm font-medium text-white hover:text-[#c273ed]'
                      >
                        {dataItem.title}
                      </Link>
                      {dataInfoSong && dataInfoSong.listen !== 0 ? (
                        <div className='flex items-center gap-[10px] text-xs font-normal text-[#a0a0a0]'>
                          <div className='flex items-center gap-[2px]'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='h-4 w-4'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                              />
                            </svg>
                            <span>{formatNumberSocial(dataInfoSong.like)}</span>
                          </div>
                          <div className='flex items-center gap-[2px]'>
                            <svg
                              stroke='currentColor'
                              fill='currentColor'
                              strokeWidth={1.5}
                              viewBox='0 0 256 256'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4'
                            >
                              <path d='M200.47,64.07A101.37,101.37,0,0,0,128.77,34H128A102,102,0,0,0,26,136v56a22,22,0,0,0,22,22H64a22,22,0,0,0,22-22V152a22,22,0,0,0-22-22H38.2A90.12,90.12,0,0,1,192,72.52,89.41,89.41,0,0,1,217.81,130H192a22,22,0,0,0-22,22v40a22,22,0,0,0,22,22h16a22,22,0,0,0,22-22V136A101.44,101.44,0,0,0,200.47,64.07ZM64,142a10,10,0,0,1,10,10v40a10,10,0,0,1-10,10H48a10,10,0,0,1-10-10V142Zm154,50a10,10,0,0,1-10,10H192a10,10,0,0,1-10-10V152a10,10,0,0,1,10-10h26Z' />
                            </svg>
                            <span>{formatNumberSocial(dataInfoSong.listen)}</span>
                          </div>
                          <div className='flex items-center gap-[2px]'></div>
                        </div>
                      ) : (
                        <Artist isPopoverDetail={false} artistsData={dataItem.artists} orderArtistHidden={2} />
                      )}
                    </div>
                  </div>
                </ul>
              </Popover>
              <ul className='mb-[10px] mt-[15px] px-[15px]'>
                <div className='flex items-center justify-between rounded-lg bg-[#ffffff1a]'>
                  <button className='flex max-w-[80px] flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] text-white hover:bg-[#ffffff1a]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='h-[19px] w-[19px]'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                      />
                    </svg>
                    <span>Tải xuống</span>
                  </button>
                  <button className='flex max-w-[80px] flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] text-white hover:bg-[#ffffff1a]'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={0}
                      viewBox='0 0 512 512'
                      className='h-5 w-[19px]'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M388.938 29.47c-23.008 0-46.153 9.4-62.688 25.405 5.74 46.14 21.326 75.594 43.75 94.28 22.25 18.543 52.078 26.88 87.75 28.345 13.432-16.07 21.188-37.085 21.188-58 0-23.467-9.75-47.063-26.344-63.656C436 39.25 412.404 29.47 388.938 29.47zm-76.282 42.374c-8.808 14.244-13.75 30.986-13.75 47.656 0 23.467 9.782 47.063 26.375 63.656 16.595 16.594 40.19 26.375 63.658 26.375 18.678 0 37.44-6.196 52.687-17.093-31.55-3.2-59.626-12.46-81.875-31-23.277-19.397-39.553-48.64-47.094-89.593zm-27.78 67.72l-64.47 83.78c2.898 19.6 10.458 35.1 22.094 46.187 11.692 11.142 27.714 18.118 48.594 19.626l79.312-65.28c-21.2-3.826-41.14-14.11-56.437-29.407-14.927-14.927-25.057-34.286-29.095-54.907zM300 201.468a8 8 0 0 1 .03 0 8 8 0 0 1 .533 0 8 8 0 0 1 5.875 13.374l-34.313 38.78a8.004 8.004 0 1 1-12-10.593l34.313-38.78a8 8 0 0 1 5.562-2.78zM207.594 240L103 375.906c3.487 13.327 7.326 20.944 12.5 26.03 5.03 4.948 12.386 8.46 23.563 12.408l135.312-111.438c-17.067-3.61-31.595-11.003-42.906-21.78-11.346-10.81-19.323-24.827-23.876-41.126zM95.97 402.375c-9.12 5.382-17.37 14.08-23.126 24.406-9.656 17.317-11.52 37.236-2.25 50.47 6.665 4.337 10.566 4.81 13.844 4.344 1.794-.256 3.618-.954 5.624-1.875-3.18-9.575-6.3-20.93-2.5-33.314 3.03-9.87 10.323-19.044 23.47-27.5-2.406-1.65-4.644-3.49-6.75-5.562-3.217-3.163-5.94-6.78-8.313-10.97z' />
                    </svg>
                    <span>Lời bài hát</span>
                  </button>
                  <button className='flex max-w-[80px] flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] text-white hover:bg-[#ffffff1a]'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={0}
                      viewBox='0 0 512 512'
                      className='h-5 w-[19px]'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx={256} cy={256} r={208} fill='none' strokeMiterlimit={10} strokeWidth={32} />
                      <path fill='none' strokeMiterlimit={10} strokeWidth={32} d='M108.92 108.92l294.16 294.16' />
                    </svg>
                    <span>Chặn</span>
                  </button>
                </div>
              </ul>
              <ul className='pl-[1px]'>
                <li>
                  <button className='flex w-full items-center gap-[14px] px-[14px] py-2 text-sm text-[#dadada] hover:bg-[#ffffff1a]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                      className='h-[18px] w-[18px]'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                      />
                    </svg>
                    <span>Thêm vào thư viện</span>
                  </button>
                </li>
                <li>
                  <button className='flex w-full items-center gap-[14px] px-[14px] py-2 text-sm text-[#dadada] hover:bg-[#ffffff1a]'>
                    <svg
                      className='h-[18px] w-[18px]'
                      viewBox='0 0 24 24'
                      focusable='false'
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={1}
                    >
                      <path d='M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z' />
                    </svg>
                    <span>Thêm vào danh sách phát</span>
                  </button>
                </li>
                <li>
                  <button className='flex w-full items-center gap-[14px] px-[14px] py-2 text-sm text-[#dadada] hover:bg-[#ffffff1a]'>
                    <svg
                      className='h-[18px] w-[18px]'
                      viewBox='0 0 24 24'
                      focusable='false'
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={1}
                    >
                      <path d='M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z' />
                    </svg>
                    <span>Phát tiếp theo</span>
                  </button>
                </li>
                <li>
                  <button className='flex w-full items-center gap-[14px] px-[14px] py-2 text-sm text-[#dadada] hover:bg-[#ffffff1a]'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={0}
                      viewBox='0 0 24 24'
                      className='h-[18px] w-[18px]'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path fill='none' d='M0 0h24v24H0V0z' />
                      <path d='M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' />
                    </svg>
                    <span>Thêm vào playlist</span>
                  </button>
                </li>
                <li>
                  <button className='flex w-full items-center gap-[14px] px-[14px] py-2 text-sm text-[#dadada] hover:bg-[#ffffff1a]'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={0}
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                      className='h-[18px] w-[18px]'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Sao chép link</span>
                  </button>
                </li>
                <li>
                  <Popover
                    isClick={false}
                    isHover={true}
                    placement='right-end'
                    NumberOffsetX={-14}
                    renderPopover={
                      <div className='w-[230px] rounded-lg bg-[#34224f] py-[10px] text-white shadow-[0_0_5px_0_rgba(0,0,0,.2)]'>
                        <ul>
                          <li>
                            <button className='flex w-full items-center gap-[15px] px-[14px] py-[10px] text-sm font-normal hover:bg-[#ffffff1a]'>
                              <i className='inline-block h-4 w-4 bg-fb-mini bg-cover bg-no-repeat text-base'></i>
                              <span>Facebook</span>
                            </button>
                          </li>
                          <li>
                            <button className='flex w-full items-center gap-[15px] px-[14px] py-[10px] text-sm font-normal hover:bg-[#ffffff1a]'>
                              <i className='inline-block h-4 w-4 bg-zalo-mini bg-cover bg-no-repeat text-base'></i>
                              <span>Zalo</span>
                            </button>
                          </li>
                          <li>
                            <button className='flex w-full items-center gap-[15px] px-[14px] py-[10px] text-sm font-normal hover:bg-[#ffffff1a]'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-4 w-[18px]'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
                                />
                              </svg>
                              <span>Mã nhúng</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    }
                  >
                    <button className='flex w-full items-center gap-[14px] px-[14px] py-2 text-sm text-[#dadada] hover:bg-[#ffffff1a]'>
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth={0}
                        viewBox='0 0 256 256'
                        className='h-[18px] w-[18px]'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M236.24,107.76l-80-80A6,6,0,0,0,146,32V74.2c-54.48,3.59-120.39,55-127.93,120.66a10,10,0,0,0,17.23,8h0C46.56,190.85,87,152.6,146,150.13V192a6,6,0,0,0,10.24,4.24l80-80A6,6,0,0,0,236.24,107.76ZM158,177.52V144a6,6,0,0,0-6-6c-27.73,0-54.76,7.25-80.32,21.55a193.38,193.38,0,0,0-40.81,30.65c4.7-26.56,20.16-52,44-72.27C98.47,97.94,127.29,86,152,86a6,6,0,0,0,6-6V46.49L223.51,112Z' />
                      </svg>
                      <span>Chia sẻ</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='ml-auto h-5 w-5'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                      </svg>
                    </button>
                  </Popover>
                </li>
              </ul>
              <p className='mt-[6px] pb-3 text-center text-[13px] font-medium text-[#ffffff80]'>
                Cung cấp bởi {dataInfoSong?.distributor}
              </p>
            </div>
          )
        }
      >
        <Tooltip text='Khác'>
          <button
            onClick={handleClick}
            className='invisible flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#ffffff1a] group-hover:visible'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke={'white'}
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </button>
        </Tooltip>
      </Popover>
    </div>
  )
}
