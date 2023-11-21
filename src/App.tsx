import { Route, Routes } from 'react-router-dom'
import GameWindow from './components/pages/GameWindow'
import ResultsWindow from './components/pages/ResultsWindow'
import RulesWindow from './components/pages/RulesWindow'
import { useState } from 'react'
import { Results } from './types/types'




function App() {

  const [results, setResults] = useState<Results>();


  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Routes>
        <Route path='/' element={<RulesWindow />} />
        <Route path='/game' element={<GameWindow onFinishGame={(results) => setResults(results)} />} />
        <Route path='/results' element={<ResultsWindow results={results} />} />
      </Routes>
    </div>
  )
}

export default App
