import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CarDetail from './pages/CarDetail'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ flex: 1, pt: 3, pb: 6 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/auto/:id" element={<CarDetail />} />
          <Route path="/contatti" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  )
}
