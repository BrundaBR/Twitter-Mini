const express=require('express');
const cors=require('cors');
const monk=require('monk');
const app=express();

const db=monk('localhost/tweets');
const tweets=db.get('tweets');
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.json({
        message:'No Tweet'
     });
});

app.get('/tweets',(req,res)=>{
    tweets.find()
    .then(tweets => {
        res.json(tweets);
    });

});

function isvalidtweet(tweet){
    return tweet.name && tweet.name.toString().trim() !== '' && tweet.tweet && tweet.tweet.toString().trim() !== '';
}
app.post('/tweets',(req,res)=>{
    if(isvalidtweet(req.body)){
        //insert to db
        const tweet={
            name:req.body.name.toString(),
            tweet:req.body.tweet.toString(),
            created:new Date()
        };
        tweets
        .insert(tweet)
        .then(createdTweet=>{
            res.json(createdTweet);
        });
    }else{
        res.status(422);
        res.json({
            message:'Hey! please write a tweet'
        });
    }

});
app.listen(8000,()=>{
    console.log('listening on http://localhost:8000/');

});