const express = require('express')
const { crearCancion, readCanciones, updateCancion, deleteCancion } = require('./crud')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

app.get('/canciones', (_, res) => {
  const canciones = readCanciones()
  res.status(200).json(canciones)
})

app.post('/canciones', (req, res) => {
  const { id, titulo, artista, tono } = req.body
  crearCancion({ id, titulo, artista, tono })
  res.status(201).end()
})

app.put('/canciones/:id', (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = updateCancion(id, updatedData)

  if (result === 'Actualizado con éxito') {
    res.status(200).json({ message: result })
  } else {
    res.status(404).json({ message: 'Canción no encontrada' })
  }
})

app.delete('/canciones/:id', (req, res) => {
  const id = req.params.id
  const resultado = deleteCancion(id)

  if (resultado === 'Eliminado con éxito') {
    res.status(200).json({ message: 'Canción eliminada con éxito' })
  } else {
    res.status(404).json({ message: 'Canción no encontrada' })
  }
})

app.all('*', (_, res) => {
  res.status(404).json({ code: 404, message: 'Página no encontrada' })
})

app.listen(PORT, () => {
  console.log(`Server UP: http://localhost:${PORT}`)
})
