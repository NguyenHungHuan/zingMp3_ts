import Popover from '../Popover'
import { Link } from 'react-router-dom'
import BoxItem from '../BoxItem'
import Artist from '../Artist'
import 'moment/dist/locale/vi'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { useState, Fragment, useContext, useMemo } from 'react'
import { formatNumberSocial } from '~/utils/formatNumber'
import classNames from 'classnames'
import Tooltip from '../Tooltip'
import PATH from '~/constants/path'
import useGenerateLink from '~/hooks/useGenerateLink'
import { ItemSections } from '~/types/home'
import { setPlaylistToLS, setSongToLS } from '~/utils/song'
import { AppContext } from '~/contexts/app.context'
import toast from 'react-hot-toast'
import useCopyLink from '~/hooks/useCopyLink'
interface Props {
  dataItem: ItemSections
  classNameFigure?: string
}

export default function CardItemPlayer({
  dataItem,
  classNameFigure = 'relative cursor-pointer w-[60px] h-[60px] object-cover rounded overflow-hidden flex-shrink-0'
}: Props) {
  const [active, setActive] = useState(false)
  const [openLyric, setOpenLyric] = useState(false)
  const [idSong, setIdSong] = useState('')
  const { copyToClipboard } = useCopyLink()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    return setIdSong(dataItem.encodeId)
  }
  const { setStateIdSong, setStatePlaySong, statePlaySong, statePlaylist, setStatePlaylist } = useContext(AppContext)
  const notify = () => toast('Chức năng đang phát triển.')

  const { data, isSuccess } = useQuery({
    queryKey: ['infoSong', idSong],
    queryFn: () => zingmp3Api.getSongInfo({ id: idSong }),
    staleTime: 3 * 60 * 1000,
    enabled: idSong !== ''
  })
  const dataInfoSong = useMemo(() => data?.data.data, [data])
  const { idPlaylist, namePlaylist } = useGenerateLink(
    dataInfoSong && dataInfoSong.album ? dataInfoSong.album.link : ''
  )

  const { data: dataLyric } = useQuery({
    queryKey: ['lyric', idSong],
    queryFn: () => zingmp3Api.getLyricSong({ id: idSong }),
    staleTime: 3 * 60 * 1000,
    enabled: idSong !== ''
  })
  const dataLyricSong = useMemo(() => dataLyric?.data.data, [dataLyric])

  const handleLyric = () => {
    setOpenLyric(true)
  }

  const handlePlay = (songId: string) => {
    if (statePlaySong === true) {
      setStatePlaySong(false)
    }
    if (statePlaySong === false) {
      setSongToLS(songId)
      setStateIdSong(songId)
      setStatePlaySong(true)
    }
  }

  const handleAddSongToPlaylist = (newSong: ItemSections) => {
    const currentPlaylist = statePlaylist ? statePlaylist : []
    if (!currentPlaylist.some((song) => song.encodeId === newSong.encodeId)) {
      const updatedPlaylist = [...currentPlaylist, newSong]
      setPlaylistToLS(updatedPlaylist)
      setStatePlaylist(updatedPlaylist)
      toast('Đã thêm vào danh sách.', {
        style: {
          borderBottom: '4px solid #41f315de'
        }
      })
    } else {
      toast('Đã có trong danh sách.')
    }
  }

  return (
    <div className='col-span-1 flex h-20 items-center gap-1 rounded-lg p-[10px] pl-0'>
      <div className='flex items-center gap-[10px] pr-4'>
        <div aria-hidden onMouseDown={() => handlePlay(dataItem.encodeId)}>
          <BoxItem
            id={dataItem.encodeId}
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
        </div>
        <div className='flex flex-col break-words font-medium'>
          <div className='flex items-center'>
            <span
              className={classNames('line-clamp-1 cursor-default text-[14px] text-white', {
                'opacity-50': dataItem.streamingStatus === 2
              })}
            >
              {dataItem.title}
            </span>
            {dataItem.streamingStatus === 2 && (
              <i className='ml-2 inline-block flex-shrink-0 leading-[66%]'>
                <svg width={56} height={14} viewBox='0 0 56 14' fill='none'>
                  <rect width={56} height={14} rx={4} fill='#E5AC1A' />
                  <g clipPath='url(#clip0_3541_3928)'>
                    <path
                      d='M9.89231 4.22549C9.54389 4.07843 9.12579 4 8.64796 4H6.3086C6.219 4 6.14932 4.02941 6.08959 4.08824C6.02986 4.14706 6 4.21569 6 4.30392V9.68627C6 9.77451 6.02986 9.85294 6.08959 9.90196C6.14932 9.96078 6.219 9.9902 6.3086 9.9902H7.43348C7.52308 9.9902 7.60271 9.96078 7.65249 9.91177C7.72217 9.85294 7.75204 9.77451 7.75204 9.68627V7.97059H8.64796C9.12579 7.97059 9.53394 7.90196 9.89231 7.76471C10.2507 7.62745 10.5394 7.40196 10.7385 7.11765C10.9475 6.82353 11.0471 6.45098 11.0471 6.0098C11.0471 5.56863 10.9475 5.18627 10.7385 4.88235C10.5394 4.58824 10.2507 4.36275 9.89231 4.21569V4.22549ZM9.29502 6C9.29502 6.21569 9.23529 6.37255 9.11584 6.48039C8.99638 6.58824 8.82715 6.63725 8.6181 6.63725H7.74208V5.35294H8.6181C8.86697 5.35294 9.04615 5.41176 9.1457 5.52941C9.2552 5.65686 9.30498 5.80392 9.30498 6H9.29502Z'
                      fill='#FEFFFF'
                    />
                    <path
                      d='M16.5818 7.63725C16.8606 7.4902 17.0995 7.29412 17.2787 7.03922C17.4877 6.7549 17.5873 6.40196 17.5873 5.9902C17.5873 5.36275 17.3583 4.86275 16.9203 4.51961C16.4922 4.17647 15.895 4 15.1583 4H12.8787C12.7891 4 12.7194 4.02941 12.6597 4.08824C12.5999 4.14706 12.5701 4.21569 12.5701 4.30392V9.68627C12.5701 9.77451 12.5999 9.85294 12.6597 9.90196C12.7194 9.96078 12.7891 9.9902 12.8787 9.9902H13.9538C14.0434 9.9902 14.123 9.96078 14.1728 9.90196C14.2325 9.84314 14.2624 9.77451 14.2624 9.68627V7.94118H14.9592L15.885 9.70588C15.9149 9.7549 15.9547 9.81373 16.0144 9.88235C16.0841 9.95098 16.1836 9.9902 16.323 9.9902H17.428C17.5076 9.9902 17.5674 9.96078 17.6271 9.91177C17.6868 9.85294 17.7167 9.78431 17.7167 9.71569C17.7167 9.67647 17.7067 9.62745 17.6769 9.57843L16.5719 7.62745L16.5818 7.63725ZM15.8352 5.97059C15.8352 6.16667 15.7755 6.31373 15.666 6.42157C15.5565 6.52941 15.3873 6.58824 15.1483 6.58824H14.2823V5.35294H15.1483C15.3873 5.35294 15.5664 5.41176 15.666 5.51961C15.7755 5.63725 15.8352 5.78431 15.8352 5.97059Z'
                      fill='#FEFFFF'
                    />
                    <path
                      d='M23.5801 8.60784H20.9421V7.64706H23.3312C23.4208 7.64706 23.5005 7.61765 23.5602 7.55882C23.6199 7.5 23.6398 7.42157 23.6398 7.34314V6.61765C23.6398 6.52941 23.61 6.46078 23.5602 6.40196C23.5005 6.33333 23.4208 6.30392 23.3312 6.30392H20.9421V5.38235H23.5104C23.6 5.38235 23.6697 5.35294 23.7294 5.29412C23.7892 5.23529 23.819 5.16667 23.819 5.07843V4.30392C23.819 4.21569 23.7892 4.14706 23.7294 4.08824C23.6697 4.02941 23.6 4 23.5104 4H19.6082C19.5186 4 19.4489 4.02941 19.3892 4.08824C19.3294 4.14706 19.2996 4.21569 19.2996 4.30392V9.68627C19.2996 9.77451 19.3294 9.85294 19.3892 9.90196C19.4489 9.96078 19.5186 9.9902 19.6082 9.9902H23.5801C23.6697 9.9902 23.7394 9.96078 23.7991 9.90196C23.8588 9.84314 23.8887 9.77451 23.8887 9.68627V8.91177C23.8887 8.82353 23.8588 8.7549 23.7991 8.69608C23.7394 8.63725 23.6697 8.60784 23.5801 8.60784Z'
                      fill='#FEFFFF'
                    />
                    <path
                      d='M31.2054 4H30.3095C30.19 4 30.0904 4.03922 30.0208 4.10784C29.9809 4.15686 29.9411 4.19608 29.9212 4.23529L28.5375 6.69608L27.1638 4.2451C27.1638 4.2451 27.104 4.15686 27.0542 4.10784C26.9945 4.03922 26.895 4 26.7755 4H25.8696C25.79 4 25.7203 4.02941 25.6506 4.08824C25.5909 4.14706 25.561 4.21569 25.561 4.30392V9.68627C25.561 9.77451 25.5909 9.85294 25.6506 9.91177C25.7104 9.97059 25.79 9.9902 25.8696 9.9902H26.8751C26.9647 9.9902 27.0443 9.96078 27.0941 9.90196C27.1538 9.84314 27.1837 9.77451 27.1837 9.68627V6.97059L27.9402 8.36274C27.9701 8.42157 28.0199 8.48039 28.0696 8.51961C28.1294 8.57843 28.219 8.59804 28.3185 8.59804H28.7565C28.8561 8.59804 28.9457 8.56863 29.0054 8.51961C29.0651 8.47059 29.1049 8.41176 29.1248 8.36274L29.8814 6.97059V9.68627C29.8814 9.77451 29.9113 9.85294 29.971 9.91177C30.0307 9.97059 30.1104 9.9902 30.1999 9.9902H31.1954C31.285 9.9902 31.3647 9.96078 31.4144 9.91177C31.4841 9.85294 31.514 9.77451 31.514 9.68627V4.30392C31.514 4.21569 31.4841 4.13725 31.4144 4.08824C31.3547 4.02941 31.285 4 31.1954 4H31.2054Z'
                      fill='#FEFFFF'
                    />
                    <path
                      d='M34.8488 4H33.7239C33.6343 4 33.5546 4.02941 33.5049 4.08824C33.4451 4.14706 33.4153 4.21569 33.4153 4.30392V9.68627C33.4153 9.77451 33.4451 9.85294 33.5049 9.90196C33.5646 9.96078 33.6343 9.9902 33.7239 9.9902H34.8488C34.9384 9.9902 35.018 9.96078 35.0678 9.90196C35.1275 9.84314 35.1574 9.77451 35.1574 9.68627V4.30392C35.1574 4.21569 35.1275 4.14706 35.0678 4.08824C35.008 4.02941 34.9384 4 34.8488 4Z'
                      fill='#FEFFFF'
                    />
                    <path
                      d='M41.8969 4H40.8118C40.7322 4 40.6625 4.02941 40.5928 4.08824C40.5331 4.14706 40.5032 4.21569 40.5032 4.30392V7.62745C40.5032 7.95098 40.4236 8.19608 40.2643 8.36274C40.105 8.51961 39.896 8.59804 39.6073 8.59804C39.3186 8.59804 39.0896 8.51961 38.9403 8.36274C38.781 8.20588 38.7114 7.95098 38.7114 7.62745V4.30392C38.7114 4.21569 38.6815 4.14706 38.6218 4.08824C38.562 4.02941 38.4923 4 38.4028 4H37.3276C37.238 4 37.1584 4.02941 37.1086 4.08824C37.0489 4.14706 37.019 4.21569 37.019 4.30392V7.63725C37.019 8.16667 37.1285 8.61765 37.3376 8.97059C37.5566 9.31373 37.8652 9.57843 38.2534 9.7549C38.6417 9.92157 39.0996 10 39.6172 10C40.1349 10 40.5928 9.92157 40.981 9.7549C41.3693 9.58824 41.6779 9.32353 41.8969 8.97059C42.1159 8.61765 42.2154 8.16667 42.2154 7.63725V4.30392C42.2154 4.21569 42.1856 4.13725 42.1159 4.08824C42.0561 4.02941 41.9865 4 41.9068 4H41.8969Z'
                      fill='#FEFFFF'
                    />
                    <path
                      d='M49.9005 4.08824C49.8407 4.02941 49.771 4 49.6815 4H48.7855C48.6561 4 48.5665 4.03922 48.5068 4.10784C48.457 4.15686 48.4272 4.19608 48.4072 4.23529L47.0235 6.69608L45.6398 4.2451C45.6398 4.2451 45.5801 4.15686 45.5303 4.10784C45.4706 4.03922 45.371 4 45.2516 4H44.3457C44.2661 4 44.1864 4.02941 44.1267 4.08824C44.067 4.14706 44.0371 4.21569 44.0371 4.30392V9.68627C44.0371 9.77451 44.067 9.85294 44.1267 9.91177C44.1864 9.97059 44.2661 9.9902 44.3457 9.9902H45.3511C45.4407 9.9902 45.5204 9.96078 45.5701 9.90196C45.6299 9.84314 45.6597 9.77451 45.6597 9.68627V6.97059L46.4163 8.36274C46.4462 8.42157 46.4959 8.48039 46.5457 8.51961C46.6054 8.57843 46.695 8.59804 46.7946 8.59804H47.2326C47.3321 8.59804 47.4217 8.56863 47.4815 8.51961C47.5412 8.47059 47.581 8.41176 47.6009 8.36274L48.3575 6.97059V9.68627C48.3575 9.77451 48.3873 9.85294 48.4471 9.91177C48.5068 9.97059 48.5864 9.9902 48.676 9.9902H49.6715C49.7611 9.9902 49.8407 9.96078 49.8905 9.91177C49.9602 9.85294 49.99 9.77451 49.99 9.68627V4.30392C49.99 4.21569 49.9602 4.13725 49.8905 4.08824H49.9005Z'
                      fill='#FEFFFF'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_3541_3928'>
                      <rect width={44} height={6} fill='white' transform='translate(6 4)' />
                    </clipPath>
                  </defs>
                </svg>
              </i>
            )}
          </div>
          {dataItem.artists ? (
            <Artist
              artistsData={dataItem.artists}
              className='line-clamp-1 overflow-hidden text-[12px] text-[#ffffff80]'
            />
          ) : (
            <span className='line-clamp-1 block overflow-hidden text-ellipsis break-words text-[12px] font-normal text-[#ffffff80]'>
              {dataItem.artistsNames}
            </span>
          )}
        </div>
      </div>
      <Tooltip text='Thêm vào thư viện'>
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            return notify()
          }}
          className='flex h-9 w-9 items-center justify-center rounded-full fill-white hover:bg-[#ffffff1a]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 22'
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
                    <div className='p-[15px] text-[12px] font-normal uppercase leading-5 text-[#ffffff80]'>
                      <h3>Nghệ sĩ</h3>
                      <Artist
                        isPopoverDetail={false}
                        artistsData={dataItem.artists}
                        className='block break-words text-[14px] capitalize text-white'
                        classNameText='inline break-words hover:text-[#c273ed] hover:no-underline'
                      />
                      {dataInfoSong && dataInfoSong.album && (
                        <>
                          <h3>Album</h3>
                          <Link
                            to={`${PATH.album}/${namePlaylist}/${idPlaylist}`}
                            className='block text-[14px] capitalize text-white hover:text-[#c273ed]'
                          >
                            {dataInfoSong?.album.title}
                          </Link>
                        </>
                      )}
                      {dataInfoSong && dataInfoSong?.composers?.length > 0 && (
                        <>
                          <h3>Sáng tác</h3>
                          {dataInfoSong?.composers?.map((item, index) => (
                            <Fragment key={item.id}>
                              {dataInfoSong?.composers.length > 1 && index !== 0 && ', '}
                              <Link
                                to={`${PATH.ngheSi}/${item.alias}`}
                                className='inline text-[14px] capitalize text-white hover:text-[#c273ed]'
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
                            className='inline text-[14px] capitalize text-white hover:text-[#c273ed]'
                            title={item.name}
                          >
                            {item.name}
                          </Link>
                        </Fragment>
                      ))}
                      <h3>Cung cấp bởi</h3>
                      <span className='text-[14px] capitalize text-white'>{dataInfoSong?.distributor}</span>
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
                        className='mb-[2px] line-clamp-1 text-[14px] font-medium text-white hover:text-[#c273ed]'
                      >
                        {dataItem.title}
                      </Link>
                      {dataInfoSong && dataInfoSong.listen !== 0 ? (
                        <div className='flex items-center gap-[10px] text-[12px] font-normal text-[#a0a0a0]'>
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
                  <button
                    onClick={handleLyric}
                    className='flex max-w-[80px] flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] text-white hover:bg-[#ffffff1a]'
                  >
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

                  {openLyric && dataLyricSong && (
                    <div
                      className='fixed inset-0 z-50 flex cursor-default items-center justify-center bg-[#000000cc]'
                      aria-hidden
                      onClick={() => setOpenLyric((prev) => !prev)}
                    >
                      <div
                        className='h-[384px] w-[540px] rounded-lg bg-[#34224f] p-5'
                        aria-hidden
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className='relative'>
                          <h3 className='mb-[10px] text-[16px] font-bold uppercase text-white'>Lời bài hát</h3>
                          <p className='h-[248px] overflow-auto rounded border border-[#ffffff1a] bg-[#ffffff08] px-[14px] py-3 text-white'>
                            {dataLyricSong.sentences ? (
                              dataLyricSong.sentences.map((item, index) => (
                                <span key={index} className='mb-[5px] block text-[14px] font-medium'>
                                  {item.words.map((word) => `${word.data} `)}
                                </span>
                              ))
                            ) : (
                              <span className='flex h-full w-full items-center justify-center'>
                                Lời bài hát đang được cập nhật
                              </span>
                            )}
                          </p>
                        </div>
                        <div className='flex w-full justify-end'>
                          <button
                            onClick={() => setOpenLyric((prev) => !prev)}
                            className='mt-5 rounded-full border border-[#ffffff1a] bg-[#ffffff1a] px-6 py-[9px] text-[14px] uppercase text-white hover:opacity-80'
                          >
                            Đóng
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => notify()}
                    className='flex max-w-[80px] flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[10px] text-white hover:bg-[#ffffff1a]'
                  >
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
                  <button
                    onClick={() => notify()}
                    className='flex w-full items-center gap-[14px] px-[14px] py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                  >
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
                  <button
                    onClick={() => handleAddSongToPlaylist(dataItem)}
                    className='flex w-full items-center gap-[14px] px-[14px] py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                  >
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
                  <button
                    onClick={() => copyToClipboard(`${PATH.song}/${dataItem.alias}/${dataItem.encodeId}`)}
                    className='flex w-full items-center gap-[14px] px-[14px] py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                  >
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
            onClick={(e) => handleClick(e)}
            className='flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#ffffff1a]'
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
