const express = require('express');
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express();
const Article = require('./models/article')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jstewart8053:Malayah09@cluster0.4it2t.mongodb.net/news-app?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


mongoose.connect('mongodb://localhost/news', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)