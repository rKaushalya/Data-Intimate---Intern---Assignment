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
                const token = jwt.sign(user,process.env.AUTH_TOKEN,{expiresIn: '10s'});
                const refreshToken = jwt.sign(user, process.env.RE_AUTH_TOKEN, {expiresIn: '24h'});
                database.query("INSERT INTO refreshToken VALUES (?)",[refreshToken],(e,t)=>{
                    if (e) return res.json({message: "error insert token.! "+e});
                    console.log("refresh token added to database.!");
                });
                res.send({token,refreshToken});
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    getToken : function (req,res,next) {
        try {
            const refreshToken = req.body.refreshToken;
            if (refreshToken==null) res.sendStatus(401);
            if (!refreshToken.includes(refreshToken)) res.sendStatus(403);
            jwt.verify(refreshToken,process.env.RE_AUTH_TOKEN,(error,user)=>{
                if (error) res.sendStatus(403);
                const token = jwt.sign({username:user.username},process.env.AUTH_TOKEN,{expiresIn: '10s'});
                res.send({token});
            });
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    logOut : function (req, res, next) {
        try {
            const refreshToken = req.body.refreshToken;
            const sql = "DELETE FROM refreshToken WHERE  token=?";
            database.query(sql,[refreshToken],(error,result)=>{
                if (error) return res.json({message: "error insert token.! "+error});
                res.sendStatus(204);
            });
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    }
}

module.exports = UserController;