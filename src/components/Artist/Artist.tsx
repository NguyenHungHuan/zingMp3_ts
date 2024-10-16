import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Popover from '../Popover'
import PATH from '~/constants/path'
import classNames from 'classnames'
import BoxItem from '../BoxItem'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import moment from 'moment'
import { formatNumberSocial } from '~/utils/formatNumber'
import { artists } from '~/types/artist'

interface Props {
  artistsData: artists[]
  className?: string
  classNameText?: string
  isPopoverDetail?: boolean
  orderArtistHidden?: number
}

export default function Artist({
  artistsData,
  isPopoverDetail = true,
  orderArtistHidden = 3,
  className = 'text-[#ffffff80] text-[12px] overflow-hidden text-ellipsis block line-clamp-1 break-words',
  classNameText = 'inline break-words'
}: Props) {
  const [nameArtist, setNameArtist] = useState<string>('')
  let timer: NodeJS.Timeout

  const handleDetailArtistHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isPopoverDetail) {
      const dataNameArtist = e.currentTarget.rel
      timer = setTimeout(() => {
        setNameArtist(dataNameArtist)
      }, 500)
    }
  }

  const handleMouseLeaveHover = () => {
    if (isPopoverDetail) {
      clearTimeout(timer)
    }
  }

  const { data } = useQuery({
    queryKey: ['artist', { name: nameArtist }],
    queryFn: () => zingmp3Api.getArtist({ name: nameArtist }),
    keepPreviousData: false,
    staleTime: 3 * 60 * 1000,
    enabled: nameArtist !== ''
  })
  const dataArtist = data?.data.data
  const dataArtistNewRelease = useMemo(
    () => dataArtist?.sections.find((item) => item.sectionId === 'aSingle'),
    [dataArtist?.sections]
  )

  return (
    <h3 className={className}>
      {artistsData &&
        artistsData.map((artist, index) => (
          <div key={artist.id} className='inline'>
            {artistsData.length > 1 && index !== 0 && index <= 2 && ', '}
            <Popover
              numberDelay={200}
              className='inline'
              renderPopover={
                index <= 2 &&
                dataArtist &&
                dataArtist.name === artist.name && (
                  <div className='w-[348px] overflow-hidden rounded-md bg-[#34224f] shadow-md'>
                    <div className='relative overflow-hidden'>
                      <div
                        className={`absolute inset-0 bg-cover bg-no-repeat blur-[50px] [background-position-x:50%] [background-position-y:10%]`}
                        style={{
                          backgroundImage: `url(${dataArtist?.thumbnailM})`
                        }}
                      />
                      <div className='absolute inset-0 bg-[#34224f] opacity-40' />
                      <div className='relative z-[2] flex items-center bg-gradient-to-b from-[#ffffff00] to-[#34224f] p-4 text-left'>
                        <div className='mr-2 flex-shrink-0 flex-grow-0 basis-0'>
                          <BoxItem
                            id={dataArtist?.id}
                            hideDesc={true}
                            hideLike={true}
                            hideOption={true}
                            buttonSizeSmall={true}
                            srcImg={dataArtist?.thumbnailM}
                            classNameFigure='flex-shrink-0 flex-1 relative pt-[100%] rounded-full group w-12 h-12 cursor-pointer overflow-hidden'
                            classNameImg='absolute inset-0 object-contain rounded-[4px] w-full h-full group-hover:scale-110 duration-700'
                            isLink={false}
                          />
                        </div>
                        <div className='flex-1 self-center break-words text-left'>
                          <h3 className='text-[14px] font-bold'>
                            <Link
                              to={`${PATH.ngheSi}/${artist?.alias}`}
                              className='mb-0 inline-block max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap align-top leading-normal text-white hover:text-[#c273ed]'
                            >
                              {dataArtist?.name}
                            </Link>
                          </h3>
                          <h3 className='mt-0 block max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap text-[12px] leading-normal text-[#ffffff80]'>
                            {(dataArtist?.totalFollow as number) > 0 ? (
                              <>{formatNumberSocial(dataArtist?.totalFollow as number)} quan tâm</>
                            ) : (
                              ''
                            )}
                          </h3>
                        </div>
                        <div className='ml-[10px] flex-1 flex-shrink-0'>
                          <button className='ml-auto flex items-center justify-center gap-[5px] rounded-full border border-[#ffffff1a] bg-[#ffffff1a] px-3 py-1 text-[12px] text-white hover:brightness-90'>
                            <svg
                              stroke='currentColor'
                              fill='currentColor'
                              strokeWidth={0}
                              viewBox='0 0 1024 1024'
                              height='1em'
                              width='1em'
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-[18px] w-[18px]'
                            >
                              <path d='M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z' />
                            </svg>
                            <span>Quan tâm</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='px-4'>
                      <div
                        className={classNames('mb-4 max-h-[37px] break-all text-[12px] leading-[18px] text-white', {
                          hidden: (dataArtist?.sortBiography as string).length <= 0
                        })}
                      >
                        {(dataArtist?.sortBiography as string).slice(0, 86)}
                        ...
                        <Link to={`${PATH.ngheSi}/${artist?.alias}`} className='inline hover:text-[#c273ed]'>
                          Xem thêm
                        </Link>
                      </div>
                      {dataArtist?.awards && (
                        <div className='mb-4'>
                          <h3 className='mb-2 text-[14px] font-bold text-white'>Giải thưởng</h3>
                          <div className='leading-[1]'>
                            <i
                              className='mr-[10px] inline-block h-[33px] w-[33px] bg-cover bg-no-repeat leading-[66%] [background-position-x:50%] [background-position-y:center]'
                              style={{
                                backgroundImage: `url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.43/static/media/zma.ea944b51.svg)`
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className='mb-4'>
                        <h3 className='mb-2 text-[14px] font-bold text-white'>Mới nhất</h3>
                        <div className='grid grid-cols-4 gap-3'>
                          {dataArtistNewRelease?.items.slice(0, 4).map((item) => (
                            <div key={item.encodeId} className='col-span-1'>
                              <BoxItem
                                id={item.encodeId}
                                hideLike={true}
                                hideOption={true}
                                isLinkDesc={true}
                                buttonSizeSmall={true}
                                description={item.title}
                                srcImg={item.thumbnailM}
                                classNameDesc='text-white text-[12px] line-clamp-2 font-medium mb-0 mt-2'
                                link={item.link}
                                isLink={false}
                                isAlbum={true}
                              />
                              <span className='mt-[3px] text-[10px] text-[#ffffff80]'>
                                {moment(item.releasedAt).format('YYYY')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            >
              <Link
                to={`${PATH.ngheSi}/${artist?.alias}`}
                rel={artist.alias}
                title={artist.name}
                onMouseLeave={handleMouseLeaveHover}
                onMouseEnter={(e) => handleDetailArtistHover(e)}
                className={classNames(classNameText, {
                  'hover:text-[#c273ed] hover:underline': index !== orderArtistHidden,
                  'pointer-events-none cursor-default': index >= orderArtistHidden,
                  hidden: index >= orderArtistHidden + 1
                })}
              >
                {Number(index) === orderArtistHidden ? '...' : artist.name}
              </Link>
            </Popover>
          </div>
        ))}
    </h3>
  )
}
