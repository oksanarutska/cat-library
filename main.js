// From: https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function renderKitten(cat) {
    return `<div class="ov_information_card">
  <div class="ov_kitten_card" style="background-color: ${getRandomColor()}">
    <div class="ov_price">
      <span class="ov_text_price">Price: ${cat.auction.current_price}</span>
    </div>
    <img src="${cat.image_url}"
         title="${cat.enhanced_cattributes.map(a => a.description).join(', ')}"
         class="ov_kitten_img">
  </div>
  <div class="ov_footer_cat">
    <div class="ov_kitten_information">
     <span>#${cat.id}</span>
     <span>${cat.name}</span>
    </div>
   <div class="ov_space_line"></div>
   <div class="ov_kitten_information">
     <span>${cat.category}</span> 
   </div>
 </div>
</div>`;
}

function renderKittens(cats) {
    return cats.map(cat => renderKitten(cat))
        .join('');
}

var currentPage = 1;
var per_page = 12;
var searchString = '';
var orderby;
var orderdir = 'asc';

async function loadPage() {
    let loader = document.getElementById('loader');
    loader.classList.add('loader_opened');

    const response = await fetch(`https://api.cryptokitties.co/v2/kitties?offset=${(currentPage - 1) * per_page}&limit=${per_page}&search=${searchString}&orderDirection=${orderdir}&orderBy=${orderby}`);
    const cats = await response.json();


    setTimeout(function () {
        document.querySelector('.ov_common_card').innerHTML = renderKittens(cats.kitties);
        loader.classList.remove('loader_opened');
    }, 2000);
}

document.addEventListener("DOMContentLoaded", loadPage);
[...document.getElementsByClassName("button_next")].forEach(button => button.addEventListener('click', () => {
    currentPage++;
    loadPage();
}));
[...document.getElementsByClassName("button_prev")].forEach(button => button.addEventListener('click', () => {
    currentPage--;
    loadPage();
}));

document.getElementById("search-button").onclick = function (event) {
    searchString = document.getElementById("text-to-find").value;
    loadPage();
};

document.getElementById("orderby-select").onchange = function (event) {
    orderby = event.target.value;
    loadPage();
};

document.getElementById('orderdir-button').onclick = function (event) {
    orderdir = orderdir === 'asc'
        ? 'desc'
        : 'asc';
    event.target.innerText = orderdir === 'asc'
        ? 'low to high'
        : 'hight to low';

    loadPage();
};


