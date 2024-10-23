import classNames from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AsideLeft from '~/components/AsideLeft'
import AsideRight from '~/components/AsideRight'
import Header from '~/components/Header'
import Player from '~/components/Player'
import { AppContext } from '~/contexts/app.context'
import useScrollTop from '~/hooks/useScrollTop'

export default function MainLayout() {
  const [header, setHeader] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<Element>()
  const el = useRef<HTMLDivElement>(null)
  const { stateAsideRight, stateIdSong } = useContext(AppContext)
  const { pathname } = useLocation()
  useScrollTop([pathname])

  useEffect(() => {
    if (el.current) {
      setScrollY(document.getElementsByClassName('main')[0])
    }
  }, [el])

  const handleChangeHeader = () => {
    if (scrollY && scrollY.scrollTop >= 20) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  scrollY && scrollY.addEventListener('scroll', handleChangeHeader)

  return (
    <div className='flex h-screen w-full overflow-x-hidden'>
      <div className='h-full w-[70px] bg-[#231b2e] xl:w-[240px]'>
        <AsideLeft />
      </div>
      <div
        ref={el}
        className={`main flex-1 flex-shrink-0 overflow-x-hidden overflow-y-scroll bg-[#170f23] ${
          stateIdSong !== '' && 'mb-[90px]'
        }`}
      >
        <header
          className={classNames(
            `sticky top-0 z-[100] mx-[-2px] px-[59px] ${
              header
                ? 'bg-[#170f23cc] shadow-[0_3px_5px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:backdrop-blur-[50px] before:content-[""]'
                : 'bg-transparent'
            }`
          )}
        >
          <Header />
        </header>
        <div className='px-[59px]'>
          <Outlet />
        </div>
      </div>
      {stateAsideRight && (
        <div className='right-0 top-0 z-[110] h-full w-[330px] overflow-y-auto border-l border-l-[#ffffff1a] bg-[#170f23] sm:absolute md:absolute lg:absolute xl:absolute 2xl:absolute min-[1680px]:relative'>
          <AsideRight />
        </div>
      )}
      {stateIdSong !== '' && <Player />}
    </div>
  )
}
