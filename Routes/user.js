const {Router} = require('express');
const {User} = require('../Models/user');
const { Blog } = require('../Models/blog');
const multer = require('multer');

const router = Router();

// ! Using multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./Public/uploads');
    },
    filename: function (req, file, cb) {
      // Use file.originalname to get the original file name
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  });

const upload = multer({ storage: storage })


router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.get('/login',(req,res)=>{
    return res.render('login');
})

router.post('/signup',upload.single('profile'),async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        await User.create({name,email,password,profilePhotoURL:`/uploads/${req.file.filename}`});
        return res.redirect('login');    
    } catch (error) {
        return res.render('signup',{error : "User already exists"});
    }

})

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try {
    const token = await User.matchingPasswordAndGeneratingToken(email,password);
    return res.cookie("token",token).redirect('/');
        
    } catch (error) {
    return res.render('login',{error:'Incorrect email or password'})    
    }
    
})

router.get('/logout',async(req,res)=>{
    
    const allBlog = await Blog.find({}).populate("writtenBy");
    return res.clearCookie("token").render('home',
    {blogs : allBlog}
    );
})

router.get('/viewUser/:id',async (req,res)=>{
    const viewUser = await User.findById(req.params.id);
    const blogs = await Blog.find({writtenBy : req.params.id});
    return res.render("viewUser",{
        viewUser,
        blogs
    })
})
module.exports = router;