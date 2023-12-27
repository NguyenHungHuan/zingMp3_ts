import { Outlet } from 'react-router-dom'
import AsideLeft from '~/components/AsideLeft'
import AsideRight from '~/components/AsideRight'
import Header from '~/components/Header'
import { useState, useRef, useEffect } from 'react'

export default function MainLayout() {
  const [header, setHeader] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<Element>()
  const el = useRef<HTMLDivElement>(null)

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
    <div className='flex h-screen w-full'>
      <div className='h-full w-[240px] bg-[#231b2e]'>
        <AsideLeft />
      </div>
      <div ref={el} className='main flex-1 flex-shrink-0 overflow-x-hidden overflow-y-scroll bg-[#170f23]'>
        <header
          className={`sticky top-0 z-[100] mx-[-2px] px-[59px] ${
            header
              ? 'bg-[#170f23cc] shadow-[0_3px_5px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:backdrop-blur-[50px] before:content-[""]'
              : 'bg-transparent'
          }`}
        >
          <Header />
        </header>
        <Outlet />
      </div>
      <div className='h-full w-[330px] border-l border-l-[#ffffff1a] bg-[#170f23] sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden min-[1590px]:block'>
        <AsideRight />
      </div>
    </div>
  )
}
