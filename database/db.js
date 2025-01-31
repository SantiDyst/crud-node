const mysql= require ('mysql2');

const conexion = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password:'dugar123',
    database:'crud_node'

})

conexion.connect((error)=> {
if (error){
    console.error('El error de la conexion es:'+error );
    return
}

console.log ('¡Conectado a la BD MySQL!');

} )

module.exports = conexion;

