import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import PATH from './constants/path'
import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('./pages/Home'))
const ZingChart = lazy(() => import('./pages/ZingChart'))
const ZingWeek = lazy(() => import('./pages/ZingWeek'))
const NewReleased = lazy(() => import('./pages/NewReleased'))
const Hub = lazy(() => import('./pages/Hub'))
const Top100 = lazy(() => import('./pages/Top100'))
const Artist = lazy(() => import('./pages/Artist'))
const Playlist = lazy(() => import('./pages/Playlist'))
const Song = lazy(() => import('./pages/Song'))
const Search = lazy(() => import('./pages/Search'))

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path={PATH.base}
            index
            element={
              <Suspense fallback={<LoadingPage />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={PATH.zingChart}
            element={
              <Suspense fallback={<LoadingPage />}>
                <ZingChart />
              </Suspense>
            }
          />
          <Route
            path={`${PATH.zingWeek}/${PATH.type}`}
            element={
              <Suspense fallback={<LoadingPage />}>
                <ZingWeek />
              </Suspense>
            }
          />
          <Route
            path={PATH.newReleased}
            element={
              <Suspense fallback={<LoadingPage />}>
                <NewReleased />
              </Suspense>
            }
          />
          <Route
            path={PATH.hub}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Hub />
              </Suspense>
            }
          />
          <Route
            path={PATH.top100}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Top100 />
              </Suspense>
            }
          />
          <Route
            path={`${PATH.ngheSi}/${PATH.nameLink}`}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Artist />
              </Suspense>
            }
          />
          <Route
            path={`${PATH.album}/${PATH.nameLink}/${PATH.id}`}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Playlist />
              </Suspense>
            }
          />
          <Route
            path={`${PATH.playlist}/${PATH.nameLink}/${PATH.id}`}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Playlist />
              </Suspense>
            }
          />
          <Route
            path={`${PATH.song}/${PATH.nameLink}/${PATH.id}`}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Song />
              </Suspense>
            }
          />
          <Route
            path={`${PATH.search}/${PATH.type}`}
            element={
              <Suspense fallback={<LoadingPage />}>
                <Search />
              </Suspense>
            }
          />
          <Route
            path={PATH.star}
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          position: 'top-right',
          style: {
            textAlign: 'center',
            padding: '10px 32px',
            color: 'white',
            borderBottom: '4px solid #E5AC1A',
            backgroundColor: 'rgba(23,15,35,0.9)'
          }
        }}
      />
    </>
  )
}

export default App

function LoadingPage() {
  return (
    <div role='status' className='flex h-screen flex-col items-center justify-center gap-2'>
      <svg
        aria-hidden='true'
        className='mr-2 h-16 w-16 animate-spin fill-[#9b4de0] text-white'
        viewBox='0 0 100 101'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor'
        />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
    </div>
  )
}

export function NotFound() {
  return (
    <div role='status' className='flex h-screen flex-col items-center justify-center gap-4'>
      <h2 className='text-7xl font-black text-[#9b4de0] md:text-9xl'>404</h2>
      <p className='text-3xl text-white'>Không tìm thấy trang</p>
    </div>
  )
}
