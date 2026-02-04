import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'

const HomePage = React.lazy(() => import('./components/Hero').then(m => ({ default: m.default })));
const ProductsOverview = React.lazy(() => import('./components/ProductsOverview'));

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsOverview />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App
