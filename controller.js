const bodyParser = require('body-parser');
const Product = require('./models/Product');

let totalPrice = 0;

async function insertData(req,res) {
    console.log(req.body, "data posting");
    if (!req.body.name || !req.body.price){
        console.log("error");
        return res.status(400).send({
            message:"Please fill all the details"
        })
    }
    const obj={
        name : req.body.name,
        price : parseFloat(req.body.price)
    }

    try {
        Product.create(obj).then(() => {
            totalPrice += obj.price; // Update the total price
            res.redirect('/');
        });
    } catch (error) {
        res.status(500).send(error);
        console.log('could not send the data');
    }
}

async function deleteProduct(req, res) {
    const prodId = req.params.id;
    try {
        const product = await Product.findByPk(prodId);
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }
        const price = product.price;
        await product.destroy();
        controller.updateTotalPrice(-price); // Update the total price
        res.json({ message: "Product deleted Successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    insertData: insertData,
    deleteProduct:deleteProduct
};
