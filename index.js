process.on('uncaughtException', console.error)
const axios = require('axios')
const mongoose = require('mongoose')
const express = require('express')
process.env.STDLOGS_NAME = 'RENDER TEST'
const { config } = require('@josejefferson/jj-stdlogs')
config.setMongoose(mongoose)


mongoose.connect(process.env.DB)

mongoose.connection.on('connecting', connecting)
mongoose.connection.on('connected', connected)
mongoose.connection.on('disconnected', disconnected)

function connecting() {
	console.log('Conectando...')
}

function connected() {
	console.log('Conectado')
}

function disconnected() {
	console.log('Desconectado')
}

setInterval(() => {
	request()
}, 1000 * 60 * 10)

function request() {
	console.log("REQUEST!")
	axios.get(process.env.URL).then(({status}) => {
		console.log(status)
	}).catch(console.error)
}

app = express()
app.listen(process.env.PORT || 3000, () => {
	console.log('Servidor rodando na porta' , process.env.PORT || 3000)
})
app.get('/', (req,res) => {
	request()
	res.send('Hi')
})
