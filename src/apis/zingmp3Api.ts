import { successResponse } from '~/types/utils'
import axiosClients from './axiosClients'
import { homeData } from '~/types/home'
import PATH from '~/constants/path'
import { artist } from '~/types/artist'

const url = '/'
const zingmp3Api = {
  getSong() {
    const url = '/song'
    return axiosClients.get(url)
  },

  getDetailPlaylist() {
    return axiosClients.get(url)
  },

  getHome() {
    const url = PATH.home
    return axiosClients.get<successResponse<homeData>>(url)
  },

  getArtist(params: { name: string }) {
    const url = PATH.artist
    return axiosClients.get<successResponse<artist>>(url, {
      params
    })
  },

  getTop100() {
    const url = '/top100'
    return axiosClients.get(url)
  },

  getChartHome() {
    const url = '/chartHome'
    return axiosClients.get(url)
  },

  getNewReleaseChart() {
    const url = '/newReleaseChart'
    return axiosClients.get(url)
  },

  getSongInfo() {
    return axiosClients.get(url)
  },

  getListSongArtist() {
    return axiosClients.get(url)
  },

  getLyricSong() {
    return axiosClients.get(url)
  },

  searchSong() {
    return axiosClients.get(url)
  },

  getListMV() {
    return axiosClients.get(url)
  },

  getCategoryMV() {
    return axiosClients.get(url)
  },

  getVideoMV() {
    return axiosClients.get(url)
  }
}

export default zingmp3Api
