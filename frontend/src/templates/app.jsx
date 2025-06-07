import { useState } from 'react'
import '../static/app.css'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Header from './header';
import ProductsPage from './products_page';
import AuthPage from './auth';

function App() {
  return (
   <Router>
  <Routes>
    <Route path='/' element={
      <>
        <Header />
        <ProductsPage />
      </>
    } />

    <Route path='/login' element={<AuthPage />} />
  </Routes>
</Router>
  )
}

export default App
