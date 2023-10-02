const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

const getCanciones = () => {
  const data = fs.readFileSync('./db/repertorio.json', 'utf-8')
  return JSON.parse(data)
}

const setCanciones = (canciones) => {
  fs.writeFileSync('./db/repertorio.json', JSON.stringify(canciones, null, 2))
}

const crearCancion = (cancion) => {
  const canciones = getCanciones()
  cancion.id = uuidv4()
  canciones.push(cancion)
  setCanciones(canciones)
  return 'Exito'
}

const readCanciones = () => getCanciones()

const readCancion = (id) => getCanciones().find((c) => c.id === id)

const updateCancion = (id, updatedData) => {
  const canciones = getCanciones()
  const index = canciones.findIndex((c) => c.id === id)

  if (index !== -1) {
    canciones[index] = { ...canciones[index], ...updatedData }
    setCanciones(canciones)
    return 'Actualizado con éxito'
  } else {
    return 'Canción no encontrada'
  }
}

const deleteCancion = (id) => {
  const canciones = getCanciones()
  const index = canciones.findIndex((c) => c.id === id)

  if (index !== -1) {
    canciones.splice(index, 1)
    setCanciones(canciones)
    return 'Eliminado con éxito'
  } else {
    return 'Canción no encontrada'
  }
}

module.exports = {
  crearCancion,
  readCanciones,
  readCancion,
  updateCancion,
  deleteCancion
}
