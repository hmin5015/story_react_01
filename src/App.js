import React, { Suspense, lazy } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import "./App.scss"

const Layout = React.lazy(() => import("./components/common/Layout"));
const Home = lazy(() => import("./components/Home"));
const Logs = lazy(() => import("./components/Logs"));
const Missing = lazy(() => import("./components/Missing"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="logs" element={<Logs />} />
            <Route path="*" element={<Missing />} />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
