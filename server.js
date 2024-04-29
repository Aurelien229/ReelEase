const express = require('express');
const cors = require('cors'); // Importez le middleware CORS
const axios = require('axios');
const app = express();


// Autorisez toutes les origines (à des fins de développement, vous pouvez restreindre les origines en production)
app.use(cors());


const API_KEY = 'a364dc0ee50f3aebe16042b7f05c109c';


app.get('/api/popular-movies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des films populaires :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Route pour récupérer les détails d'un film spécifique depuis TMDB
app.get('/api/movie/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


