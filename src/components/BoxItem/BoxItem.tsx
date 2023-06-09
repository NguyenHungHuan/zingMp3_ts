import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { artists } from '~/types/home'

interface Props {
  srcImg?: string
  altImg?: string
  description?: string
  artists?: Array<any>
  hideLike?: boolean
  hideOption?: boolean
  classNameDesc?: string
  isLink?: boolean
  classNameArtist?: string
}

export default function BoxItem({
  srcImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png',
  altImg = 'Thumbnail',
  description = '',
  hideLike = false,
  hideOption = false,
  artists = undefined,
  isLink = false,
  classNameDesc = 'line-clamp-2 mt-3 text-[#ffffff80] text-sm font-normal whitespace-normal',
  classNameArtist = 'text-[#ffffff80] text-sm font-normal overflow-hidden block line-clamp-1 break-words'
}: Props) {
  const classNameDescription = description === '' ? 'hidden' : classNameDesc
  const classNameArtistLocal = artists === undefined ? 'hidden' : classNameArtist

  return (
    <div className='flex-shrink-0 flex-1'>
      <figure className='flex-shrink-0 flex-1 relative pt-[100%] rounded-[4px] group w-full cursor-pointer overflow-hidden'>
        <img
          className='absolute inset-0 object-contain rounded-[4px] w-full h-full group-hover:scale-110 duration-700'
          src={srcImg}
          alt={altImg}
        />
        <div className='bg-[#00000060] absolute invisible group-hover:visible inset-0 w-full h-full'></div>
        <div className='absolute inset-0 w-full h-full flex items-center justify-evenly invisible group-hover:visible'>
          {!hideLike && (
            <button className='flex items-center justify-center rounded-full p-[5px] hover:bg-[#dfcccc60]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='white'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                />
              </svg>
            </button>
          )}
          <button className='hover:opacity-90 flex items-center justify-center rounded-full w-[45px] h-[45px] border border-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='white'
              viewBox='0 0 24 24'
              strokeWidth={1}
              stroke='white'
              className='w-7 h-7 pl-[3px] pb-[1px]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
              />
            </svg>
          </button>
          {!hideOption && (
            <button className='flex items-center justify-center rounded-full p-[5px] hover:bg-[#dfcccc60]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='white'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke={'white'}
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </button>
          )}
        </div>
      </figure>
      {isLink ? (
        <Link to={'/'} className={classNameDescription + ' hover:text-[#c273ed]'}>
          {description}
        </Link>
      ) : (
        <h3 className={classNameDescription}>{description}</h3>
      )}
      <h3 className={classNameArtistLocal}>
        {artists && artists.length > 1 ? (
          artists.slice(0, 3).map((artist: artists, index: number) => (
            <Fragment key={artist.id}>
              {index !== 0 && ', '}
              <Link className='inline hover:text-[#c273ed] hover:underline' to='/'>
                {artist.name}
              </Link>
              {Number(index) === 2 && '...'}
            </Fragment>
          ))
        ) : (
          <Link className='text-[#ffffff80] inline-block text-sm hover:text-[#c273ed] hover:underline' to='/'>
            {artists && artists[0].name}
          </Link>
        )}
      </h3>
    </div>
  )
}
