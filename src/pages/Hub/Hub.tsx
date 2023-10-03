import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { TitleListBox } from '../Home/Home'
import BoxItem from '~/components/BoxItem'
import Artist from '~/components/Artist'
import { Link } from 'react-router-dom'

export default function Hub() {
  const { data } = useQuery({
    queryKey: ['hub'],
    queryFn: () => zingmp3Api.getGenres(),
    staleTime: 3 * 60 * 1000
  })
  const dataHub = data?.data.data

  return (
    <main className='mx-[-2px] px-[59px] py-5'>
      {dataHub && (
        <>
          <Link to={'/'}>
            <figure className='relative pt-[29.1%]'>
              <img src={dataHub.banners[0].cover} alt='' className='absolute inset-0 rounded' />
            </figure>
          </Link>
          {
            <div className='mt-[48px]'>
              <h3 className='mb-5 text-xl font-bold capitalize text-white'>{dataHub.featured.title}</h3>
              <div className='grid grid-cols-4 gap-7'>
                {dataHub.featured.items.map((item) => (
                  <Link to={'/'} key={item.encodeId} className='group relative'>
                    <figure className='relative overflow-hidden rounded-lg pt-[56.25%]'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='absolute inset-0 duration-700 group-hover:scale-110'
                      />
                    </figure>
                    <h3 className='absolute left-[50%] top-[50%] z-[1] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-[26px] font-bold capitalize text-white'>
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          }
          {
            <div className='mt-[48px]'>
              <h3 className='mb-5 text-xl font-bold capitalize text-white'>Quốc gia</h3>
              <div className='grid grid-cols-4 gap-7'>
                {dataHub.nations.map((item) => (
                  <Link to={'/'} key={item.encodeId} className='group relative'>
                    <figure className='relative overflow-hidden rounded-lg pt-[56.25%]'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='absolute inset-0 duration-700 group-hover:scale-110'
                      />
                    </figure>
                    <h3 className='absolute left-[50%] top-[50%] z-[1] translate-x-[-50%] translate-y-[-50%] whitespace-nowrap text-[26px] font-bold capitalize text-white'>
                      {item.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          }
          {
            <div className='mt-[48px]'>
              <h3 className='mb-5 text-xl font-bold capitalize text-white'>Tâm Trạng Và Hoạt Động</h3>
              <div className='grid grid-cols-4 gap-7'>
                {dataHub.topic.map((item) => (
                  <Link to={'/'} key={item.encodeId} className='group relative'>
                    <figure className='relative overflow-hidden rounded-lg pt-[56.25%]'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='absolute inset-0 duration-700 group-hover:scale-110'
                      />
                    </figure>
                    <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-end gap-2 pb-[15px] pl-[15px]'>
                      <h3 className='whitespace-nowrap text-[18px] font-bold uppercase text-white'>{item.title}</h3>
                      <div className='flex items-center gap-[3px]'>
                        {item.playlists.map((items) => (
                          <img
                            key={items.encodeId}
                            src={items.thumbnailM}
                            alt={items.title}
                            className='h-[45px] w-[45px] rounded border border-transparent'
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          }
          {dataHub.genre.map((item) => (
            <div key={item.title} className='mt-12'>
              <TitleListBox titleList={item.title} />
              <div className='grid grid-cols-5 gap-7'>
                {item.playlists.slice(0, 5).map((items) => (
                  <div key={items.encodeId} className='flex-1 flex-shrink-0'>
                    <BoxItem
                      classNameDesc='line-clamp-1 mt-3 mb-[2px] text-white text-sm font-bold whitespace-normal'
                      srcImg={items.thumbnailM}
                      altImg={items.title}
                      description={items.title}
                      link={items.link}
                      isLinkDesc={true}
                    />
                    <Artist
                      artistsData={items.artists}
                      className='line-clamp-1 block overflow-hidden break-words text-sm font-normal text-[#ffffff80]'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  )
}
