import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import { initialData, conn } from './ConfigDatabase';


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

// Route to get equipment data
app.get('/api/equipment', (req, res) => {
    const room = req.query.room;
    conn.query('SELECT e.Nome_Equipamento, e.Descricao, sa.Quantidade FROM Equipamento as e, Sala as s, Sala_Equipamento as sa WHERE s.ID_Sala = sa.ID_Sala AND s.Nome_Sala = ?', [room], (err, result) => {
        if (err) {
            console.error('Erro ao exibir o dado:', err);
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.get('/api/equipment/count', (req, res) => {
    const room = req.query.room;
    conn.query('SELECT SUM(sa.Quantidade) as Total FROM Sala_Equipamento as sa INNER JOIN Sala as s ON s.ID_Sala = sa.ID_Sala WHERE s.Nome_Sala = ?', [room], (err, result) => {
        if (err) {
            console.error('Erro ao exibir o dado:', err);
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                console.log(res.json(result[0]))
                res.json(result[0]);
            } else {
                res.json({Total: 0}); // Retorna 0 se não houver resultados
            }
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    // Config Database
    console.log(`Server is running on http://localhost:${PORT}`);
    initialData();
});