import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import { insertData, getData } from './server';

///////////////////////////////////////////////////////////////////////////////////

// Define as variáveis para requisição
const express = require('express');
const app: Express = express();
const PORT: number = 3000;

// Define o template que sera usado
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true}))

///////////////////////////////////////////////////////////////////////////////////

// Routes

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.get('/horario', (req: Request, res: Response) => {
    res.render('horario');
});

app.get('/agendamentos', async (req: Request, res: Response) => {
    const agenData = await getData();
    res.render('agendamentos', { data: agenData });
});

app.post('/agendar', (req: Request, res: Response) => {
    // Pegar as informções do agendamento.
    const formData = req.body
    insertData(formData);
    res.redirect('/horario');
});

///////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    // Config Database
    

    console.log(`Server is running on http://localhost:${PORT}`);
});