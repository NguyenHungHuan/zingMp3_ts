import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import BoxItem from '~/components/BoxItem'
import ArtistText from '~/components/Artist'
import ArtistCard from '~/components/ArtistCard'
import CardItem from '~/components/CardItem'
import DOMPurify from 'dompurify'
import { useEffect, useState, useRef } from 'react'
import { formatPriceNumber } from '~/utils/formatNumber'
import useLineClamp from '~/hooks/useLineClamp'

const Artist = () => {
  const [active, setActive] = useState<boolean>(false)
  const [activeShow, setActiveShow] = useState<'aSongs' | 'aSingle' | 'aAlbum' | 'aMV' | ''>('')
  const { name: nameArtist } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (activeShow !== '') {
      document.getElementsByClassName('main')[0].scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [activeShow])

  const { data } = useQuery({
    queryKey: ['artist', { name: nameArtist }],
    queryFn: () => zingmp3Api.getArtist({ name: nameArtist as string }),
    keepPreviousData: false,
    staleTime: 3 * 60 * 1000,
    enabled: nameArtist !== ''
  })
  const dataArtist = data?.data.data

  const ref = useRef<HTMLParagraphElement>(null)
  const clamps = useLineClamp(ref, { lines: 7 }, dataArtist ? dataArtist.biography : '')

  return (
    <main className='mb-10'>
      {dataArtist && (
        <>
          <div
            className='before:content-[" "] relative mx-[-59px] mt-[-70px] h-[300px] bg-cover bg-[50%] bg-no-repeat before:absolute before:inset-0 before:bg-[#291547cc] before:backdrop-blur-2xl 2xl:mx-[-160px]'
            style={{ backgroundImage: `url(${dataArtist.thumbnailM})` }}
          >
            <div className='flex h-full w-full items-end pb-6 text-white blur-none'>
              <div className='mx-[59px] flex items-start gap-[32px] 2xl:mx-[160px]'>
                <img
                  src={dataArtist.thumbnailM}
                  alt='Avatar'
                  className='h-[140px] w-[140px] rounded-full object-cover'
                />
                <div className='flex flex-col gap-4'>
                  <div className='flex items-center gap-4'>
                    <h2 className='text-[60px] font-bold leading-tight'>{dataArtist.name}</h2>
                    <button className='flex items-center justify-center hover:opacity-90'>
                      <svg width={64} height={64} viewBox='0 0 44 44' fill='none'>
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
                  <div className='flex items-center text-[14px] font-medium'>
                    <span>{`${formatPriceNumber(dataArtist.follow)} người quan tâm`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {activeShow === '' && (
              <>
                {dataArtist.sections &&
                  dataArtist.sections.map((item, index) => (
                    <div key={index}>
                      <div className='flex gap-7'>
                        {item.topAlbum && (
                          <div className='mt-12 flex-[0_0_33.33%] flex-shrink-0'>
                            <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>Mới Phát Hành</h3>
                            <div
                              aria-hidden
                              onClick={() => navigate(item.topAlbum.link.replace('.html', ''))}
                              className='group grid cursor-pointer grid-cols-2 gap-4 rounded-xl bg-[#362f3e] p-4'
                            >
                              <div key={item.topAlbum.encodeId} className='flex-1 flex-shrink-0'>
                                <BoxItem
                                  id={item.topAlbum.encodeId}
                                  classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                                  srcImg={item.topAlbum.thumbnailM}
                                  altImg={item.topAlbum.title}
                                  link={item.topAlbum.link}
                                  isLinkDesc={true}
                                />
                              </div>
                              <div className='my-[6px]'>
                                <span className='text-[12px] text-[#ffffff80]'>{item.topAlbum.textType}</span>
                                <h3 className='mb-[2px] mt-3 line-clamp-2 text-[14px] text-white'>
                                  {item.topAlbum.title}
                                </h3>
                                <ArtistText
                                  artistsData={item.topAlbum.artists}
                                  className='mb-3 line-clamp-1 block overflow-hidden break-words text-[12px] font-normal text-[#ffffff80]'
                                />
                                <span className='text-[12px] text-[#ffffff80]'>{item.topAlbum.releaseDate}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {item.sectionId === 'aSongs' && item.items && (
                          <div className='mt-12 flex-1'>
                            <div className='mb-5 flex items-center justify-between'>
                              <h3 className='text-[20px] font-bold capitalize text-white'>{item.title}</h3>
                              <button
                                onClick={() => setActiveShow('aSongs')}
                                className='ml-auto flex items-center gap-[6px] text-[12px] font-medium uppercase text-[#ffffff80] hover:text-[#c273ed]'
                              >
                                TẤT CẢ
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='h-5 w-5'
                                >
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                                </svg>
                              </button>
                            </div>
                            <div className='grid grid-cols-2 gap-x-7'>
                              {item.items.slice(0, 6).map((itemMap) => (
                                <CardItem
                                  key={itemMap.encodeId}
                                  dataItem={itemMap}
                                  classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                                  className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                                  isDate={false}
                                  hideLike={false}
                                  hideLyric={false}
                                  hideAlbum={true}
                                  dataPlaylist={item.items.slice(0, 6)}
                                  playlistId={''}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {item.sectionId === 'aSingle' && item.items && (
                        <div className='mt-12'>
                          <div className='mb-5 flex items-center justify-between'>
                            <h3 className='text-[20px] font-bold capitalize text-white'>{item.title}</h3>
                            {item.items.length > 5 && (
                              <button
                                onClick={() => setActiveShow('aSingle')}
                                className='ml-auto flex items-center gap-[6px] text-[12px] font-medium uppercase text-[#ffffff80] hover:text-[#c273ed]'
                              >
                                TẤT CẢ
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='h-5 w-5'
                                >
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                                </svg>
                              </button>
                            )}
                          </div>
                          <div className='grid grid-cols-5 gap-7'>
                            {item.items.slice(0, 5).map((item) => (
                              <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                                <BoxItem
                                  id={item.encodeId}
                                  classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                                  srcImg={item.thumbnailM}
                                  altImg={item.title}
                                  description={item.title}
                                  link={item.link}
                                  isLinkDesc={true}
                                />
                                <span className='text-[14px] text-[#ffffff80]'>{item.releaseDateText}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.sectionId === 'aAlbum' && item.items && (
                        <div className='mt-12'>
                          <div className='mb-5 flex items-center justify-between'>
                            <h3 className='text-[20px] font-bold capitalize text-white'>{item.title}</h3>
                            {item.items.length > 5 && (
                              <button
                                onClick={() => setActiveShow('aAlbum')}
                                className='ml-auto flex items-center gap-[6px] text-[12px] font-medium uppercase text-[#ffffff80] hover:text-[#c273ed]'
                              >
                                TẤT CẢ
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth={1.5}
                                  stroke='currentColor'
                                  className='h-5 w-5'
                                >
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                                </svg>
                              </button>
                            )}
                          </div>
                          <div className='grid grid-cols-5 gap-7'>
                            {item.items.slice(0, 5).map((item) => (
                              <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                                <BoxItem
                                  id={item.encodeId}
                                  classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                                  srcImg={item.thumbnailM}
                                  altImg={item.title}
                                  description={item.title}
                                  link={item.link}
                                  isLinkDesc={true}
                                />
                                <span className='text-[14px] text-[#ffffff80]'>{item.releaseDateText}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.sectionId === 'aPlaylist' && item.items && (
                        <div className='mt-12'>
                          <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>{item.title}</h3>
                          <div className='grid grid-cols-5 gap-7'>
                            {item.items.slice(0, 5).map((item) => (
                              <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                                <BoxItem
                                  id={item.encodeId}
                                  classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                                  srcImg={item.thumbnailM}
                                  altImg={item.title}
                                  description={item.title}
                                  link={item.link}
                                  isLinkDesc={true}
                                />
                                <ArtistText
                                  artistsData={item.artists}
                                  className='line-clamp-1 block overflow-hidden break-words text-[14px] font-normal text-[#ffffff80]'
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.sectionId === 'aReArtist' && item.items && (
                        <div className='mt-12'>
                          <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>{item.title}</h3>
                          <div className='grid grid-cols-5 gap-7'>
                            {item.items.slice(0, 5).map((item) => (
                              <div key={item.id} className='flex-1 flex-shrink-0'>
                                <ArtistCard
                                  key={item.id}
                                  srcImg={item.thumbnailM}
                                  altImg={item.name}
                                  description={item.name}
                                  artistsData={[item]}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                {dataArtist.biography !== '' && (
                  <>
                    <div className='mb-[30px] mt-12'>
                      <h3 className='mb-5 text-[20px] font-bold capitalize text-white'>về {dataArtist.name}</h3>
                      <div className='flex gap-[30px]'>
                        <div className='flex-shrink-0'>
                          <figure className='h-full max-h-[315px] w-full max-w-[475px] rounded-lg'>
                            <img
                              src={dataArtist.thumbnailM}
                              alt={dataArtist.name}
                              className='h-full w-full rounded-lg object-cover object-[50%_20%]'
                            />
                          </figure>
                        </div>
                        <div className='max-w-[445px]'>
                          <div className='mb-12'>
                            <p
                              ref={ref}
                              className='line-clamp-[7] text-[14px] text-[#ffffff80]'
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(dataArtist.biography)
                              }}
                            />
                            {clamps && (
                              <button
                                onClick={() => setActive(true)}
                                className='text-[12px] font-bold uppercase text-white'
                              >
                                Xem thêm
                              </button>
                            )}
                            {/* <button onClick={() => setActive(true)} className='text-[12px] font-bold uppercase text-white'>
                              Xem thêm
                            </button> */}
                          </div>
                          <div className='flex flex-col'>
                            <strong className='mb-1 text-[20px] font-bold leading-none text-white'>
                              {formatPriceNumber(dataArtist.follow)}
                            </strong>
                            <span className='leading-none text-[#ffffff80]'>Người quan tâm</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {active && (
                      <div
                        aria-hidden
                        onClick={() => setActive(false)}
                        className='fixed inset-0 z-[110] flex cursor-default items-center justify-center bg-[#000000cc]'
                      >
                        <div
                          aria-hidden
                          onClick={(e) => e.stopPropagation()}
                          className='relative h-[448px] w-[480px] rounded-lg bg-[#34224f] p-6'
                        >
                          <button
                            className='absolute right-[10px] top-[10px]'
                            onClick={() => setActive(false)}
                            aria-label='Close'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='white'
                              className='h-6 w-6'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                            </svg>
                          </button>
                          <div className='flex flex-col items-center'>
                            <figure className='mb-3 h-[110px] w-[110px] rounded-full'>
                              <img
                                src={dataArtist.thumbnailM}
                                alt={dataArtist.name}
                                className='h-full w-full rounded-full object-cover'
                              />
                            </figure>
                            <h3 className='text-center text-[24px] font-bold uppercase text-white'>
                              {dataArtist.name}
                            </h3>
                            <p
                              className='mt-6 max-h-[218px] overflow-y-auto text-[14px] text-[#ffffff80]'
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(dataArtist.biography)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {activeShow === 'aSongs' && (
              <>
                {dataArtist.sections
                  .filter((item) => item.sectionId === 'aSongs' && item.items)
                  .map((item) => (
                    <div key={item.sectionId} className='mt-6 flex-1'>
                      <div className='mb-4 ml-2 flex items-center'>
                        <button
                          onClick={() => setActiveShow('')}
                          className='flex h-[24px] w-[38px] items-center justify-start'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke={'white'}
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                            />
                          </svg>
                        </button>
                        <h3 className='text-[20px] font-bold capitalize text-white'>
                          {item.title} - {dataArtist.name}
                        </h3>
                      </div>
                      <div>
                        {item.items.map((itemMap) => (
                          <CardItem
                            key={itemMap.encodeId}
                            dataItem={itemMap}
                            classNameFigure='relative cursor-pointer w-[40px] h-[40px] object-cover rounded overflow-hidden flex-shrink-0'
                            className='group relative flex items-center gap-x-[10px] overflow-hidden rounded border-b border-[#ffffff0d] p-[10px] hover:bg-[#ffffff1a]'
                            isDate={false}
                            hideLike={false}
                            hideLyric={false}
                            hideAlbum={true}
                            dataPlaylist={item.items}
                            playlistId={''}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </>
            )}
            {activeShow === 'aSingle' && (
              <>
                {dataArtist.sections
                  .filter((item) => item.sectionId === 'aSingle' && item.items)
                  .map((item) => (
                    <div key={item.sectionId} className='mt-6 flex-1'>
                      <div className='mb-4 flex items-center'>
                        <button
                          onClick={() => setActiveShow('')}
                          className='flex h-[24px] w-[38px] items-center justify-start'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke={'white'}
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                            />
                          </svg>
                        </button>
                        <h3 className='text-[20px] font-bold capitalize text-white'>
                          {item.title} - {dataArtist.name}
                        </h3>
                      </div>
                      <div className='grid grid-cols-5 gap-7'>
                        {item.items.map((item) => (
                          <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                            <BoxItem
                              id={item.encodeId}
                              classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                              srcImg={item.thumbnailM}
                              altImg={item.title}
                              description={item.title}
                              link={item.link}
                              isLinkDesc={true}
                            />
                            <span className='text-[14px] text-[#ffffff80]'>{item.releaseDateText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </>
            )}
            {activeShow === 'aAlbum' && (
              <>
                {dataArtist.sections
                  .filter((item) => item.sectionId === 'aAlbum' && item.items)
                  .map((item) => (
                    <div key={item.sectionId} className='mt-6 flex-1'>
                      <div className='mb-4 flex items-center'>
                        <button
                          onClick={() => setActiveShow('')}
                          className='flex h-[24px] w-[38px] items-center justify-start'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke={'white'}
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                            />
                          </svg>
                        </button>
                        <h3 className='text-[20px] font-bold capitalize text-white'>
                          {item.title} - {dataArtist.name}
                        </h3>
                      </div>
                      <div className='grid grid-cols-5 gap-7'>
                        {item.items.map((item) => (
                          <div key={item.encodeId} className='flex-1 flex-shrink-0'>
                            <BoxItem
                              id={item.encodeId}
                              classNameDesc='line-clamp-1 mt-3 text-white text-[14px] font-bold whitespace-normal'
                              srcImg={item.thumbnailM}
                              altImg={item.title}
                              description={item.title}
                              link={item.link}
                              isLinkDesc={true}
                            />
                            <span className='text-[14px] text-[#ffffff80]'>{item.releaseDateText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </>
      )}
    </main>
  )
}
export default Artist
