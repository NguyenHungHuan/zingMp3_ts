import { ItemSections } from './home'

export type album = {
  PR: boolean
  aliasTitle: string
  artist: {
    id: string
    name: string
    link: string
    spotlight: boolean
    alias: string
    thumbnail: string
    cover: string
    playlistId: string
  }
  artists: [
    {
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
  ]
  artistsNames: string
  contentLastUpdate: number
  description: string
  distributor: string
  encodeId: string
  genreIds: [string]
  genres: [
    {
      alias: string
      id: string
      link: string
      name: string
      title: string
    }
  ]
  isAlbum: boolean
  isIndie: boolean
  isPrivate: boolean
  isShuffle: boolean
  isSingle: boolean
  isoffical: boolean
  like: number
  liked: boolean
  link: string
  listen: number
  playItemMode: number
  releaseDate: string
  releasedAt: number
  sectionId: string
  song: {
    items: ItemSections[]
    total: number
    totalDuration: number
  }
  sections: [
    {
      items: ItemSections[]
      link: string
      sectionId: string
      sectionType: string
      title: string
      viewType: string
    }
  ]
  sortDescription: string
  subType: number
  textType: string
  thumbnail: string
  thumbnailM: string
  title: string
  uid: number
  userName: string
}
