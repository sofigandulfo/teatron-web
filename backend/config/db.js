import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '22scc005',
    database: 'teatron_db'
 });

 
 const dbConnection = connection;
 dbConnection.connect((error) => {
     if (error) {
         console.log('Error de conexión en la base de datos: ', error)
        } else {
            console.log('Conexión exitosa!')
        }
    })
    
    export default connection;