import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import client from '../api/client'

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const { data } = await client.get(`/cars/${id}`)
        setCar(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Typography>Caricamento...</Typography>
  if (!car) return <Typography>Auto non trovata.</Typography>

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{car.edition} • {car.year}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={1}>
            {car.images?.map((src, idx) => (
              <Grid key={idx} item xs={12} sm={idx === 0 ? 12 : 6}>
                <Paper sx={{ overflow: 'hidden', borderRadius: 2 }}>
                  <img src={src} alt={`${car.edition}-${idx}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Specifiche</Typography>
            <Stack spacing={1}>
              <Spec label="Modello" value={car.model} />
              <Spec label="Anno" value={car.year} />
              <Spec label="Chilometraggio" value={`${car.km.toLocaleString('it-IT')} km`} />
              <Spec label="Potenza" value={`${car.powerHP} hp (${car.powerKW} kW)`} />
              <Spec label="Prezzo" value={car.price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })} />
            </Stack>
            <Button onClick={() => navigate(`/contatti?carId=${encodeURIComponent(car.id)}`)} fullWidth sx={{ mt: 2 }} size="large" variant="contained" color="primary">
              Richiedi info
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

function Spec({ label, value }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography color="text.secondary" sx={{ minWidth: 160 }}>{label}:</Typography>
      <Typography>{value}</Typography>
    </Stack>
  )
}
