import { Outlet } from 'react-router-dom'
import AsideLeft from '~/components/AsideLeft'
import AsideRight from '~/components/AsideRight'
import Header from '~/components/Header'

export default function MainLayout() {
  return (
    <div className='flex w-full h-full'>
      <div className='w-[240px] bg-[#231b2e] sticky h-[100vh] top-0 left-0'>
        <AsideLeft />
      </div>
      <div className='flex-1 bg-[#170f23] px-[59px]'>
        <Header />
        <Outlet />
      </div>
      <div className='w-[330px] h-[100vh] bg-[#170f23] border-l border-l-[#ffffff1a] sticky top-0 right-0 sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden min-[1590px]:block'>
        <AsideRight />
      </div>
    </div>
  )
}
