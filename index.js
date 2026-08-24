const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const  { v4:uuidv4 } = require('uuid');
const  methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));


// posts Data
let posts =  [
  {
    id: uuidv4(),
    username: "codeMaster",
    content: "Just solved 5 JavaScript problems today. Consistency beats talent! 💻🔥",
    likes: 245,
    retweets: 38,
    createdAt: "2026-07-24 09:15 AM"
  },
  {
    id: uuidv4(),
    username: "travelWithMe",
    content: "Sunrise at Toranmal was absolutely breathtaking! 🌄",
    likes: 512,
    retweets: 67,
    createdAt: "2026-07-24 06:45 AM"
  },
  {
    id: uuidv4(),
    username: "foodieLife",
    content: "Nothing beats homemade biryani on a rainy evening. 🍛❤️",
    likes: 389,
    retweets: 42,
    createdAt: "2026-07-23 08:30 PM"
  },
  {
    id: uuidv4(),
    username: "techDaily",
    content: "Node.js + Express + MongoDB is still one of my favorite backend stacks.",
    likes: 178,
    retweets: 25,
    createdAt: "2026-07-23 11:10 AM"
  },
  {
    id: uuidv4(),
    username: "fitnessFirst",
    content: "Completed a 10 km morning run. Small steps every day! 🏃",
    likes: 624,
    retweets: 81,
    createdAt: "2026-07-22 07:00 AM"
  },
  {
    id: uuidv4(),
    username: "movieBuff",
    content: "Finally watched the latest sci-fi movie. The visuals were mind-blowing! 🚀",
    likes: 302,
    retweets: 29,
    createdAt: "2026-07-21 09:45 PM"
  },
  {
    id: uuidv4(),
    username: "bookLover",
    content: "Reading one chapter every day can change your life. 📚",
    likes: 455,
    retweets: 54,
    createdAt: "2026-07-20 08:20 PM"
  },
  {
    id: uuidv4(),
    username: "natureClicks",
    content: "Captured this beautiful rainbow after the rain. 🌈",
    likes: 711,
    retweets: 95,
    createdAt: "2026-07-19 05:40 PM"
  },
  {
    id: uuidv4(),
    username: "musicVibes",
    content: "Listening to lo-fi while coding is a different kind of productivity. 🎧",
    likes: 283,
    retweets: 31,
    createdAt: "2026-07-18 10:15 PM"
  },
  {
    id: uuidv4(),
    username: "dailyQuotes",
    content: "Success is built on discipline, not motivation.",
    likes: 850,
    retweets: 143,
    createdAt: "2026-07-17 08:00 AM"
  }
];
// Index Route
app.get('/posts',(req,res)=>{
    res.render('index',{posts});
})

// Create Route
app.get('/posts/new',(req,res)=>{
  res.render('new');
})

// Show Route
app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => p.id == id);
    res.render('show',{post});
})

app.post('/posts/new',(req,res) => {
  let {username , content} = req.body;
  let id = uuidv4();
  posts.push({id,username,content});
  res.redirect('/posts');
})

// Edit Route
app.get('/posts/:id/edit',(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p) => p.id == id);
  res.render('edit',{post});
})
app.patch('/posts/:id',(req,res)=>{
  let {id} = req.params;
  let newContent =req.body.content;
  console.log(newContent);
  let post = posts.find((p) => p.id == id);
  post.content=newContent
  res.redirect('/posts');
});

// Delete
app.delete('/posts/:id',(req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p) =>p.id != id );
  res.redirect('/posts');
})
app.listen(port,()=>{
    console.log(`Server is listening on port:${port}`);
})