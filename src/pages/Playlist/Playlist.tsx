import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'

const Playlist = () => {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['playlist', { id: id }],
    queryFn: () => zingmp3Api.getDetailPlaylist({ id: id as string }),
    keepPreviousData: false,
    staleTime: 3 * 60 * 1000,
    enabled: id !== ''
  })

  console.log(data)

  return <div>Playlist</div>
}

export default Playlist
