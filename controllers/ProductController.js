const database = require('../db/DBConnection');

const ProductController = {
    addProduct : function (req, res, next) {
        try {
            const sql = "INSERT INTO product (`product_id`,`product_name`,`price`,`qty`) VALUES (?)";
            const value = [
                req.body.product_id,
                req.body.product_name,
                req.body.price,
                req.body.qty
            ]
            database.query(sql,[value], (error, result)=>{
                if (error) return res.json({message: "error submit data.! "+error});
                return res.json(result);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    getAllData : function (req, res, next) {
        try {
            const sql = "SELECT * FROM product";
            database.query(sql,(error, result)=>{
                if (error) return res.json({message: "error getting data "+error});
                return res.json(result);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    getDataFromId : function (req, res, next) {
        try {
            const sql = "SELECT * FROM product WHERE product_id = ?";
            const id = req.params.product_id;
            database.query(sql,[id],(error, result)=>{
                if (error) return res.json({message: "error getting data "+error});
                return res.json(result);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    updateProduct : function (req, res, next) {
        try {
            const sql = "UPDATE product SET `product_name`=?,`price`=?,`qty`=? WHERE product_id=?";
            const id = req.params.id;
            database.query(sql,[req.body.product_name,req.body.price,req.body.qty,id], (error, result)=>{
                if (error) return res.json({message: "error update data.! "+error});
                return res.json(result);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    },
    deleteProduct : function (req, res, next) {
        try {
            const sql = "DELETE FROM product WHERE product_id=?";
            const id = req.params.id;
            database.query(sql,[id], (error, result)=>{
                if (error) return res.json({message: "error delete data.! "+error});
                return res.json(result);
            })
        }catch (e) {
            console.error(e);
            res.status(500).json({error : 'Something went wrong.!'});
        }
    }
}

module.exports = ProductController;