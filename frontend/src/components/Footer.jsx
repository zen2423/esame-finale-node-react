import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', py: 3, mt: 6 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Supernova GTR</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton color="inherit" component={Link} href="#" aria-label="GitHub"><GitHubIcon /></IconButton>
          <IconButton color="inherit" component={Link} href="#" aria-label="Instagram"><InstagramIcon /></IconButton>
          <IconButton color="inherit" component={Link} href="#" aria-label="X"><XIcon /></IconButton>
        </Stack>
      </Stack>
    </Box>
  )
}
