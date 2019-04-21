const path = require('path');
const express = require('express');
const app = express()

app.get('/dist*', (req, res) => {
    res.sendFile(path.join(__dirname, '../' + req.url))
})

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/' + 'index.html'))
})

const server = app.listen(8081, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('应用实例，访问地址为 http://%s:%s', host, port)
})