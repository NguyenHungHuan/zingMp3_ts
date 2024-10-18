import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import PATH from './constants/path'
import ZingChart from './pages/ZingChart'
import NewReleased from './pages/NewReleased'
import Hub from './pages/Hub'
import Top100 from './pages/Top100'
import Playlist from './pages/Playlist'
import Artist from './pages/Artist'
import ZingWeek from './pages/ZingWeek'
import Search from './pages/Search'
import { Toaster } from 'react-hot-toast'
import Song from '~/pages/Song'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PATH.base} index element={<Home />} />
          <Route path={PATH.zingChart} element={<ZingChart />} />
          <Route path={`${PATH.zingWeek}/${PATH.type}`} element={<ZingWeek />} />
          <Route path={PATH.newReleased} element={<NewReleased />} />
          <Route path={PATH.hub} element={<Hub />} />
          <Route path={PATH.top100} element={<Top100 />} />
          <Route path={`${PATH.ngheSi}/${PATH.nameLink}`} element={<Artist />} />
          <Route path={`${PATH.album}/${PATH.nameLink}/${PATH.id}`} element={<Playlist />} />
          <Route path={`${PATH.playlist}/${PATH.nameLink}/${PATH.id}`} element={<Playlist />} />
          <Route path={`${PATH.song}/${PATH.nameLink}/${PATH.id}`} element={<Song />} />
          <Route path={`${PATH.search}/${PATH.type}`} element={<Search />} />
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
