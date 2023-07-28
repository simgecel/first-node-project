// console.log('Hello World!');
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')

app.use(express.json())

// routes

// Get doğrudan sayfanın kaynağına erişmek için kullandığımız istek türü

app.get('/', (req,res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req,res) => {
    res.send('Hello Blog My Name İs Simgeee')
})

// Post u veri tabanına veri eklemek için kullanıyoruz

app.post('/product',async(req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } 

    catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get('/products:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const product = await Pproduct.findById(id);
        res.status(200).json(product);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Put veri tabanında bir veriyi güncellemek veya değiştirmek için kullanıyoruz

app.put('/products/:id', async(req,res)=>{
     try {
        const{id} = req.params;
        const product= await Pproduct.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: 'ulasilamiyor ${id}'})
        }
        res.status(200).json(product);
    }
     catch (error) {
        res.status(500).json({message: error.message})
    }
    })
    
    // Delete i veri tabanından herhangi bir veriyi silmek için kullanıyoruz

app.delete('/products:id', async(req,res)=>{
    try {
        const{id} = req.params;
        const product= await Pproduct.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'ulasilamiyor ${id}'})
        }
        res.status(200).json(product);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }})
    

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://osimge112:S.c.1234@cluster0.czuxenw.mongodb.net/Node-API?retryWrites=true&w=majority')
.then( () => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')   
       });    
})
.catch( () =>{
    console.log('error')
})