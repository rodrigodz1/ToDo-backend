const express = require('express')
const app = express()
const port = 3333
const cors = require("cors");

app.use(cors());
app.options("*", cors());

app.use(express.json());

const authRouter = require('./routes/authRoute')
const taskRouter = require('./routes/taskRoute')

app.use("/auth", authRouter)
app.use("/task", taskRouter)

app.get('/', (req, res) => {
    res.send('Backend do trabalho de segurança.')
})


app.listen(process.env.PORT || port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})