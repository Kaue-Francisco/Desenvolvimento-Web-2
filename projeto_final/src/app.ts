import { Express } from 'express';
import { gerarDados } from './server';
import bodyParser from 'body-parser';
import * as path from 'path';
import express from 'express';
import routes from './routes';
import expressLayouts from 'express-ejs-layouts';

///////////////////////////////////////////////////////////////////////////////////

// Define as variáveis para requisição
const app: Express = express();
const PORT: number = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

// Importa as rotas definidas no arquivo separado
app.use(routes);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await gerarDados();
});
