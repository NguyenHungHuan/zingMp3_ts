import { ItemSections } from './home'

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
  items: ItemSections[]
  sectionId: string
  sectionType: string
  title: string
  topAlbum: TopAlbum
}

export type artists = {
  alias: string
  id: string
  isOA: boolean
  isOABrand: boolean
  link: string
  name: string
  playlistId: string
  spotlight: boolean
  thumbnail: string
  thumbnailM: string
  totalFollow: number
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
  link: string
  textType: string
}
