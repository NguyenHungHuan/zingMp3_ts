import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'

export default function ZingChart() {
  const { test } = useParams()
  // const idPlaylist = id !== undefined ? id : ''

  // const { data } = useQuery({
  //   queryKey: ['playlistSong', { id: idPlaylist }],
  //   queryFn: () => zingmp3Api.getDetailPlaylist({ id: idPlaylist }),
  //   enabled: id !== ''
  // })

  console.log(test)

  return <div>ZingChart</div>
}
