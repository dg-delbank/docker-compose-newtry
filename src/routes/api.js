const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/', (req, res) => {
  res.status(200).send('API está funcionando!');
});

router.get('/usuario/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;