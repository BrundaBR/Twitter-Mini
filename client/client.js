const form =document.querySelector("form");
const loadingEle=document.querySelector(".loading");
const tweetEle=document.querySelector(".tweets");
const API_URL="http://localhost:8000/tweets";
loadingEle.style.display='';
listalltweets();



form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData=new FormData(form);
    const name=formData.get("name");

    const tweet=formData.get("tweet");

    const tweet_data={
        name,
        tweet
    };
    form.style.display='none';
    loadingEle.style.display='';



    fetch(API_URL,{
        
        method: 'POST',
        body: JSON.stringify(tweet_data),
        headers:{
            'content-type':'application/json'
        }
    }).then(response => response.json())
    .then(createdtweet =>{
        console.log(createdtweet);
        form.reset();
        form.style.display='';
        loadingEle.style.display='none';
        listalltweets();

    });

   
});

function listalltweets(){
    tweetEle.innerHTML='';
    fetch(API_URL)
    
    .then(response => response.json())

    .then(tweets =>{
        console.log(tweets)
        tweets.reverse();
        tweets.forEach(tweet =>{

            const div= document.createElement('div');
            const header= document.createElement('h2');
            header.textContent=tweet.name;
            const add_tweet= document.createElement('p');
            add_tweet.textContent=tweet.tweet;
            const add_date= document.createElement('small');
            const br=document.createElement('hr');
            add_date.textContent=new Date(tweet.created);
            div.appendChild(header);
            div.appendChild(add_tweet);
            div.appendChild(add_date);
            div.appendChild(br);

            tweetEle.appendChild(div);
            loadingEle.style.display='none';

        });
    });

}