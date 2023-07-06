import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import zingmp3Api from '~/apis/zingmp3Api'
import { DataBanner, DataNewRelease, DataPlaylist } from '~/types/home'

export default function useHome() {
  const { data: dataHome } = useQuery({
    queryKey: ['home'],
    queryFn: zingmp3Api.getHome
  })

  const dataBanner: DataBanner = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hSlider')?.items,
    [dataHome?.data.data.items]
  )
  const dataNewRelease: DataNewRelease | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionType === 'new-release'),
    [dataHome?.data.data.items]
  )
  const dataChill: DataPlaylist | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme'),
    [dataHome?.data.data.items]
  )
  const dataEnergy: DataPlaylist | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme2'),
    [dataHome?.data.data.items]
  )
  const dataRemix: DataPlaylist | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hEditorTheme3'),
    [dataHome?.data.data.items]
  )
  const dataArtists: DataPlaylist | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hArtistTheme'),
    [dataHome?.data.data.items]
  )
  const dataTop100: DataPlaylist | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'h100'),
    [dataHome?.data.data.items]
  )
  const dataAlbumHot: DataPlaylist | undefined = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hAlbum'),
    [dataHome?.data.data.items]
  )
  const dataNewReleaseChart = useMemo(
    () => dataHome?.data.data.items.find((item) => item.sectionId === 'hNewrelease'),
    [dataHome?.data.data.items]
  )
  const dataZingChart = useMemo(
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
    dataEnergy,
    dataRemix,
    dataArtists,
    dataTop100,
    dataAlbumHot,
    dataNewReleaseChart,
    dataZingChart,
    dataWeekChartBanner
  }
}
