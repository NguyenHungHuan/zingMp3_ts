import { artists } from './home'

export type artist = {
  id: string
  name: string
  spotlight: boolean
  alias: string
  playlistId: string
  cover: string
  thumbnail: string
  biography: string
  sortBiography: string
  thumbnailM: string
  national: string
  birthday: string
  realname: string
  totalFollow: number
  follow: number
  awards: Array<string>
  topAlbum: TopAlbum
  sectionId: string
  sections: Array<sectionsArtist>
}

export type sectionsArtist = {
  items: Array<ItemSections>
  sectionId: string
  sectionType: string
  title: string
  topAlbum: TopAlbum
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
  album: Array<TopAlbum>
}

export type TopAlbum = {
  encodeId: string
  title: string
  thumbnail: string
  thumbnailM: string
  artistsNames: string
  artists: Array<artists>
  genreIds: Array<string>
  isIndie: boolean
  isoffical: boolean
  isPrivate: boolean
  releaseDate: string
  releasedAt: number
  isShuffle: boolean
  isAlbum: boolean
  isSingle: boolean
}
