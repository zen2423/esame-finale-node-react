import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 900 }}>
          Supernova GTR
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={RouterLink} to="/" color={pathname === '/' ? 'primary' : 'inherit'}>Home</Button>
          <Button component={RouterLink} to="/catalogo" color={pathname.startsWith('/catalogo') ? 'primary' : 'inherit'}>Catalogo</Button>
          <Button component={RouterLink} to="/contatti" color={pathname.startsWith('/contatti') ? 'primary' : 'inherit'}>Contatti</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
