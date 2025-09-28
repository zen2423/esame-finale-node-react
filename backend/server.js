require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const { cars } = require('./data/cars');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory store for contact messages
const contacts = [];

// Email configuration via Resend API
// Provide RESEND_API_KEY in .env to enable email sending
const MAIL_TO = process.env.MAIL_TO || 'vjairuznixon@gmail.com';
const RESEND_FROM = process.env.RESEND_FROM || 'Supernova GTR <onboarding@resend.dev>';
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Routes
app.get('/api/cars', (req, res) => {
  // Optional query filters: year, maxPrice, edition
  const { year, maxPrice, edition } = req.query;
  let result = cars;

  if (year) {
    result = result.filter(c => String(c.year) === String(year));
  }
  if (maxPrice) {
    const p = Number(maxPrice);
    if (!Number.isNaN(p)) result = result.filter(c => c.price <= p);
  }
  if (edition) {
    const e = String(edition).toUpperCase();
    result = result.filter(c => c.edition.toUpperCase() === e);
  }

  res.json(result);
});

app.get('/api/cars/compare', (req, res) => {
  const { ids } = req.query;
  
  if (!ids) {
    return res.status(400).json({ message: 'Inserisci gli ID delle auto da confrontare' });
  }

  const idList = ids.split(',');
  if (idList.length < 2 || idList.length > 3) {
    return res.status(400).json({ message: 'Seleziona da 2 a 3 auto da confrontare' });
  }

  const comparedCars = idList
    .map(id => cars.find(car => car.id === id))
    .filter(Boolean); // Rimuove eventuali ID non validi

  if (comparedCars.length !== idList.length) {
    return res.status(404).json({ message: 'Una o più auto non sono state trovate' });
  }

  res.json(comparedCars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === req.params.id);
  if (!car) return res.status(404).json({ message: 'Auto non trovata' });
  res.json(car);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nome, email e messaggio sono obbligatori' });
  }
  const entry = {
    id: `contact_${Date.now()}`,
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };
  contacts.push(entry);
  
  // Prova a inviare email via Resend se configurato
  if (resend) {
    resend.emails.send({
      from: RESEND_FROM,
      to: MAIL_TO,
      subject: `Nuova richiesta contatto - Supernova GTR (${name})`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}\n\nRicevuto: ${entry.createdAt}`,
    })
      .then(() => {
        res.status(201).json({ message: 'Messaggio ricevuto e inviato via email', entry, emailed: true });
      })
      .catch((err) => {
        console.error('Errore invio email:', err);
        res.status(201).json({ message: 'Ricevuto (email non inviata)', entry, emailed: false });
      });
  } else {
    res.status(201).json({ message: 'Ricevuto (invio email disabilitato)', entry, emailed: false });
  }
});

app.get('/api/contacts', (req, res) => {
  // Espone i contatti per scopi di demo/test
  res.json(contacts);
});

app.get('/', (req, res) => {
  res.send('Supernova GTR API is running');
});

app.listen(PORT, () => {
  console.log(`Supernova GTR backend in esecuzione su http://localhost:${PORT}`);
});
