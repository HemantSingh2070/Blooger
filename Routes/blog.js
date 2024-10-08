const {Router} = require('express')
const {Blog} = require('../Models/blog')
const multer = require('multer');
const router = Router();
const path = require('path');

// ! Using multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./Public/uploads'));
  },
  filename: function (req, file, cb) {
    // Use file.originalname to get the original file name
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

  
const upload = multer({ storage: storage })


// ! Get to the add blogpage

router.get('/addBlog',(req,res)=>{
    return res.render('addBlog',{
        user : req.user,
    });
});

// ! Rendering View of the blog

router.get("/:id",async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("writtenBy");
  return res.render('viewBlog',{
    user : req.user,
    blog : blog
  })
})

// ! POST the post   

router.post('/addBlog',upload.single('coverImage'),async (req,res)=>{
     const {title,content}=req.body;
    
     await Blog.create({
     title,
     content,
     writtenBy : req.user._id,
     titleImg : `/uploads/${req.file.filename}`
     })
    const allBlog = await Blog.find({}).populate("writtenBy");

     return res.render('home',{
        user : req.user,
        blogs : allBlog
     });
})

router.get("/delete/:id",async (req,res)=>{
  await Blog.findByIdAndDelete(req.params.id);
  
  const allBlog = await Blog.find({}).populate("writtenBy");

  return res.render('home',{
     user : req.user,
     blogs : allBlog
  });
})

module.exports = router;