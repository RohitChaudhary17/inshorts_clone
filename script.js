const API_KEY = `&apikey=35f0190bde9446ec93bf2c1691503b8a`;
const BASE_URL = `https://newsapi.org/v2/`;
const EVERYTHING_URL = `everything?`;
const HEADLINE_URL = `top-headlines?`;
const SOURCE_URL = ``;
const CATEGORY_URL = `category=`;
const QUERY_URL = `q=`;
const pageSize_url = `&pageSize=20`;
const DEFAULT_LANGUAGE = `&language=en`;
const SORTBY_URL = `&sortBy=`;

const side_menu = document.querySelector("#side-menu-div");
const categories_list = document.querySelectorAll(".css-category-div");

const search_bar = document.querySelector("#search-bar");
const formTag = document.querySelector(".form");
const search_btn = document.querySelector("#search-btn");
let serach_bar_value_save;

const select_sortBy_div = document.querySelector("#sort-by-div");
const select_sortBy = document.querySelector("#select-sort-by");

const country_img = document.querySelectorAll(".nation-div");

const load_more_btn = document.querySelector("#load-more-btn");

const movie_main_div = document.querySelector(".news-card-main");

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const current = document.querySelector("#current");

let prevPage = 1;
let nextPage = 2;
let currentPage = 3;
let lastURL = "";
let totalPages = 100;

function getNews(url) {
  lastURL = url;

  console.log(url);

  fetch(url)
    .then((res) => {
      if (!res) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      showNews(data.articles);

      // currentPage = data.page;
      //     nextPage = currentPage + 1;
      //     prevPage = currentPage - 1;
      //     totalPages = data.total_pages;

      //     current.innerText = currentPage;

      //     if(currentPage <= 1){
      //       prev.classList.add('disabled');
      //       next.classList.remove('disabled');
      //     }
      //     else if(currentPage >= totalPages){
      //       prev.classList.remove('disabled');
      //       next.classList.add('disabled');
      //     }
      //     else{
      //       prev.classList.remove('disabled');
      //       next.classList.remove('disabled');
      //     }

      document.querySelector("nav").scrollIntoView({ behavior: "smooth" });
    });
}

function showNews(data1) {
  movie_main_div.innerHTML = ``;

  data1.forEach((news_data) => {
    const {
      author,
      title,
      urlToImage,
      publishedAt,
      content,
      url,
      source: { name },
    } = news_data;

    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card-inner");

    newsCard.innerHTML = `
      
    <div class="news-card-img">
    <img src="${urlToImage ? urlToImage : "broken-img.png"}" class="news-img">
    </div>


  <div class="news-card-content-div">

    <h2>${title}</h2>

    <h4 class="author-date"><span>Author : </span>${author} ${publishedAt}</h4>

    <h3 class="news-content">${content ? content : "nothing to show"}</h3>

    <h4 class="source"><a href="${url}" target="_blank">Read more at ${name}</a></h4>
    
</div>`;

    movie_main_div.appendChild(newsCard);
  });
}


console.log(`${BASE_URL}${HEADLINE_URL}country=in${pageSize_url}${API_KEY}`);
getNews(`${BASE_URL}${HEADLINE_URL}country=in${pageSize_url}${API_KEY}`);



country_img.forEach((val) => {
  
  val.addEventListener("click", () => {
    console.log(val.id);
    getNews( BASE_URL + HEADLINE_URL + `country=${val.id}` + pageSize_url + API_KEY);
  });
});



categories_list.forEach((val) => {
  val.addEventListener("click", () => {
    getNews(
      BASE_URL +
        HEADLINE_URL +
        CATEGORY_URL +
        val.id +
        DEFAULT_LANGUAGE +
        pageSize_url +
        API_KEY
    );
    //  select_sortBy_div.style.display = 'none';
  });
});

// select_sortBy.addEventListener('change' , function (e){

//    let selecetdOption = e.target.value;
//    getNews(BASE_URL + EVERYTHING_URL + QUERY_URL + serach_bar_value_save + SORTBY_URL + selecetdOption + DEFAULT_LANGUAGE + pageSize_url + API_KEY);
//    console.log(BASE_URL + EVERYTHING_URL + QUERY_URL + serach_bar_value_save + SORTBY_URL + selecetdOption + DEFAULT_LANGUAGE + API_KEY);
// });

search_btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (search_bar.value) {
    let search_value = search_bar.value;
    getNews(
      BASE_URL +
        EVERYTHING_URL +
        QUERY_URL +
        search_value +
        DEFAULT_LANGUAGE +
        pageSize_url +
        API_KEY
    );
    //select_sortBy_div.style.display = 'block';
    serach_bar_value_save = search_value;
  } else {
    document.body.innerText = "please give valid input";
  }
});

// prev.addEventListener('click' , () => {

//   if(prevPage > 0){

//     pageCall(prevPage);
//   }

//   });

// next.addEventListener('click' , () => {

// if(nextPage <= totalPages){

//   pageCall(nextPage);
// }

// });

// function pageCall(page){

// let urlSplit = lastURL.split('?');
// console.log(urlSplit , 'urlsplit');

// let queryParams = urlSplit[1].split('&');
// console.log(queryParams , 'quryparam');

// let key = queryParams[queryParams.length -1].split('=');
// console.log(key  ,'key');

// if(key[0] != 'page'){
//   let url = lastURL + '&page=' + page;
//   getMovies(url);
//   console.log(url);
// }
// else{
//   key[1] = page.toString();
//   let a = key.join('=');
//   queryParams[queryParams.length -1] = a;
//   console.log(queryParams);

//   let b = queryParams.join('&');
//   let url = urlSplit[0] + '?' + b;
//   getMovies(url);
//   console.log(url);
// }

// }
