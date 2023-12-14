// const {User} = require("../database")
var express = require('express');
var router = express.Router();

const {connectMongoose,User} = require("../database")
const passport = require("passport");
const {initializingPassport,isAuthenticated} = require("../passportConfig")
const expressSession = require("express-session");
connectMongoose();

initializingPassport(passport);

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}));
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get("/",(req,res)=>{
  res.render("index");
})
router.get("/about",(req,res)=>{
  res.render("about");
})
// Assuming you have a route to render the page
router.get("/categories", (req, res) => {
  // List of different products with their details and categories
  const products = [
    { name: "Carrot", image: "../images/carrot.jpg", price: 1.5, category: "vegetable" },
    { name: "Broccoli", image: "../images/broccoli.jpg", price: 2.0, category: "vegetable" },
    { name: "Tomato", image: "../images/tomato.jpg", price: 1.0, category: "vegetable" },
    { name: "Chillies", image: "../images/chillies.jpg", price: 1.0, category: "vegetable" },
    { name: "Cucumber", image: "../images/cucumber.jpg", price: 1.0, category: "vegetable" },
    { name: "Eggplant", image: "../images/eggplant.jpg", price: 1.0, category: "vegetable" },
    { name: "Lettuce", image: "../images/lettuce.jpg", price: 1.0, category: "vegetable" },
    { name: "Onion", image: "../images/onion.jpg", price: 1.0, category: "vegetable" },
    { name: "Potato", image: "../images/potato.jpg", price: 1.0, category: "vegetable" },
    { name: "Spinach", image: "../images/spinach.jpg", price: 1.0, category: "vegetable" },
   
    { name: "Milk", image: "../images/milk.jpg", price: 2.5, category: "dairy" },
    { name: "Cheese", image: "../images/cheese.jpg", price: 2.0, category: "dairy" },
    { name: "Ice Cream", image: "../images/ice.jpg", price: 3.0, category: "dairy" },
    { name: "Yogurt", image: "../images/yogurt.jpg", price: 5.0, category: "dairy" },
    { name: "Sour Cream", image: "../images/sour cream.jpg", price: 3.0, category: "dairy" },
    { name: "Whipped Cream", image: "../images/whipped cream.jpg", price: 3.0, category: "dairy" },
    { name: "Cottage Cheese", image: "../images/cottageCheese.jpg", price: 3.0, category: "dairy" },
   
    { name: "Potato Chips", image: "../images/potatoChips.jpg", price: 1.5, category: "snack"  },
    { name: "Popcorn", image: "../images/popcorn.jpg", price: 2.0 , category: "snack" },
    { name: "Pretzels", image: "../images/pretzels.jpg", price: 1.0 , category: "snack" },
    { name: "Granola Bars", image: "../images/granola.jpg", price: 1.2 , category: "snack" },
    { name: "Nachos", image: "../images/nachos.jpg", price: 1.3 , category: "snack" },
    { name: "Cheese Puffs", image: "../images/cheese puffs.jpg", price: 1.5, category: "snack"  },
    { name: "Dried Fruit", image: "../images/driedFruit.jpg", price: 1.4 , category: "snack" },
    { name: "Chocolate Bars", image: "../images/choclate.jpg", price: 2.0 , category: "snack" },
    { name: "Mixed Nuts", image: "../images/mixedNuts.jpg", price: 1.7 , category: "snack" },

    { name: "Banana", image: "../images/banana.jpg", price: 1.3, category: "fruit" },
    { name: "Orange", image: "../images/orange.jpg", price: 1.5, category: "fruit" },
    { name: "Apple", image: "../images/apple.jpg", price: 1.5, category: "fruit" },
    { name: "Avocado", image: "../images/avocado.jpg", price: 1.5, category: "fruit" },
    { name: "Grapes", image: "../images/grapes.jpg", price: 1.5, category: "fruit" },
    { name: "Mango", image: "../images/mango.jpg", price: 1.5, category: "fruit" },
    { name: "Dragon fruit", image: "../images/dragonFruit.jpg", price: 1.5, category: "fruit" },
    { name: "Blue Berries", image: "../images/blueBerries.jpg", price: 1.5, category: "fruit" },
    { name: "Pomogrante", image: "../images/pomogranate.jpg", price: 1.5, category: "fruit" },
    { name: "Papaya", image: "../images/papaya.jpg", price: 1.5, category: "fruit" },
  ];

  // Filter products based on category
  const filteredVegetables = products.filter(product => product.category === "vegetable");
  const filteredDairy = products.filter(product => product.category === "dairy");
  const filteredSnacks = products.filter(product => product.category === "snack");
  const filteredFruits = products.filter(product => product.category === "fruit");

  res.render("categories", { vegetables: filteredVegetables, dairy: filteredDairy, snacks: filteredSnacks, fruits: filteredFruits });
});

router.get("/contact",(req,res)=>{
  res.render("contact");
})
// router.get("/profile",(req,res)=>{
//   res.render("profile");
// })
router.get("/cart",(req,res)=>{
  res.render("cart");
})



router.get("/register",(req,res)=>{
  res.render("register");
})
router.get("/login",(req,res)=>{
  res.render("login");
})

router.post("/register",async(req,res)=>{
  const users = await User.findOne({username:req.body.username});

  if(users)return res.status(400).send("user already exists")

  // Create a new user
  const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password, // Make sure to hash the password before storing it in production
    });

    // Save the user to the database
    await newUser.save();

    // Redirect to the login page or any other desired page
    res.redirect("/login");

})

router.post("/login",passport.authenticate("local",{failureRedirect:"/register",successRedirect:"/profile"}));


router.get("/profile", isAuthenticated, (req, res) => {
  
  res.render("profile", { user: req.user });
});



router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    res.send("Logged out");
  });
});

module.exports = router;
