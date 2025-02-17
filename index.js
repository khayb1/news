let breakingImg = document.querySelector('#breakingImg')
let breakingNews_title = document.querySelector('#breakingNews .title')
let breakingNews_desc = document.querySelector('#breakingNews .description ')
let topNews = document.querySelector('.topNews')
let sportsNews = document.querySelector('#sportsNews .newsBox')
let businessNews = document.querySelector('#businessNews .newsBox')
let techNews = document.querySelector('#techNews .newsBox')

let header = document.querySelector('.header')
let toggleMenu = document.querySelectorAll('.bar')
let menu = document.querySelector('nav li')
let menuItems = document.querySelectorAll('nav li a')

const toggle = (e) => {
    toggleMenu.forEach(bar => bar.classList.toggle('active'));
    menuItems.forEach(item => item.classList.toggle('activeMenu'));
}

toggleMenu.forEach(bar => bar.addEventListener('click', toggle));


window.addEventListener('scroll',()=>{
    if (window.scrollY > 50){
        header.classList.add('sticky')
    }
    else{
        header.classList.remove('sticky')
    }
})

//fetching news data from a website providing API.

const Key = "ed550cf263a74984abe9b1c66873635d";
const catergory = 'general'
const   pageSize = 5;   
const fetchData = async (category, pageSize) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${Key}`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
//fetchData('general',5)  

const add_breakingNews = (data) => {
  const { urlToImage, url, title, description } = data[0];
  breakingImg.innerHTML = `<img src="${urlToImage}" alt="image">`;
  breakingNews_title.innerHTML = `<a href="${url}" target="_blank"><h2>${title}</h2></a>`;
  breakingNews_desc.innerHTML = `<h2>${description}</h2>`;
};

fetchData('general', 5).then(add_breakingNews);

const add_topNews = (data) => {
  let html = '';
  data.forEach((element) => {
    const { urlToImage, url, title } = element;
    const truncatedTitle = title.length < 100 ? title : `${title.slice(0, 100)}...`;
    html += `
      <div class="news">
        <div class="img">
          <img src="${urlToImage}" alt="image">
        </div>
        <div class="text">
          <div class="title">
            <a href="${url}" target="_blank"><p>${truncatedTitle}</p></a>
          </div>
        </div>
      </div>
    `;
  });
  topNews.innerHTML = html;
};

fetchData('general', 20).then(add_topNews);

 const add_sportsNews =(data)=>{
    let html = ''
    let title= ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                      <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    sportsNews.innerHTML = html
 }

 fetchData('sports',5).then(add_sportsNews)



 const add_businessNews =(data)=>{
    let html = ''
    let title= ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                      <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    businessNews.innerHTML = html
 }

 fetchData('business',5).then(add_businessNews)


 const add_techNews = (data)=>{
    let html = ''
    let title= ''
    data.forEach((element)=>{
        if (element.title.length<100){
            title = element.title
        }
        else{
            title = element.title.slice(0,100) + "..."
        }

        html += `<div class="newsCard">
                    <div class="img">
                        <img src=${element.urlToImage} alt="image">
                    </div>
                      <div class="text">
                        <div class="title">
                        <a href=${element.url} target="_blank"><p>${title}</p></a>
                        </div>
                    </div>
                </div>`
    })
    techNews.innerHTML = html
 }

 fetchData('technology',5).then(add_techNews)