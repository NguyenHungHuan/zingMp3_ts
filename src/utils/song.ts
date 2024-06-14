import { ItemSections } from '~/types/home'

export const setSongToLS = (songId: string) => {
  return localStorage.setItem('songId', songId)
}

export const getSongFromLS = () => {
  return localStorage.getItem('songId') as string
}
export const setIdPlaylistToLS = (songId: string) => {
  return localStorage.setItem('playlistId', songId)
}

export const getIdPlaylistFromLS = () => {
  return localStorage.getItem('playlistId') as string
}

export const setVolumeToLS = (volume: string) => {
  return localStorage.setItem('volume', volume)
}

export const getVolumeFromLS = () => {
  return localStorage.getItem('volume') as string
}

export const getStateAsideRightFromLS = () => {
  return localStorage.getItem('asideRight') as string
}
export const setStateAsideRightToLS = (stateAsideRight: boolean) => {
  return localStorage.setItem('asideRight', stateAsideRight.toString())
}

export const setPlaylistToLS = (playlistId: Array<ItemSections>) => {
  return localStorage.setItem('playlist', JSON.stringify(playlistId))
}

export const getPlaylistFromLS = () => {
  return JSON.parse(localStorage.getItem('playlist') as string)
}

export const setHistoryToLS = (history: ItemSections[]) => {
  return localStorage.setItem('historySong', JSON.stringify(history))
}

export const getHistoryFromLS = () => {
  return JSON.parse(localStorage.getItem('historySong') as string) || []
}
