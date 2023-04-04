let ApiKey = "6paPSnF8huasACEU3fLTrGJba6A4Wszp2OhSSu16"

let SearchBtn = document.getElementById('search-btn');


function getCurrentImageOfTheDay(){
   const currentDate = new Date().toISOString().split("T")[0];
   console.log( currentDate);

   // Send GET request to NASA API with today's date as parameter
  fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=6paPSnF8huasACEU3fLTrGJba6A4Wszp2OhSSu16`)
  .then(response => response.json())
  .then(data => {
    // Get the image URL and title from the API response
    const imageUrl = data.url;
    const title = data.title;
    const info = data.explanation;
    // Update the UI with the image and title
    const imageElement = document.getElementById('current-image-container');
    imageElement.innerHTML = `<img src=${imageUrl} alt=${title} width='100%'>`
    document.getElementById('image-title').innerText = `${title}`;
    document.getElementById('info').innerText = `${info}`;
  })
  .catch(error => console.error(error));
}

SearchBtn.addEventListener('click',getImageOfTheDay);

function getImageOfTheDay(){
    let inputDate = document.getElementById('search-input').value;
    console.log(inputDate);

    fetch(`https://api.nasa.gov/planetary/apod?date=${inputDate}&api_key=6paPSnF8huasACEU3fLTrGJba6A4Wszp2OhSSu16`)
  .then(response => response.json())
  .then(data => {
    // Get the image URL and title from the API response
    // console.log(data.explanation);
    const imageUrl = data.url;
    const info = data.explanation;
    const title = data.title;

    // Update the UI with the image and title
    const imageElement = document.getElementById('current-image-container');
    imageElement.innerHTML = `<img src=${imageUrl} alt=${title} width='100%'>`
    document.getElementById('image-title').innerText = `${title}`;
    document.getElementById('info').innerText = `${info}`;
  })
  .catch(error => console.error(error));
  saveSearch(inputDate);
  addSearchToHistory()
}

var arr = []
function saveSearch(inputDate){
    // const arr = JSON.parse(localStorage.getItem('myDate')) || [];
    arr.unshift(inputDate);
    localStorage.setItem('myDate',JSON.stringify(arr));
    // console.log(arr);
}

function addSearchToHistory(){
    // let getFromLocal = JSON.parse(localStorage.getItem('myDate'))||[];
    console.log('hi inside addsearchToHistory()')
    let ulContainer = document.getElementById('search-history');
    ulContainer.innerHTML  = '';
    for(let i=0;i<arr.length;i++){
        ulContainer.innerHTML += `<li class='prevDate'>${arr[i]}</li>`;
    }
}

function clearSearchHistory(){
    localStorage.clear('myDate');
    let ulContainer = document.getElementById('search-history');
    ulContainer.innerHTML = '';
}


window.onload = getCurrentImageOfTheDay;
   