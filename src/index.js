import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from "recoil"
import "./index.scss"

const App = lazy(() => import("./App"))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <App />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  </RecoilRoot>
);