import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '~/contexts/app.context'
import {
  getHistoryFromLS,
  getPlaylistFromLS,
  getSongFromLS,
  getVolumeFromLS,
  setHistoryToLS,
  setSongToLS,
  setStateAsideRightToLS,
  setVolumeToLS
} from '~/utils/song'
import Tooltip from '../Tooltip'
import moment from 'moment'
import CardItemPlayer from '~/components/Player/CardItemPlayer'
import { ItemSections } from '~/types/home'
import { useNavigate } from 'react-router-dom'
import PATH from '~/constants/path'

const Player = () => {
  const audioEl = useRef(new Audio())
  const progressRef = useRef<HTMLInputElement>(null)
  const [currentSecond, setCurrentSecond] = useState<{ [key: string]: number }>({})
  const [audioValue, setAudioValue] = useState<number>(0)
  const [volume, setVolume] = useState<number>(getVolumeFromLS() ? Number(getVolumeFromLS()) : 100)
  const [stateShuffle, setStateShuffle] = useState<boolean>(false)
  const [stateRepeat, setStateRepeat] = useState<boolean>(false)
  const {
    stateIdSong,
    setStateIdSong,
    statePlaySong,
    setStatePlaySong,
    stateAsideRight,
    setStateAsideRight,
    setStateHistory,
    stateHistory
  } = useContext(AppContext)
  const idSong = getSongFromLS()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['infoSong', stateIdSong],
    queryFn: () => zingmp3Api.getSongInfo({ id: stateIdSong }),
    staleTime: 3 * 60 * 1000,
    enabled: stateIdSong !== ''
  })
  const dataInfoSong = data?.data.data

  const { data: dataSong } = useQuery({
    queryKey: ['audioSong', stateIdSong],
    queryFn: () => zingmp3Api.getSong({ id: stateIdSong }),
    staleTime: 3 * 60 * 1000,
    enabled: stateIdSong !== ''
  })
  const dataAudioSong = dataSong?.data.data

  useEffect(() => {
    if (idSong !== '') {
      setStateIdSong(idSong)
    }
  }, [])

  useEffect(() => {
    if (idSong !== '') {
      setStateIdSong(idSong)
    }
    if (idSong === '') {
      setStateIdSong('')
    }
  }, [idSong, setStateIdSong])

  useEffect(() => {
    if (dataAudioSong && statePlaySong && dataInfoSong) {
      if (audioEl.current.src === dataAudioSong?.[128]) {
        audioEl.current.play()
      } else {
        audioEl.current.pause()
        audioEl.current.src = dataAudioSong?.[128]
        audioEl.current.load()
        audioEl.current.volume = volume / 100
        audioEl.current.currentTime = currentSecond[dataInfoSong.encodeId] || 0
        audioEl.current.play()
      }
    }

    if (!statePlaySong) {
      audioEl.current.pause()
    }
  }, [dataAudioSong, statePlaySong, dataInfoSong])

  useEffect(() => {
    const intervalDuration = setInterval(() => {
      if (progressRef.current && dataInfoSong) {
        setCurrentSecond({
          [dataInfoSong.encodeId]: Math.round(audioEl.current.currentTime)
        })
        setAudioValue(Math.round((audioEl.current.currentTime / dataInfoSong.duration) * 100))
      }
    }, 100)

    if (statePlaySong) {
      intervalDuration
    }
    if (!statePlaySong) {
      clearInterval(intervalDuration)
    }
    return () => {
      clearInterval(intervalDuration)
    }
  }, [statePlaySong, dataInfoSong])

  useEffect(() => {
    if (dataInfoSong && idSong.length > 0 && !stateHistory.some((item) => item.encodeId === dataInfoSong?.encodeId)) {
      setStateHistory((prev) =>
        !prev.some((item) => item.encodeId === idSong) ? [...prev, dataInfoSong as any] : prev
      )
      const historyPrev = getHistoryFromLS()
      !historyPrev?.some((item: any) => item.encodeId === idSong) && setHistoryToLS([...historyPrev, dataInfoSong])
    }
  }, [dataInfoSong, setStateHistory, stateHistory, idSong])

  useEffect(() => {
    if (dataInfoSong) {
      if (audioEl.current.ended) {
        if (stateRepeat === true) {
          audioEl.current.pause()
          audioEl.current.load()
          audioEl.current.currentTime = 0
          audioEl.current.play()
        } else if (stateRepeat === false && getPlaylistFromLS().length > 1) {
          handleNextSong()
        } else {
          setStatePlaySong(false)
        }
      }
    }
  }, [currentSecond, dataInfoSong, setStatePlaySong])

  const handleTogglePlay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (getPlaylistFromLS().length === 1) {
      if (statePlaySong) {
        setStatePlaySong(false)
      } else if (dataInfoSong && audioEl.current.ended && statePlaySong === false) {
        setStatePlaySong(true)
        audioEl.current.pause()
        audioEl.current.load()
        audioEl.current.currentTime = 0
        audioEl.current.play()
      } else {
        setStatePlaySong(true)
      }
    } else {
      if (statePlaySong) {
        setStatePlaySong(false)
      } else {
        setStatePlaySong(true)
      }
    }
  }

  const handleNextSong = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault()
    e?.stopPropagation()
    const dataPlaylist = getPlaylistFromLS() as Array<ItemSections>
    const indexSong = dataPlaylist.findIndex((item) => item.encodeId === stateIdSong)
    if (stateShuffle === false) {
      if (indexSong === dataPlaylist.length - 1) {
        setStateIdSong(dataPlaylist[0].encodeId)
        setSongToLS(dataPlaylist[0].encodeId)
        setStatePlaySong(true)
      } else {
        setStateIdSong(dataPlaylist[indexSong + 1].encodeId)
        setSongToLS(dataPlaylist[indexSong + 1].encodeId)
        setStatePlaySong(true)
      }
    } else {
      const randomSong = Math.floor(Math.random() * dataPlaylist.length)
      setStateIdSong(dataPlaylist[randomSong].encodeId)
      setSongToLS(dataPlaylist[randomSong].encodeId)
      setStatePlaySong(true)
    }
  }

  const handlePreviousSong = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const dataPlaylist = getPlaylistFromLS() as Array<ItemSections>
    const indexSong = dataPlaylist.findIndex((item) => item.encodeId === stateIdSong)
    if (stateShuffle === false) {
      if (indexSong === 0) {
        setStateIdSong(dataPlaylist[dataPlaylist.length - 1].encodeId)
        setSongToLS(dataPlaylist[dataPlaylist.length - 1].encodeId)
        setStatePlaySong(true)
      } else {
        setStateIdSong(dataPlaylist[indexSong - 1].encodeId)
        setSongToLS(dataPlaylist[indexSong - 1].encodeId)
        setStatePlaySong(true)
      }
    } else {
      const randomSong = Math.floor(Math.random() * dataPlaylist.length)
      setStateIdSong(dataPlaylist[randomSong].encodeId)
      setSongToLS(dataPlaylist[randomSong].encodeId)
      setStatePlaySong(true)
    }
  }

  const handleShuffleSong = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setStateShuffle(!stateShuffle)
  }

  const handleRepeatSong = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setStateRepeat(!stateRepeat)
  }

  return (
    <div
      aria-hidden
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        return navigate(`${PATH.song}/${dataInfoSong?.alias}/${dataInfoSong?.encodeId}`)
      }}
      className='absolute bottom-0 z-[120] h-[90px] w-full cursor-pointer border-t border-[#ffffff1a] bg-[#130c1c] px-5'
    >
      <div className='grid h-full grid-cols-7 items-center justify-between'>
        <div
          aria-hidden
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className='col-span-2 flex h-full items-center pr-5'
        >
          {dataInfoSong && (
            <CardItemPlayer
              key={dataInfoSong.encodeId}
              dataItem={dataInfoSong as any}
              classNameFigure='relative cursor-pointer w-[64px] h-[64px] object-cover rounded overflow-hidden flex-shrink-0'
            />
          )}
        </div>
        <div className='col-span-3 flex h-full flex-1 flex-col items-center justify-center gap-2'>
          <div className='flex items-center gap-5'>
            <Tooltip text='Bật phát ngẫu nhiên'>
              <button onClick={(e) => handleShuffleSong(e)} className='rounded-full p-1 hover:bg-[#ffffff1a]'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth={0}
                  viewBox='0 0 256 256'
                  className={`h-[22px] w-[22px] ${stateShuffle ? 'fill-[#c273ed]' : 'fill-white'}`}
                >
                  <path d='M237.66,178.34a8,8,0,0,1,0,11.32l-24,24A8,8,0,0,1,200,208V192a72.15,72.15,0,0,1-57.65-30.14l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.08,56.08,0,0,0,200,176V160a8,8,0,0,1,13.66-5.66ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.08,56.08,0,0,1,200,80V96a8,8,0,0,0,13.66,5.66l24-24a8,8,0,0,0,0-11.32l-24-24A8,8,0,0,0,200,48V64a72.15,72.15,0,0,0-57.65,30.14l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z' />
                </svg>
              </button>
            </Tooltip>
            <button onClick={(e) => handlePreviousSong(e)} className='rounded-full p-1 hover:bg-[#ffffff1a]'>
              <svg className='h-6 w-6 rotate-180 fill-white stroke-none' viewBox='0 0 24 24'>
                <path d='M16 12.6667L5.77735 19.4818C5.54759 19.6349 5.23715 19.5729 5.08397 19.3431C5.02922 19.261 5 19.1645 5 19.0657V4.93426C5 4.65812 5.22386 4.43426 5.5 4.43426C5.59871 4.43426 5.69522 4.46348 5.77735 4.51823L16 11.3333V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V12.6667Z' />
              </svg>
            </button>
            {statePlaySong === true ? (
              <button
                onClick={(e) => handleTogglePlay(e)}
                className='rounded-full border border-white p-1 text-white hover:border-[#c273ed] hover:text-[#c273ed]'
              >
                <svg
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='currentColor'
                  className='h-[26px] w-[26px]'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25v13.5m-7.5-13.5v13.5' />
                </svg>
              </button>
            ) : (
              <button
                onClick={(e) => handleTogglePlay(e)}
                className='rounded-full border border-white p-1 text-white hover:border-[#c273ed] hover:text-[#c273ed]'
              >
                <svg
                  fill='currentColor'
                  viewBox='0 0 23 22'
                  strokeWidth={1}
                  stroke='currentColor'
                  className='h-[26px] w-[26px] pb-[1px] pl-[3px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                  />
                </svg>
              </button>
            )}
            <button onClick={(e) => handleNextSong(e)} className='rounded-full p-1 hover:bg-[#ffffff1a]'>
              <svg className='h-6 w-6 fill-white stroke-none' viewBox='0 0 24 24'>
                <path d='M16 12.6667L5.77735 19.4818C5.54759 19.6349 5.23715 19.5729 5.08397 19.3431C5.02922 19.261 5 19.1645 5 19.0657V4.93426C5 4.65812 5.22386 4.43426 5.5 4.43426C5.59871 4.43426 5.69522 4.46348 5.77735 4.51823L16 11.3333V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V12.6667Z' />
              </svg>
            </button>
            <Tooltip text='Bật phát lại tất cả'>
              <button onClick={(e) => handleRepeatSong(e)} className='rounded-full p-1 hover:bg-[#ffffff1a]'>
                <svg
                  strokeWidth={0.5}
                  viewBox='0 0 24 24'
                  className={`h-[22px] w-[22px] ${
                    stateRepeat ? 'fill-[#c273ed] stroke-[#c273ed]' : 'fill-white stroke-white'
                  }`}
                >
                  <g id='Repeat'>
                    <path d='M2.078,17.562c-0.01,-0.039 -0.016,-0.08 -0.016,-0.123c0,-0.138 0.056,-0.263 0.147,-0.353c0.008,-0.009 1.416,-1.417 2,-2c0.198,-0.198 0.507,-0.183 0.707,-0c0.199,0.183 0.185,0.522 -0,0.707l-1.147,1.146l15.669,0c0.828,0 1.5,-0.671 1.5,-1.5l0,-3.439c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5l0,3.439c0,1.381 -1.12,2.5 -2.5,2.5l-15.669,0l1.147,1.147c0.198,0.198 0.183,0.507 -0,0.707c-0.183,0.199 -0.522,0.185 -0.707,-0l-2,-2c-0.066,-0.063 -0.11,-0.143 -0.131,-0.231Zm19.845,-11.105c0.01,0.039 0.015,0.08 0.015,0.122c0,0.138 -0.056,0.263 -0.147,0.354c-0.008,0.008 -1.416,1.417 -2,2c-0.197,0.198 -0.507,0.183 -0.707,-0c-0.199,-0.183 -0.185,-0.522 0,-0.707l1.147,-1.147l-15.669,0c-0.828,0 -1.5,0.672 -1.5,1.5l0,3.439c-0,0.276 -0.224,0.5 -0.5,0.5c-0.276,0 -0.5,-0.224 -0.5,-0.5l0,-3.439c0,-1.381 1.12,-2.5 2.5,-2.5l15.669,0l-1.146,-1.146c-0.198,-0.198 -0.183,-0.507 -0,-0.707c0.183,-0.199 0.522,-0.185 0.707,-0l2,2c0.065,0.063 0.11,0.143 0.131,0.231Z' />
                  </g>
                </svg>
              </button>
            </Tooltip>
          </div>
          <div className='flex w-[38vw] items-center gap-[10px] text-[12px] font-medium'>
            <span className='w-10 text-[#ffffffaa]'>
              {moment.utc(audioEl.current.currentTime * 1000).format('mm:ss')}
            </span>
            <input
              className='flex-1'
              type='range'
              min={0}
              max={100}
              step={1}
              style={{ backgroundSize: `${audioValue}% 100%` }}
              value={audioValue}
              ref={progressRef}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                dataInfoSong &&
                  setCurrentSecond({
                    [dataInfoSong.encodeId]: Math.round((Number(e.target.value) / 100) * audioEl.current.duration)
                  })
                setAudioValue(Number(e.target.value))
                if (progressRef.current) {
                  audioEl.current.currentTime = Math.round((Number(e.target.value) / 100) * audioEl.current.duration)
                }
              }}
            />
            {dataInfoSong && (
              <span className='w-10 text-white'>
                {Math.trunc(dataInfoSong.duration / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(dataInfoSong.duration % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>
        <div className='col-span-2 flex h-full items-center justify-end gap-5'>
          <div className='flex items-center gap-1 border-r border-[#ffffff1a] pr-5'>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (volume === 0) {
                  setVolume(Number(getVolumeFromLS()))
                  audioEl.current.volume = Number(getVolumeFromLS()) / 100
                } else {
                  setVolume(0)
                  audioEl.current.volume = 0
                }
              }}
              className='rounded-full p-[6px] text-white hover:bg-[#ffffff1a]'
            >
              {volume !== 0 ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-[22px] w-[22px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-[22px] w-[22px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
                  />
                </svg>
              )}
            </button>
            <input
              type='range'
              style={{ backgroundSize: `${(volume * 100) / 100}% 100%` }}
              min={0}
              max={100}
              step={1}
              value={volume}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setVolume(Number(e.target.value))
                setVolumeToLS(e.target.value)
                audioEl.current.volume = Number(e.target.value) / 100
              }}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (stateAsideRight === true) {
                setStateAsideRightToLS(false)
              } else {
                setStateAsideRightToLS(true)
              }
              setStateAsideRight((prev) => !prev)
            }}
            className={`rounded ${stateAsideRight ? 'bg-[#9b4de0]' : 'bg-[#ffffff33]'} p-[6px] text-white`}
          >
            <svg
              focusable='false'
              data-prefix='fad'
              data-icon='list-music'
              className='h-[18px] w-[18px]'
              role='img'
              viewBox='0 0 512 512'
            >
              <g>
                <path
                  className='fa-secondary'
                  fill='currentColor'
                  d='M31.97 255.1h224.1C273.7 255.1 288 241.7 288 224c0-17.66-14.32-32.02-31.97-32.02H31.97C14.32 191.1 0 206.3 0 223.1C0 241.6 14.32 255.1 31.97 255.1zM31.97 127.1h224.1C273.7 127.1 288 113.6 288 95.99c0-17.66-14.31-32.01-31.97-32.01H31.97C14.32 63.98 0 78.31 0 95.97C0 113.6 14.32 127.1 31.97 127.1zM128 319.1H31.97C14.32 319.1 0 334.3 0 351.1c0 17.66 14.32 32.02 31.97 32.02H128C145.7 383.1 160 369.7 160 352C160 334.4 145.7 319.1 128 319.1z'
                />
                <path
                  fill='currentColor'
                  d='M471 1.323l-96.63 28.5C361.1 33.95 352 46.33 352 60.33v299.7c-15.5-5.251-31.62-8.001-48-8.001c-61.88 0-112 35.88-112 80.01S242.1 512 304 512s112-35.88 112-80.01V148.1l73-21.38C502.6 122.7 512 110.2 512 95.96V31.96c0-10.13-4.75-19.64-12.88-25.64C491.1 .323 480.6-1.552 471 1.323z'
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Player
