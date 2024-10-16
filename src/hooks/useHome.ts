import { useMemo } from 'react'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { DataPlaylist, ItemBanner, ItemSections, itemNewRelease } from '~/types/home'

export default function useHome() {
  const { data: dataHome } = useQuery({
    queryKey: ['home'],
    queryFn: zingmp3Api.getHome,
    staleTime: 3 * 60 * 1000
  })

  const dataBanner: Array<ItemBanner> = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hSlider')?.items,
    [dataHome?.data.data.items]
  )
  const dataNewRelease: DataPlaylist<itemNewRelease> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionType === 'new-release'),
    [dataHome?.data.data.items]
  )
  const dataChill: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme'),
    [dataHome?.data.data.items]
  )
  const dataHot: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme1'),
    [dataHome?.data.data.items]
  )
  const dataEnergy: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme2'),
    [dataHome?.data.data.items]
  )
  const dataRemix: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme3'),
    [dataHome?.data.data.items]
  )
  const dataStatus: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme4'),
    [dataHome?.data.data.items]
  )
  const dataArtists: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hArtistTheme'),
    [dataHome?.data.data.items]
  )
  const dataTop100: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'h100'),
    [dataHome?.data.data.items]
  )
  const dataAlbumHot: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hAlbum'),
    [dataHome?.data.data.items]
  )
  const dataNewReleaseChart: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hNewrelease'),
    [dataHome?.data.data.items]
  )
  const dataZingChart: DataPlaylist<Array<ItemSections>> | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hZC'),
    [dataHome?.data.data.items]
  )
  const dataWeekChartBanner = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionType === 'weekChart')?.items,
    [dataHome?.data.data.items]
  )

  return {
    dataBanner,
    dataNewRelease,
    dataChill,
    dataHot,
    dataEnergy,
    dataStatus,
    dataRemix,
    dataArtists,
    dataTop100,
    dataAlbumHot,
    dataNewReleaseChart,
    dataZingChart,
    dataWeekChartBanner
  }
}
