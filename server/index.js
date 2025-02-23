
const express = require('express')
const mongosh = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const UserModel = require('./models/users')
const allowedOrigins = ['https://crud-frontend-weld.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())
const connectDB=async()=>{
    try{
        await mongosh.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Mongodb connected....')

    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
connectDB()
app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.get("/", (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('server is running');
})