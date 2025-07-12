import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter, Routes , Route} from "react-router"
import Chat from './Chat.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/chat' element={<Chat/>}/>
    </Routes>
  
    </BrowserRouter>
)
