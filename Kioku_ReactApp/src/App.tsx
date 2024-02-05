import './App.css'
import MapComponent from './components/Map/Map'
import ControlPanel from './components/Panel'

function App() {
  return (
    <div className='h-screen w-screen text-center relative'>
      <ControlPanel />
      <MapComponent />
    </div>
  )
}

export default App
