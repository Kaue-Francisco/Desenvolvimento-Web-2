import * as mysql from 'mysql';

///////////////////////////////////////////////////////////////////////////////////

// Config Database
export const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'escola',
});

export const insertData = async () => {
  await conn.query(`INSERT INTO Sala (Nome_Sala, Localizacao) VALUES
  ('Sala 1', 'Local 1'),
  ('Sala 2', 'Local 2'),
  ('Sala 3', 'Local 3'),
  ('Sala 4', 'Local 4');
  `);

  await conn.query(`INSERT INTO Equipamento (Nome_Equipamento, Descricao) VALUES
  ('Equipamento 1', 'Descricao 1'),
  ('Equipamento 2', 'Descricao 2'),
  ('Equipamento 3', 'Descricao 3'),
  ('Equipamento 4', 'Descricao 4');
  `);

  await conn.query(`INSERT INTO Sala_Equipamento (ID_Sala, ID_Equipamento, Quantidade) VALUES
  (1, 1, 10),
  (2, 2, 20),
  (3, 3, 30),
  (4, 4, 40);
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

///////////////////////////////////////////////////////////////////////////////////