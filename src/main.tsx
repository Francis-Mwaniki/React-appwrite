import React from 'react'
import ReactDOM from 'react-dom/client'
import Application from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
    <Application />
  </React.StrictMode>,
)
