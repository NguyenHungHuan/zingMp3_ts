import { Outlet } from 'react-router-dom'
import AsideLeft from '~/components/AsideLeft'
import AsideRight from '~/components/AsideRight'
import Header from '~/components/Header'

export default function MainLayout() {
  return (
    <div className='flex h-screen w-full flex-col'>
      <div className='flex h-full w-full'>
        <div className='h-[100vh] w-[240px] bg-[#231b2e]'>
          <AsideLeft />
        </div>
        <div className='flex-1 flex-shrink-0 overflow-x-hidden overflow-y-scroll bg-[#170f23]'>
          <Header />
          <Outlet />
        </div>
        <div className='h-[100vh] w-[330px] border-l border-l-[#ffffff1a] bg-[#170f23] sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden min-[1590px]:block'>
          <AsideRight />
        </div>
      </div>
    </div>
  )
}
