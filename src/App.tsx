import GameWindow from './components/GameWindow'
import ResultsWindow from './components/ResultsWindow'
import RulesWindow from './components/RulesWindow'

function App() {

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* <RulesWindow /> */}
      <GameWindow />
      {/* <ResultsWindow /> */}
    </div>
  )
}

export default App
