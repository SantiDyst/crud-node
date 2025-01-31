const express = require ('express');
const conexion = require('./database/db');
const router = express.Router ();



router.get('/',(req,res)=> {
   
     conexion.query( 'SELECT * FROM users', (error,results)=>{
         if (error){
            throw error;
         }else{
            res.render('index.ejs',{results:results});
         }

     } )

 })


    // RUTA PARA CREAR REGISTROS 
      router.get('/create',(req,res)=>{
         res.render('create' );

      })

   // RUTA PARA EDITAR REGISTROS 
     router.get('/edit/:id',(req,res)=>{
      const id = req.params.id;
      conexion.query('SELECT * FROM users WHERE id=?',[id],(error,results)=>{
         if(error){
            throw error;

         }else {
            res.render('edit',{user:results[0]});
         }

         
      })

     } )






const crud = require ('./controler/crud');
router.post('/save',crud.save)



module.exports = router;