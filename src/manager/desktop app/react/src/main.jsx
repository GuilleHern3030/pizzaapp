import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import './assets/styles/scroll-design.css'

import { GitHubProvider } from './context/GitHubContext.jsx'
import { CSVProvider } from './context/CSVContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GitHubProvider>
      <CSVProvider>
        <App/>
      </CSVProvider>
    </GitHubProvider>
  </React.StrictMode>,
)
