import React, { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import client from '../api/client'
import CarComparison from '../components/CarComparison'

export default function Catalog() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ year: '', maxPrice: '', edition: '' })
  const [selectedCars, setSelectedCars] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  const editions = ['R32', 'R33', 'R34', 'R35']

  const years = useMemo(() => {
    const ys = new Set()
    cars.forEach(c => ys.add(c.year))
    return Array.from(ys).sort((a,b)=>a-b)
  }, [cars])

  const fetchCars = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.year) params.year = filters.year
      if (filters.maxPrice) params.maxPrice = filters.maxPrice
      if (filters.edition) params.edition = filters.edition
      const { data } = await client.get('/cars', { params })
      setCars(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCars() }, [])

  const applyFilters = (e) => {
    e.preventDefault()
    fetchCars()
  }

  const toggleCarSelection = (carId) => {
    setSelectedCars(prev => {
      if (prev.includes(carId)) {
        return prev.filter(id => id !== carId);
      } else if (prev.length < 3) {
        return [...prev, carId];
      }
      return prev;
    });
  };

  const openComparison = () => setShowComparison(true);
  const closeComparison = () => setShowComparison(false);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Catalogo Auto
      </Typography>
      
      <Box component="form" onSubmit={applyFilters} sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            select
            label="Edizione"
            value={filters.edition}
            onChange={(e) => setFilters({...filters, edition: e.target.value})}
            sx={{ minWidth: 120 }}
            size="small"
          >
            <MenuItem value="">Tutte</MenuItem>
            {editions.map(edition => (
              <MenuItem key={edition} value={edition}>{edition}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            label="Anno"
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: e.target.value})}
            sx={{ minWidth: 120 }}
            size="small"
          >
            <MenuItem value="">Tutti</MenuItem>
            {years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            label="Prezzo massimo (€)"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            sx={{ width: 180 }}
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
          />
          
          <Button type="submit" variant="contained" color="primary">
            Applica Filtri
          </Button>
          
          {selectedCars.length > 0 && (
            <Button 
              variant="contained" 
              color="secondary"
              onClick={openComparison}
              sx={{ ml: 'auto' }}
            >
              Confronta ({selectedCars.length})
            </Button>
          )}
        </Stack>
      </Box>

      {loading ? (
        <Box textAlign="center" py={4}>
          <Typography>Caricamento in corso...</Typography>
        </Box>
      ) : cars.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography>Nessun veicolo trovato con i filtri selezionati.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={car.images?.[0] || '/placeholder-car.jpg'}
                  alt={car.model}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {car.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Anno: {car.year}<br />
                    Prezzo: €{car.price.toLocaleString('it-IT')}<br />
                    Potenza: {car.powerHP} CV
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={selectedCars.includes(car.id)}
                        onChange={() => toggleCarSelection(car.id)}
                        disabled={!selectedCars.includes(car.id) && selectedCars.length >= 3}
                        color="primary"
                      />
                    }
                    label={`${selectedCars.includes(car.id) ? 'Selezionato' : 'Seleziona'}`}
                  />
                  <Button 
                    component={RouterLink} 
                    to={`/auto/${car.id}`}
                    size="small"
                    color="primary"
                  >
                    Dettagli
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {showComparison && selectedCars.length > 0 && (
        <CarComparison 
          carIds={selectedCars} 
          onClose={closeComparison} 
        />
      )}
    </Box>
  )
}
