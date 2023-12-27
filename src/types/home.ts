import { TopAlbum, artists } from './artist'

export interface homeData {
  items: Array<DataPlaylist<any>>
  total: number
}

export type DataPlaylist<T> = {
  sectionId: string
  sectionType: string
  title: string
  viewType: string
  link: string
  itemType: string
  items: T
  chart?: {
    times: [
      {
        hour: string
      }
    ]
    minScore: number
    maxScore: number
    items: {
      [key: string]: [
        {
          time: number
          hour: string
          counter: number
        }
      ]
    }
    totalScore: number
  }
  chartType?: string
  promotes?: Array<ItemSections>
}

export type itemNewRelease = {
  all: Array<ItemSections>
  others: Array<ItemSections>
  vPop: Array<ItemSections>
}

export type ItemSections = {
  encodeId: string
  title: string
  thumbnail: string
  thumbnailM: string
  artistsNames: string
  artists: Array<artists>
  genreIds: Array<string>
  isIndie: boolean
  isOffical: boolean
  isPrivate: boolean
  alias: string
  distributor: string
  duration: number
  preRelease: boolean
  releaseDate: number | string
  releaseDateText: string
  releasedAt: number
  zingChoice: boolean
  allowAudioAds: boolean
  hasLyric: boolean
  isWorldWide: boolean
  album: TopAlbum
  link: string
  mvlink: string
  streamingStatus: number
  sortDescription: string
  score?: number
  rakingStatus?: number
  id: string
  isOA: boolean
  isOABrand: boolean
  name: string
  playlistId: string
  spotlight: boolean
  totalFollow: number
}

export type ItemBanner = {
  banner: string
  cover: string
  description: string
  encodeId: string
  ispr: number
  link: string
  target: string
  title: string
  type: number
  artists: Array<artists>
  artistsNames: string
  sortDescription: string
  thumbnail: string
  thumbnailM: string
  releaseDate: number
  isShuffle: boolean
}
