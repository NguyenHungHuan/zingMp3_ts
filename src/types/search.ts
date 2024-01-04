import { artists } from './artist'
import { ItemSections } from './home'

export type recommend = [
  {
    keyword: string
    link: string
  }
]

export type suggestion = {
  items: [
    {
      keywords: [
        {
          keyword: string
          suggestType: number
          type: number
        }
      ]
      suggestions: suggestionItem[]
    }
  ]
}

export type suggestionItem = {
  artists: [
    {
      aliasName: string
      artistType: number
      avatar: string
      followers: number
      id: string
      link: string
      name: string
      oaId: string
      oaType: number
      playlistId: number
      type: number
    }
  ]
  boolAtt: number
  disDPlatform: number
  disSPlatform: number
  downloadStatus: number
  downloadTypes: string
  duration: number
  euId: string
  genres: [
    {
      id: string
      name: string
      thumbS: string
    }
  ]
  hLyricVersion: number
  hasVideo: true
  id: string
  link: string
  lyricId: string
  lyricLink: string
  modifiedTime: number
  orgMD5: string
  playStatus: number
  privacy: number
  radioPid: string
  status: number
  thumb: string
  thumbVideo: string
  title: string
  tracking: string
  type: number
  userId: number
  video: { playStatus: number; status: number }
}

export type searchResult = {
  artists: artists[]
  counter: { song: number; artist: number; playlist: number; video: number }
  playlists: ItemSections[]
  sectionId: string
  songs: ItemSections[]
  topSuggest: ItemSections[]
  top: ItemSections
}

export type searchResultType = {
  items: ItemSections[]
  sectionId: string
  total: number
}
