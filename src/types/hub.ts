import { ItemSections } from './home'

export type dataHub = {
  banners: {
    cover: string
    link: string
  }[]
  featured: {
    title: string
    items: itemHub[]
  }
  genre: itemHub[]
  nations: itemHub[]
  sectionId: string
  topTopic: itemHub[]
  topic: itemHub[]
}

export type itemHub = {
  cover: string
  description: string
  encodeId: string
  link: string
  thumbnail: string
  thumbnailHasText: string
  thumbnailR: string
  title: string
  playlists: ItemSections[]
}
