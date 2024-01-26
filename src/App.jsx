import { useState } from 'react'
import './assets/dist/css/style.min.css'
import UserPage from "./components/Pages/UserPages/UserPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="main-wrapper">
          <UserPage/>
      </div>
  )
}

export default App
