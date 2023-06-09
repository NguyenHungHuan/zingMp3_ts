import { Outlet } from 'react-router-dom'
import AsideLeft from '~/components/AsideLeft'
import AsideRight from '~/components/AsideRight'
import Header from '~/components/Header'

export default function MainLayout() {

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex w-full h-full'>
        <div className='w-[240px] h-[100vh] bg-[#231b2e]'>
          <AsideLeft />
        </div>
        <div className='bg-[#170f23] flex-1 flex-shrink-0 overflow-y-scroll overflow-x-hidden'>
          <Header />
          <Outlet />
        </div>
        <div className='w-[330px] h-[100vh] bg-[#170f23] border-l border-l-[#ffffff1a] sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden min-[1590px]:block'>
          <AsideRight />
        </div>
      </div>
    </div>
  )
}
