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

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PATH.base} index element={<Home />} />
          <Route path={PATH.zingChart} element={<ZingChart />} />
          <Route path={PATH.newReleased} element={<NewReleased />} />
          <Route path={PATH.hub} element={<Hub />} />
          <Route path={PATH.top100} element={<Top100 />} />
          <Route path={`${PATH.ngheSi}/${PATH.nameLink}`} element={<Artist />} />
          <Route path={`${PATH.album}/${PATH.nameLink}/${PATH.id}`} element={<Playlist />} />
          <Route path={`${PATH.playlist}/${PATH.nameLink}/${PATH.id}`} element={<Playlist />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
