import { useState } from 'react'
import { BrowserRouter,Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import Article from './pages/Article'
function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryName" element={<Home />} />
        <Route path="article/:id" element={<Article />} />
      </Route>
    </Routes>
  )
}

export default App
