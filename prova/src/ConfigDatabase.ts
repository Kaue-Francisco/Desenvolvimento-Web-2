import * as mysql from 'mysql';

// Config Database
export const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'escola',
});

export const initialData = async () => {
  await conn.query(`INSERT INTO Sala (Nome_Sala, Localizacao) VALUES
  ('Sala de Aula 101', 'Prédio A - 1º Andar'),
  ('Laboratório de Informática 201', 'Prédio B - 2º Andar'),
  ('Biblioteca Central', 'Prédio C - Térreo'),
  ('Auditório Principal', 'Prédio D - 1º Andar');
  `);

  await conn.query(`INSERT INTO Equipamento (Nome_Equipamento, Descricao) VALUES
  ('Projetor Multimídia', 'Projetor de alta resolução com conexão HDMI'),
  ('Computador Desktop', 'Computador com processador i7, 16GB RAM, SSD 256GB'),
  ('Cadeira Ergonômica', 'Cadeira com ajuste de altura e encosto reclinável'),
  ('Mesa para Computador', 'Mesa com espaço para monitor, teclado e mouse');
  `);

  await conn.query(`INSERT INTO Sala_Equipamento (ID_Sala, ID_Equipamento, Quantidade) VALUES
  (1, 1, 2),
  (2, 2, 20),
  (3, 3, 50),
  (4, 4, 10);
  `);
}

export const connectionDb = async () => {
  /**
   * Method to create connection with database.
   */

  conn.connect((err) => {
    if (err) {
      console.error('Error connection database:', err);
      return;
    }
    console.log('Connetion with database!');
    return conn
  });
}

export const endConnection = async () => {
  /**
   * Method to close connection with Database.
   */

  conn.end();
  console.log('Connection with database closed sucessfully.')
}