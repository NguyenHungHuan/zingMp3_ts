import { useContext } from 'react'
import toast from 'react-hot-toast'
import { AppContext } from '~/contexts/app.context'
import { ItemSections } from '~/types/home'
import { setIdPlaylistToLS, setPlaylistToLS, setSongToLS } from '~/utils/song'

export default function usePlayMusic() {
  const { stateIdSong, setStateIdSong, statePlaySong, setStatePlaySong, setStatePlaylist, setStateIdPlaylist } =
    useContext(AppContext)
  const notify = () => toast('API không hỗ trợ.')

  const handleHookPlayMusic = ({
    songId,
    dataItem,
    data,
    playlistId // isHistorySetPlaylist = false
  }: {
    songId: string
    dataItem: ItemSections
    data: ItemSections[]
    playlistId: string
    // isHistorySetPlaylist?: boolean
  }) => {
    if (dataItem.streamingStatus !== 2) {
      if (statePlaySong && songId === stateIdSong) {
        return setStatePlaySong(false)
      } else {
        // if (!isHistorySetPlaylist) {
        setPlaylistToLS(data.filter((item) => item.streamingStatus !== 2))
        setStatePlaylist(data.filter((item) => item.streamingStatus !== 2))
        // }
        setStateIdPlaylist(playlistId)
        setIdPlaylistToLS(playlistId)
        setSongToLS(songId)
        setStateIdSong(songId)
        setStatePlaySong(true)
      }
    } else {
      return notify()
    }
  }
  return {
    handleHookPlayMusic
  }
}
