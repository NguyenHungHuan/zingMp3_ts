import { useState, useMemo, useRef, useCallback } from 'react'
import { DataPlaylist, ItemSections } from '~/types/home'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'

interface Props {
  dataChart?: DataPlaylist<ItemSections[]>
  className?: string
}
const Chart = ({ dataChart, className = 'h-[300px] mb-5 w-full flex-shrink-0 flex-1' }: Props) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipData, setTooltipData] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const chartRef = useRef(null)

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, annotationPlugin)

  const labels = useMemo(() => dataChart?.chart?.times.map((time) => time.hour), [dataChart?.chart?.times])
  const data = useMemo(() => {
    const datasets = {
      labels,
      datasets: [
        {
          data: dataChart?.chart?.items[Object.keys(dataChart.chart.items)[0]].map((item) => item.counter),
          borderColor: '#4a90e2',
          hoverBorderColor: '#4a90e2',
          borderWidth: 2,
          tension: 0.3
        },
        {
          data: dataChart?.chart?.items[Object.keys(dataChart.chart.items)[1]].map((item) => item.counter),
          borderColor: '#27bd9c',
          hoverBorderColor: '#27bd9c',
          borderWidth: 2,
          tension: 0.3
        },
        {
          data: dataChart?.chart?.items[Object.keys(dataChart.chart.items)[2]].map((item) => item.counter),
          borderColor: '#e35050',
          hoverBorderColor: '#e35050',
          borderWidth: 2,
          tension: 0.3
        }
      ]
    }
    return datasets
  }, [dataChart?.chart?.items, labels])

  const annotationLine = {
    id: 'annotationLine',
    beforeDraw(chart: any) {
      if (chart.tooltip._active.length && chart.tooltip._active) {
        const ctx = chart.ctx
        ctx.save()
        const activePoint = chart.tooltip._active[0].element.x

        ctx.beginPath()
        ctx.moveTo(activePoint, chart.chartArea.top)
        ctx.lineTo(activePoint, chart.chartArea.bottom)
        ctx.lineWidth = 1
        ctx.strokeStyle = chart.tooltip.labelColors[0].borderColor
        ctx.stroke()
        ctx.restore()
      }
    }
  }

  const customTooltip = useCallback(
    (context: any) => {
      if (context.tooltip.opacity === 0) {
        // hide tooltip visibilty
        setTooltipVisible(false)
        return
      }

      if ((chartRef as any).current?.canvas) {
        // enable tooltip visibilty
        setTooltipVisible(true)

        // set position of tooltip
        const left = context.tooltip.x
        const top = context.tooltip.y

        // handle tooltip multiple rerender
        if (tooltipPos?.top != top && tooltipPos?.left != left) {
          setTooltipPos({ top: top, left: left })
          setTooltipData(context.tooltip)
        }
        return
      }
    },
    [tooltipPos]
  )

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    pointBorderWidth: 0,
    pointBackgroundColor: 'transparent',
    pointHoverBackgroundColor: 'white',
    pointHoverBorderWidth: 3,
    pointHoverRadius: 5,
    interaction: {
      mode: 'nearest',
      intersect: false
    },
    title: {
      display: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        yAlign: 'bottom',
        external: customTooltip
      }
    },
    hover: {
      intersect: false,
      mode: 'dataset'
    },
    scales: {
      y: {
        min: dataChart?.chart?.minScore,
        max: dataChart?.chart?.maxScore,
        ticks: {
          display: false,
          stepSize: 3500
        },
        grid: {
          display: true,
          drawBorder: false,
          color: '#624479',
          drawTicks: false
        },
        border: {
          display: false,
          dash: [3, 4]
        }
      },
      x: {
        ticks: {
          color: '#a0a0a0',
          padding: 10,
          callback: function (index: number) {
            if (index % 2 === 0) {
              return dataChart?.chart?.times[index].hour + ':00'
            }
            return null
          }
        },
        grid: {
          display: false,
          drawTicks: false,
          color: 'transparent'
        }
      }
    }
  }

  return (
    <div className={className}>
      <Line data={data} options={options as object} plugins={[annotationLine]} ref={chartRef} />
      {tooltipPos && tooltipData && (
        <div
          className={`pointer-events-none absolute max-w-[200px] rounded p-[5px] shadow-lg hover:!visible ${
            tooltipVisible ? 'visible' : 'invisible'
          }`}
          style={{
            top: tooltipPos?.top - 10,
            left: tooltipPos?.left - (tooltipPos?.left * 100) / 1000,
            backgroundColor: (tooltipData as any)?.labelColors[0]?.borderColor
          }}
        >
          <div className='flex w-full items-center overflow-hidden text-white'>
            <div className='flex items-center'>
              {/* (tooltipData as any)?.chart?.tooltip?.dataPoints[0]?.datasetIndex = get chart's index when hover to get the current chart's data */}
              <img
                className='mr-[5px] h-10 w-10 flex-shrink-0 rounded object-cover'
                src={dataChart?.items[(tooltipData as any)?.chart?.tooltip?.dataPoints[0]?.datasetIndex]?.thumbnail}
                alt={dataChart?.items[(tooltipData as any)?.chart?.tooltip?.dataPoints[0]?.datasetIndex]?.title}
              />
            </div>
            <div className='flex flex-1 flex-col justify-center overflow-hidden font-bold leading-[1.5] text-white'>
              <span className='line-clamp-1 cursor-default text-xs'>
                {dataChart?.items[(tooltipData as any)?.chart?.tooltip?.dataPoints[0]?.datasetIndex]?.title}
              </span>
              <span className='line-clamp-1 text-[10px] font-normal text-[#ffffffcc]'>
                {dataChart?.items[(tooltipData as any)?.chart?.tooltip?.dataPoints[0]?.datasetIndex]?.artistsNames}
              </span>
            </div>
            <div className='ml-[10px] flex-[0_0_auto] text-base font-bold leading-[1.56] text-white'>
              <span>
                {Math.round(
                  (Number((tooltipData as any)?.chart?.tooltip?.body[0]?.lines[0].replace(',', '')) /
                    Number(dataChart?.chart?.totalScore)) *
                    100
                )}
                %
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chart
