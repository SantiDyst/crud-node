const conexion = require ('../database/db');

//Crear Usuario 
exports.save = (req,res)=>{

    const user = req.body.user;
    const rol= req.body.rol;
    const gender = req.body.gender;
    const monthly_salary = req.body.monthly_salary;
    const email= req.body.email;
    
    


    //avatar de usuarios
    let image= null;
    const imageFemenino = '/images/female_avatar.png';
    const imageMasculino = '/images/male_avatar.png';


    if (gender === 'femenino'){
        image=imageFemenino;
    }   else if (gender === 'masculino'){
        image = imageMasculino;
    }
    conexion.query('INSERT INTO users SET ?',{user:user,gender:gender,monthly_salary:monthly_salary,rol:rol,image:image,email:email },(error,results)=>{
        if(error){
            console.log(error);
        }else{ 
            res.redirect('/');
        }
    }
    )
};


    exports.update = (req, res) => {
        const id = req.body.id;
        const user = req.body.user;
        const gender = req.body.gender;
        const monthly_salary = req.body.monthly_salary;
        const email= req.body.email;
    
        if (!gender || !['femenino', 'masculino'].includes(gender)) {
            return res.status(400).send('Género inválido');
        }
    
        if (isNaN(monthly_salary)) {
            return res.status(400).send('Salario inválido');
        }
    
        
        conexion.query('UPDATE users SET user=?, gender=?, monthly_salary=? WHERE id=?', [email,user, gender, monthly_salary, id], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error al actualizar usuario');
            } else {
                res.redirect('/');
            }
        });
    };