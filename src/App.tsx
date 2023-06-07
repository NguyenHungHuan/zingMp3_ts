import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import PATH from './constants/path'
import ZingChart from './pages/ZingChart'
import Radio from './pages/Radio'
import Library from './pages/Library'
import NewReleased from './pages/NewReleased'
import Hub from './pages/Hub'
import Top100 from './pages/Top100'

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PATH.home} index element={<Home />} />
          <Route path={PATH.zingChart} element={<ZingChart />} />
          <Route path={PATH.radio} element={<Radio />} />
          <Route path={PATH.thuVien} element={<Library />} />
          <Route path={PATH.newReleased} element={<NewReleased />} />
          <Route path={PATH.hub} element={<Hub />} />
          <Route path={PATH.top100} element={<Top100 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
