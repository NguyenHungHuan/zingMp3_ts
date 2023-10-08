import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useState } from 'react'
import Tooltip from '../Tooltip'
import PATH from '~/constants/path'
import useGenerateLink from '~/hooks/useGenerateLink'

interface Props {
  srcImg?: string
  altImg?: string
  description?: string
  link?: string
  hideLike?: boolean
  hideOption?: boolean
  hideDesc?: boolean
  buttonSizeSmall?: boolean
  isLink?: boolean
  isLinkDesc?: boolean
  className?: string
  classNameDesc?: string
  classNameArtist?: string
  classNameImg?: string
  classNameFigure?: string
  effectActive?: boolean
}

export default function BoxItem({
  srcImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png',
  altImg = '',
  description = '',
  link = '',
  effectActive = false,
  hideLike = false,
  hideOption = false,
  buttonSizeSmall = false,
  hideDesc = false,
  isLink = true,
  isLinkDesc = false,
  className = 'flex-shrink-0 flex-1',
  classNameDesc = 'line-clamp-2 mt-3 text-[#ffffff80] text-sm font-normal whitespace-normal',
  classNameImg = 'absolute inset-0 object-contain rounded-[4px] w-full h-full group-hover:scale-110 duration-700',
  classNameFigure = 'flex-shrink-0 flex-1 relative pt-[100%] rounded-[4px] group w-full overflow-hidden cursor-pointer'
}: Props) {
  const classNameDescription = description === '' ? 'hidden' : classNameDesc
  const [active, setActive] = useState(false)
  const { idPlaylist, namePlaylist } = useGenerateLink(link)

  const renderLinkElement = () => (
    <>
      <img className={classNameImg} src={srcImg} alt={altImg} />
      {active ? null : (
        <div
          className={classNames('absolute inset-0 h-full w-full bg-[#00000070]', {
            visible: effectActive,
            'invisible group-hover:visible': !effectActive
          })}
        />
      )}
      {active && <div className='absolute inset-0 h-full w-full bg-[#00000070]' />}
      <div className='absolute inset-0'>
        <div
          aria-hidden
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
          className={classNames(
            'absolute bottom-auto left-[50%] right-auto top-[50%] z-[90] flex h-[50px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-evenly',
            {
              visible: active,
              'invisible group-hover:visible': !active
            }
          )}
        >
          {!hideLike && (
            <Tooltip text='Thêm vào thư viện'>
              <button className='z-10 flex items-center justify-center rounded-full p-[6px] hover:bg-[#ffffff4d]'>
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
          {buttonSizeSmall ? (
            <button className='absolute inset-0 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill={'white'}
                viewBox='0 0 24 24'
                strokeWidth={1}
                stroke={'white'}
                className={classNames('h-6 w-6 hover:opacity-90', {
                  visible: effectActive,
                  'invisible group-hover:visible': !effectActive
                })}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            </button>
          ) : (
            <button className='flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white hover:opacity-90'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='white'
                viewBox='0 0 24 24'
                strokeWidth={1}
                stroke='white'
                className='h-7 w-7 pb-[1px] pl-[3px]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            </button>
          )}
          {!hideOption && (
            <Popover
              setActive={setActive}
              isClick={true}
              isHover={false}
              placement='bottom-start'
              renderPopover={
                <div className='w-[250px] rounded-lg bg-[#34224f] py-[10px] shadow-md'>
                  <ul className='pl-[1px]'>
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
                            d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                          />
                        </svg>
                        <span>Tải xuống</span>
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
                </div>
              }
            >
              <Tooltip text='Khác'>
                <button className='z-10 flex items-center justify-center rounded-full p-[3px] hover:bg-[#ffffff4d]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='white'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke={'white'}
                    className='h-6 w-6'
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
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className={className}>
      <figure className={classNameFigure}>
        {isLink ? (
          <Link to={`${PATH.album}/${namePlaylist}/${idPlaylist}`} title={altImg}>
            {renderLinkElement()}
          </Link>
        ) : (
          <>{renderLinkElement()}</>
        )}
      </figure>
      {!hideDesc && (
        <>
          {isLinkDesc ? (
            <Link to={link.replace('.html', '')} className={classNameDescription + ' hover:text-[#c273ed]'}>
              {description}
            </Link>
          ) : (
            <h3 className={classNameDescription}>{description}</h3>
          )}
        </>
      )}
    </div>
  )
}
