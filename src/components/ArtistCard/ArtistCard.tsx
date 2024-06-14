import { Link } from 'react-router-dom'
import PATH from '~/constants/path'
import Artist from '../Artist'
import { artists } from '~/types/artist'
import { formatNumberSocial } from '~/utils/formatNumber'

interface Props {
  srcImg?: string
  altImg?: string
  description?: string
  className?: string
  classNameImg?: string
  classNameFigure?: string
  classNameText?: string
  artistsData: artists[]
  hideType?: boolean
}

export default function ArtistCard({
  srcImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png',
  altImg = '',
  className = 'flex-shrink-0 flex-1',
  classNameImg = 'absolute inset-0 object-contain rounded-[4px] w-full h-full group-hover:scale-110 duration-700',
  classNameFigure = 'flex-shrink-0 flex-1 relative pt-[100%] rounded-full group w-full overflow-hidden',
  classNameText = 'text-center flex flex-col items-center mt-5 gap-y-2',
  artistsData,
  hideType = true
}: Props) {
  return (
    <div className={className}>
      <figure className={classNameFigure}>
        <Link to={`${PATH.ngheSi}/${artistsData[0].alias}`} title={altImg}>
          <img className={classNameImg} src={srcImg} alt={altImg} />
          <div className='invisible absolute inset-0 h-full w-full bg-[#00000070] group-hover:visible' />
          <div className='absolute inset-0'>
            <div
              aria-hidden
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              className='invisible absolute bottom-auto left-[50%] right-auto top-[50%] z-[90] flex h-[50px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-evenly group-hover:visible'
            >
              <button className='flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white hover:opacity-90'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth={0}
                  viewBox='0 0 256 256'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 fill-white'
                >
                  <path d='M237.66,178.34a8,8,0,0,1,0,11.32l-24,24A8,8,0,0,1,200,208V192a72.15,72.15,0,0,1-57.65-30.14l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.08,56.08,0,0,0,200,176V160a8,8,0,0,1,13.66-5.66ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.08,56.08,0,0,1,200,80V96a8,8,0,0,0,13.66,5.66l24-24a8,8,0,0,0,0-11.32l-24-24A8,8,0,0,0,200,48V64a72.15,72.15,0,0,0-57.65,30.14l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z' />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      </figure>
      <div className={classNameText}>
        {!hideType && <span className='mb-3 block text-[12px] text-[#ffffff80]'>Nghệ sĩ</span>}
        <Artist artistsData={artistsData} className='text-[14px] font-medium leading-3 text-white' />
        <span className='text-[12px] text-[#ffffff80]'>{`${formatNumberSocial(
          artistsData[0].totalFollow as number
        )} quan tâm`}</span>
      </div>
    </div>
  )
}
