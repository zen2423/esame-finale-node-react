import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import client from '../api/client'

export default function Contact() {
  const [params] = useSearchParams()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const carId = params.get('carId')
    if (carId) {
      setForm(f => ({ ...f, message: `Ciao, vorrei informazioni sulla vettura con id: ${carId}. Grazie!` }))
    }
  }, [params])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus({ type: '', text: '' })
    try {
      await client.post('/contact', form)
      setStatus({ type: 'success', text: 'Richiesta inviata con successo! Ti contatteremo al più presto.' })
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      console.error(e)
      setStatus({ type: 'error', text: 'Si è verificato un errore. Riprova.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 640, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Contatti</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Compila il modulo per richiedere informazioni.
      </Typography>

      {status.type && (
        <Alert severity={status.type} sx={{ mb: 2 }}>{status.text}</Alert>
      )}

      <TextField
        label="Nome"
        value={form.name}
        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Messaggio"
        value={form.message}
        onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
        fullWidth
        required
        multiline
        minRows={4}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary" disabled={submitting}>
        {submitting ? 'Invio…' : 'Invia'}
      </Button>
    </Box>
  )
}
