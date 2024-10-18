import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import PATH from '~/constants/path'
import useGenerateLink from '~/hooks/useGenerateLink'

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
    <>
        loading.....
    </>
  )
}

export default Song
