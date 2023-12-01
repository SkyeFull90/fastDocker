import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

interface Warframe {
  id: number
  name: string
  rank: number
  ability: string[]
}

function App() {
  const [count, setCount] = useState(0)
  const [warframe, setWarframe] = useState([])

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        setWarframe(response.data)
      })
  }, [])
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React in Vite</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>
      <p className="read-the-docs">
        Click on the React logo to learn more. To learn more about Vite, <a href={"https://vitejs.dev/guide/"}>visit the Vite dev guide site.</a>.
      </p>
      <div>
        {warframe.map((warframe: Warframe) => (
            <div key={warframe.id}>
                <h1>{warframe.name}</h1>
                <h2>{warframe.rank}</h2>
                <h3>{warframe.ability}</h3>
             </div>
        ))}
      </div>
    </>
  )
}

export default App
