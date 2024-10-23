import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import PATH from '~/constants/path'
import useGenerateLink from '~/hooks/useGenerateLink'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Song = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['infoSong', id],
    queryFn: () => zingmp3Api.getSongInfo({ id: id as string }),
    staleTime: 3 * 60 * 1000,
    enabled: id !== ''
  })
  const dataInfoSong = useMemo(() => data?.data.data, [data])
  const { idPlaylist, namePlaylist } = useGenerateLink(
    dataInfoSong && dataInfoSong.album ? dataInfoSong.album.link : ''
  )

  useEffect(() => {
    if (dataInfoSong && idPlaylist !== '' && namePlaylist !== '') {
      navigate(`${PATH.album}/${namePlaylist}/${idPlaylist}`)
    }
  }, [dataInfoSong, idPlaylist, namePlaylist])

  return (
    <div className='mx-[-2px] py-10'>
      <div className='flex'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <Skeleton width={300} height={300} />
          <Skeleton
            width={280}
            height={15}
            style={{
              marginTop: 18
            }}
          />
          <Skeleton width={250} height={10} />
          <Skeleton
            width={150}
            height={30}
            borderRadius={20}
            style={{
              marginTop: 12
            }}
          />
        </div>
        <div className='ml-10 mt-6 grid w-full grid-cols-1 gap-3'>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='flex w-full gap-2'>
                <Skeleton width={40} height={40} />
                <div className='w-[40%]'>
                  <Skeleton width={'80%'} height={10} />
                  <Skeleton width={'60%'} height={10} />
                </div>
                <div className='w-[40%]'>
                  <Skeleton width={'60%'} height={10} />
                </div>
                <Skeleton width={'40px'} height={10} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Song
