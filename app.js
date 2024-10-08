require('dotenv').config()
const express = require('express');
const path = require('path');
const userRoutes = require('./Routes/user');
const blogRoutes = require('./Routes/blog');
const {Blog} = require('./Models/blog');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');const { checkAuthenticationCookie } = require('./Middlewares/authentication');

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("connected sucessfully")})


app.use(cookieParser());
app.use(checkAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')))

app.set('view engine','ejs');
app.set('views',path.resolve('./View'))

app.get('/',async (req,res)=>{
    const allBlog = await Blog.find({}).populate("writtenBy");
    return res.render('home',{
        user : req.user,
        blogs : allBlog
    });
})

app.use(express.urlencoded({extended : false}));


app.use('/user',userRoutes);

app.use('/blog',blogRoutes);

app.listen(PORT,()=>console.log(`Server started at PORT : ${PORT}`));

