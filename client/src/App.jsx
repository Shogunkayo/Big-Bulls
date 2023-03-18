import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Home from "./components/home"


function App() {
  
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    </div>
  )
}

export default App
