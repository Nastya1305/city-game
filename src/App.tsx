import { Route, Routes } from 'react-router-dom'
import GameWindow from './components/pages/GameWindow'
import ResultsWindow from './components/pages/ResultsWindow'
import RulesWindow from './components/pages/RulesWindow'

function App() {

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Routes>
        <Route path='/' element={<RulesWindow />} />
        <Route path='/game' element={<GameWindow />} />
        <Route path='/results' element={<ResultsWindow />} />
      </Routes>
    </div>
  )
}

export default App
