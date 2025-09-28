import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  CircularProgress,
  Box,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { compareCars } from '../api/carService';

const CarComparison = ({ carIds, onClose }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        setLoading(true);
        const response = await compareCars(carIds);
        setCars(response.data);
      } catch (err) {
        setError(err.message || 'Errore durante il caricamento del confronto');
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [carIds]);

  const displayProperties = [
    { key: 'edition', label: 'Edizione' },
    { key: 'year', label: 'Anno' },
    { key: 'price', label: 'Prezzo', format: (value) => `€${value.toLocaleString('it-IT')}` },
    { key: 'km', label: 'Chilometraggio', format: (value) => `${value.toLocaleString('it-IT')} km` },
    { key: 'powerHP', label: 'Potenza (CV)' },
    { key: 'powerKW', label: 'Potenza (kW)' },
  ];

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" component="div">
          Confronto Auto
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.text.primary,
              backgroundColor: 'rgba(255, 255, 255, 0.08)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, '&:first-of-type': { pt: 0 } }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box p={3} textAlign="center">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : cars.length === 0 ? (
          <Box p={3} textAlign="center">
            <Typography>Nessun dato disponibile per il confronto</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="Confronto auto">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    backgroundColor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    minWidth: '150px'
                  }}>
                    <Typography variant="subtitle2">Specifica</Typography>
                  </TableCell>
                  {cars.map((car) => (
                    <TableCell 
                      key={car.id} 
                      align="center"
                      sx={{ 
                        backgroundColor: theme.palette.background.default,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        minWidth: '200px'
                      }}
                    >
                      <Box display="flex" flexDirection="column" alignItems="center" p={1}>
                        <Box 
                          component="img"
                          src={car.images?.[0]} 
                          alt={car.model}
                          sx={{ 
                            width: '100%', 
                            maxWidth: '200px',
                            height: 'auto',
                            borderRadius: 1,
                            mb: 1
                          }}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          {car.model}
                        </Typography>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayProperties.map((prop) => (
                  <TableRow 
                    key={prop.key}
                    sx={{ 
                      '&:nth-of-type(odd)': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      '&:hover': {
                        backgroundColor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                      {prop.label}
                    </TableCell>
                    {cars.map((car) => (
                      <TableCell key={`${car.id}-${prop.key}`} align="center">
                        {prop.format 
                          ? prop.format(car[prop.key])
                          : car[prop.key] || 'N/D'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CarComparison;
