const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://rajeshwari:prabhukijai@cluster0.sqbo3.mongodb.net/e-commercee")



app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({storage: storage})


app.use('/images', express.static('upload/images'));


// midlwaare
const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
  };
  


app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})
  

const Product = mongoose.model("Product", {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number
    },
    old_price: {
      type: Number
    },
    date: {
      type: Date,
      default: Date.now,
    },
    avilable: {
      type: Boolean,
      default: true,
    },
  });

  
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
  let id;
  if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  { id = 1; }
    const product = new Product({
      id:id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for deleting products

app.post("/removeproduct", async (req, res) => {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name})
  })


// creating api  for getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

const Users = mongoose.model("Users", {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    cartData: {
      type: Object,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  })


  app.post('/signup', async (req, res) => {
    console.log("Sign Up");
          let check = await Users.findOne({ email: req.body.email });
          if (check) {
              return res.status(400).json({ success: false, errors: "existing user found with this email" });
          }
          let cart = {};
            for (let i = 0; i < 300; i++) {
            cart[i] = 0;
          }
          const user = new Users({
              name: req.body.username,
              email: req.body.email,
              password: req.body.password,
              cartData: cart,
          })
          await user.save();
          const data = {
              user: {
                  id: user.id
              }
          }
          
          const token = jwt.sign(data, 'secret_ecom');
          res.json({ success:true, token })
      })
  
//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
    console.log("Login");
      let success = false;
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
          const passCompare = req.body.password === user.password;
          if (passCompare) {
              const data = {
                  user: {
                      id: user.id
                  }
              }
              success = true;
        console.log(user.id);
              const token = jwt.sign(data, 'secret_ecom');
              res.json({ success, token });
          }
          else {
              return res.status(400).json({success: success, errors: "Wrong password"})
          }
      }
      else {
          return res.status(400).json({success: success, errors: "please try with correct email/password"})
      }
  })
  

// endpoint for newcollecton dta
app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("New Collections");
  res.send(arr);
})

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({category:"women"});
  let arr = products.slice(0,  4);
  console.log("Popular In Women");
  res.send(arr);
})

app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
  })




  app.post('/removefromcart', fetchuser, async (req, res) => {
	console.log("Remove Cart",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })


app.listen(port,(error)=>{
    if(!error) {
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error : "+error)
    }

})