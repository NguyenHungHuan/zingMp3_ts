import { successResponse } from '~/types/utils'
import axiosClients from './axiosClients'
import { DataPlaylist, ItemSections, homeData } from '~/types/home'
import PATH from '~/constants/path'
import { artist } from '~/types/artist'
import { InfoSong, audioSong, lyric } from '~/types/infoSong'
import { dataHub } from '~/types/hub'
import { dataNewReleaseSong } from '~/types/newReleaseSong'
import { DataChart, itemWeekChart } from '~/types/chart'
import { album } from '~/types/album'
import { recommend, searchResult, searchResultType, suggestion } from '~/types/search'

const url = '/'
export type nationalKey = 'vn' | 'kr' | 'us'
const zingmp3Api = {
  getSong(params: { id: string }) {
    const url = '/song'
    return axiosClients.get<successResponse<audioSong>>(url, { params })
  },

  getDetailPlaylist(params: { id: string }) {
    const url = '/detailPlaylist'
    return axiosClients.get<successResponse<album>>(url, {
      params
    })
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

  getSongInfo(params: { id: string }) {
    const url = PATH.infoSong
    return axiosClients.get<successResponse<InfoSong>>(url, { params })
  },

  getTop100() {
    const url = '/top100'
    return axiosClients.get<successResponse<DataPlaylist<ItemSections[]>[]>>(url)
  },

  getGenres() {
    const url = '/genres'
    return axiosClients.get<successResponse<dataHub>>(url)
  },

  getNewReleaseSongs() {
    const url = '/newreleasesongs'
    return axiosClients.get<successResponse<dataNewReleaseSong>>(url)
  },

  getChartHome() {
    const url = '/chartHome'
    return axiosClients.get<successResponse<DataChart>>(url)
  },
  getWeekChart(params: { nationalKey: nationalKey; week?: number; year?: number }) {
    const url = '/getWeekChart'
    return axiosClients.get<successResponse<itemWeekChart>>(url, { params })
  },

  getNewReleaseChart() {
    const url = '/newReleaseChart'
    return axiosClients.get(url)
  },

  getListSongArtist() {
    return axiosClients.get(url)
  },

  getLyricSong(params: { id: string }) {
    const url = '/lyric'
    return axiosClients.get<successResponse<lyric>>(url, { params })
  },

  search(params: { q: string }) {
    const url = '/search'
    return axiosClients.get<successResponse<searchResult>>(url, { params })
  },
  getSuggestion(params: { q: string }) {
    const url = '/suggestion'
    return axiosClients.get<successResponse<suggestion>>(url, { params })
  },
  getRecommendKeyword() {
    const url = '/recommendKeyword'
    return axiosClients.get<successResponse<recommend>>(url)
  },
  searchType(params: { q: string; type: 'song' | 'artist' | 'playlist'; page?: number }) {
    const url = '/searchType'
    return axiosClients.get<successResponse<searchResultType>>(url, { params })
  },

  getListMV() {
    return axiosClients.get(url)
  },

  getCategoryMV() {
    return axiosClients.get(url)
  },

  getVideoMV(params: { id: string }) {
    const url = '/video'
    return axiosClients.get(url, { params })
  }
}

export default zingmp3Api
