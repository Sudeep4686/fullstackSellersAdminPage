const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller');

const sequelize = require('./util/database');

const Product = require('./models/Product');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync()
    .then(()=>{
        console.log('details synchronised with database');
    })
    .catch((error)=>{
        console.log("failed to sync the data with the database");
    });

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'form.html'));
});


app.post('/submit-form', controller.insertData);

app.get('/products',async (req,res)=>{
    try{
        const products = await Product.findAll();
        console.log(products, 'data is found');
        res.status(200).send(products);
    }catch(err) {
        console.log(err,"Error is found here");
        res.status(500).send('Something went Wrong');
    };
});

app.delete('/product/delete-product/:id', controller.deleteProduct);


app.get('/total-price', (req, res) => {
    const totalPrice = controller.getTotalPrice();
    res.send(`Total Price: $${totalPrice.toFixed(2)}`);
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(5020);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });