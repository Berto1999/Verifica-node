import Api from './helpers/api'

const apiUrl = 'http://192.168.1.231:8080'
const api = new Api(apiUrl)

const accreditamento = () => {
  return api.post('/accreditamento', { nome: 'Denis Goryaynov' })
    .then(console.log)
    .catch(console.log)
}

const es1 = () => {
  return api.get('/esercizi/1')
    .then(({ data }) => data.reduce((accumulator, value) => accumulator + value , 0))
    .then(data => api.post('/esercizi/1', { data }))
    .catch(console.log)
}

const es2 = () => {
  return api.get('/esercizi/2')
    .then(({ data }) => {
      const min = data.sort((a, b) => a- b).shift()
      const newData = data.map(value => value * min)
      return api.post('/esercizi/2', { data: newData })
    })
}

const es3 = () => {
  return api.get('/esercizi/3')
    .then(({ data }) => data.filter(value => value <= 3))
    .then(data => api.post('/esercizi/3', { data }))
}

accreditamento()
  .then(() => Promise.all([
    es1(),
    es2(),
    es3()
  ]))