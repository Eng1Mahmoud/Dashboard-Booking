import React from 'react'
import ReactDOM from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { RouterProvider } from "react-router-dom";
import { router } from './Router'
import './App.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
          
  </React.StrictMode>,
)
