import classNames from 'classnames'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import CardItem from '~/components/CardItem'
import Popover from '~/components/Popover'
import Tooltip from '~/components/Tooltip'
import { AppContext } from '~/contexts/app.context'
import usePlayMusic from '~/hooks/usePlayMusic'
import { setHistoryToLS, setPlaylistToLS, setSongToLS } from '~/utils/song'

export default function AsideRight() {
  const [toggleButton, setToggleButton] = useState(true)
  const { stateIdSong, stateHistory, statePlaylist, setStatePlaylist, setStateHistory, setStatePlaySong } =
    useContext(AppContext)

  const { handleHookPlayMusic } = usePlayMusic()

  return (
    <>
      <div className='px-2 pb-2 pt-[14px]'>
        <div className='flex h-[42px] items-center gap-2'>
          <div className='flex flex-1 items-center rounded-full bg-[#2f2739] p-[3px] text-[12px]'>
            <button
              onClick={() => setToggleButton(true)}
              className={classNames(
                'flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 py-1 hover:text-white',
                {
                  'bg-[#6d6875] font-medium text-white': toggleButton,
                  'font-normal text-[#dadada]': !toggleButton
                }
              )}
            >
              Danh sách phát
            </button>
            <button
              onClick={() => setToggleButton(false)}
              className={classNames(
                'flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-[13px] py-1 hover:text-white',
                {
                  'bg-[#6d6875] font-medium text-white': !toggleButton,
                  'font-normal text-[#dadada]': toggleButton
                }
              )}
            >
              Nghe gần đây
            </button>
          </div>

          <Popover
            isClick={true}
            isHover={false}
            placement='bottom-end'
            renderPopover={
              <div className='w-48 rounded-lg bg-[#34224f] py-2 shadow-md'>
                <ul className='pl-[1px]'>
                  <li>
                    <button
                      onClick={() => {
                        setStatePlaylist([])
                        setPlaylistToLS([])
                        setSongToLS('')
                        setStatePlaySong(false)
                      }}
                      className='flex w-full justify-start px-4 py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                    >
                      Xóa danh sách phát
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setHistoryToLS([])
                        setStateHistory([])
                        setSongToLS('')
                        setStatePlaySong(false)
                      }}
                      className='flex w-full justify-start px-4 py-2 text-[14px] text-[#dadada] hover:bg-[#ffffff1a]'
                    >
                      Xóa lịch sử
                    </button>
                  </li>
                </ul>
              </div>
            }
          >
            <Tooltip text='Khác'>
              <button className='flex flex-shrink-0 items-center justify-center rounded-full bg-[#2f2739] p-[6px] hover:opacity-90'>
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
      </div>
      {statePlaylist.length <= 0 && toggleButton === true && (
        <>
          <div className='flex flex-col gap-[10px] px-5 pb-20 pt-[20px]'>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='flex items-start gap-2'>
                  <div className='h-10 w-10 rounded bg-[#231b2e]'></div>
                  <div className='flex flex-col gap-2'>
                    <div className='h-[10px] w-[230px] rounded-full bg-[#231b2e]'></div>
                    <div className='h-[10px] w-[140px] rounded-full bg-[#231b2e]'></div>
                  </div>
                </div>
              ))}
          </div>
          <div className='flex flex-col px-[33px] text-sm'>
            <span className='mb-5 mt-[6px] text-center text-white'>Khám phá thêm các bài hát mới của Zing MP3</span>
            <button className='flex items-center justify-center gap-2 rounded-full bg-[#9b4de0] px-[26px] py-[7px] text-white'>
              <svg viewBox='0 0 24 24' className='h-[18px] w-[18px] fill-white stroke-white stroke-1 hover:opacity-90'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
              Phát nhạc mới phát hành
            </button>
          </div>
        </>
      )}
      {toggleButton ? (
        <>
          {statePlaylist ? (
            <div className='mb-[110px] px-2'>
              {statePlaylist.map((item) => (
                <div
                  aria-hidden
                  key={item.encodeId}
                  onDoubleClick={() => {
                    handleHookPlayMusic({
                      songId: item.encodeId,
                      data: statePlaylist,
                      dataItem: item,
                      playlistId: item.encodeId
                    })
                  }}
                >
                  <CardItem
                    className={`group col-span-1 flex h-[56px] items-center gap-[10px] rounded p-[10px] ${
                      stateIdSong !== item.encodeId ? 'hover:bg-[#2f2739]' : ''
                    }`}
                    dataItem={item}
                    isDate={false}
                    hideAlbum
                    hideTime={true}
                    hideLike={false}
                    classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                    customBgActive='bg-[#9b4de0]'
                    dataPlaylist={statePlaylist}
                    playlistId={''}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className='ml-5 mt-5 h-[240px] w-[285px] bg-cover bg-no-repeat opacity-50 [background-position-x:50%] [background-position-y:cover]'
              style={{
                backgroundImage: `url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/bg-empty-dark.svg)`
              }}
            />
          )}
        </>
      ) : (
        <>
          {stateHistory ? (
            <div className='mb-[110px] px-2'>
              {stateHistory.map((item) => (
                <div
                  aria-hidden
                  key={item.encodeId}
                  onDoubleClick={() => {
                    handleHookPlayMusic({
                      songId: item.encodeId,
                      data: stateHistory,
                      dataItem: item,
                      playlistId: item.encodeId
                    })
                  }}
                >
                  <CardItem
                    // isHistorySetPlaylist={true}
                    className={`group col-span-1 flex h-[56px] items-center gap-[10px] rounded p-[10px] ${
                      stateIdSong !== item.encodeId ? 'hover:bg-[#2f2739]' : ''
                    }`}
                    dataItem={item}
                    isDate={false}
                    hideAlbum
                    hideTime={true}
                    hideLike={false}
                    classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                    customBgActive='bg-[#9b4de0]'
                    dataPlaylist={stateHistory}
                    playlistId={''}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className='ml-5 mt-5 h-[240px] w-[285px] bg-cover bg-no-repeat opacity-50 [background-position-x:50%] [background-position-y:cover]'
              style={{
                backgroundImage: `url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/bg-empty-dark.svg)`
              }}
            />
          )}
        </>
      )}
    </>
  )
}
