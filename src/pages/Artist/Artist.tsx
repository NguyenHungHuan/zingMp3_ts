import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'

const Artist = () => {
  const { name: nameArtist } = useParams()

  const { data } = useQuery({
    queryKey: ['artist', { name: nameArtist }],
    queryFn: () => zingmp3Api.getArtist({ name: nameArtist as string }),
    keepPreviousData: false,
    staleTime: 3 * 60 * 1000,
    enabled: nameArtist !== ''
  })

  console.log(data)
  return <div>Artist</div>
}

export default Artist
