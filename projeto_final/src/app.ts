import { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';

///////////////////////////////////////////////////////////////////////////////////

// Define as variáveis para requisição
import express from 'express';
const app: Express = express();
const PORT: number = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true}))


app.get('/', (req: Request, res: Response) => {
    res.render('index');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})