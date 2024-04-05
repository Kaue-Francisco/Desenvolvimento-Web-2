import * as mysql from 'mysql';

///////////////////////////////////////////////////////////////////////////////////

// Config Database
export const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

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