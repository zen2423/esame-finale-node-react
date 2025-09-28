import React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useEffect, useState } from 'react'
import { fetchWikiImage } from '../api/wiki'

export default function Home() {
  const navigate = useNavigate()
  const [heroUrl, setHeroUrl] = useState('')

  useEffect(() => {
    // Try to fetch a strong visual for the GT-R
    fetchWikiImage('Nissan GT-R R35').then(url => {
      if (url) setHeroUrl(url)
    }).catch(() => {})
  }, [])
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, bgcolor: '#000' }}>
      <Box sx={{
        height: { xs: 380, md: 520 },
        backgroundImage: heroUrl
          ? `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.5)), url(${heroUrl})`
          : 'linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.5)), radial-gradient(circle at 20% 20%, #1b1b1e, #0f0f10)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 3 }}>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>Trova la tua Nissan GTR da sogno</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>Dalle leggendarie Skyline R32, R33, R34 fino alla brutale R35.</Typography>
          <Button size="large" variant="contained" color="primary" onClick={() => navigate('/catalogo')}>
            Scopri il catalogo
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
