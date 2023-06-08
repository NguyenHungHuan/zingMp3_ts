export interface homeData {
  items: [
    {
      itemType?: string
      items: any
      link?: string
      sectionId?: string
      sectionType?: string
      title?: string
      viewType?: string
    }
  ]
  total: number
}

export type DataBanner = [
  {
    banner: string
    cover: string
    description: string
    encodeId: string
    ispr: number
    link: string
    target: string
    title: string
    type: number
  }
]

export type DataNewRelease = {
  link?: string
  sectionType?: string
  title?: string
  items?: {
    all?: Array<any>
    others?: Array<any>
    vPop?: Array<any>
  }
}

export type DataPlaylist = {
  itemType?: string
  sectionType?: string
  title?: string
  items?: [
    {
      artists?: Array<any>
      artistsNames?: string
      encodeId?: string
      link?: string
      sortDescription?: string
      thumbnail?: string
      thumbnailM?: string
      title?: string
      releaseDate?: number
      isShuffle?: boolean
    }
  ]
  link?: string
  sectionId?: string
  options?: { hideTitle?: boolean; hideArrow?: boolean }
  viewType?: string
}

export type artists = {
  alias?: string
  id?: string
  isOA?: boolean
  isOABrand?: boolean
  link?: string
  name?: string
  playlistId?: string
  spotlight?: boolean
  thumbnail?: string
  thumbnailM?: string
  totalFollow?: number
}
