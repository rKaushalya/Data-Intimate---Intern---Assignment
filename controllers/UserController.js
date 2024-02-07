const database = require('../db/DBConnection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    },
    checkUser : function (req, res, next) {
        try{
            const sql = "SELECT * FROM user WHERE username=? AND password=?";
            let name = req.body.name;
            let password = req.body.password;
            database.query(sql,[name,password],(error,result)=>{
                if (error) return res.json({message: "error checking data.! "+error});
                //jwt authentication
                const user = {username:name};
                const token = jwt.sign(user,process.env.AUTH_TOKEN);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    logOut : function (req, res, next) {
        try {
            const sql = "";
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    }
}

module.exports = UserController;