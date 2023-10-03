import { ItemSections } from './home'

export type DataChart = {
  RTChart: chart
  newRelease: ItemSections[]
  weekChart: {
    vn: itemWeekChart
    us: itemWeekChart
    korea: itemWeekChart
  }
}

export type itemWeekChart = {
  banner: string
  chartId: number
  country: string
  cover: string
  endDate: string
  group: {
    id: number
    link: string
    name: string
    type: string
  }[]
  items: ItemSections[]
  latestWeek: number
  link: string
  playlistId: string
  sectionId: string
  startDate: string
  type: string
  week: number
  year: number
}

export type chart = {
  chart: {
    items: {
      [key: string]: { time: number; hour: string; counter: number }[]
    }
    maxScore: number
    minScore: number
    times: { hour: string }[]
    totalScore: number
  }
  chartType: string
  items: ItemSections[]
  promotes: ItemSections[]
  sectionId: string
  sectionType: string
}
