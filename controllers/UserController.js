const database = require('../db/DBConnection');

const UserController = {
    saveUser : function (req, res, next) {
        try{
            const sql = "INSERT INTO user VALUES (?,?,?)";
            let id = req.body.id;
            let name = req.body.name;
            let password = req.body.password;
            database.query(sql,[id,name,password],(error,result)=>{
                if (error) return res.json({message: "error submit data.! "+error});
                return res.json(result);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    }
}

module.exports = UserController;