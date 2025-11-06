
const API_KEY="c93191f2b7d849828d8ade1df5ec233c";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>{
    fetchNews("India");
})

async function fetchNews(query) {
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles)
{
 const cardsContainer=document.getElementById("cards-container");
 const newsCardTemplate=document.getElementById("template-news-card") ;
   
   cardsContainer.innerHTML = "";

   articles.forEach((article) => {
    if(!article.urlToImage) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fildataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone);
   });
}


function fildataInCard(cardClone,article)
{
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsdesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;


    const date=new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/jakarta"
    })
 
    cardClone.firstElementChild.addEventListener('click',()=>{

        window.open(article.url ,"_blank");
    })

    newsSource.innerHTML = `${article.source.name} . ${date}`;
}

let currentSelectedNav=null;

function onNavItemClick(id){
    
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchtext=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchtext.value;
    if(!query) return;
    
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;
})

function reload()
{
    window.location.reload();
}
