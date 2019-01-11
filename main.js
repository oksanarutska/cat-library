
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
      <span class="ov_text_price">Price: ${cat.price}</span>
    </div>
    <img src="${cat.img_url}"
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
        .join('');}
        
// var oReq = new XMLHttpRequest();
// oReq.onload = reqListener;
// oReq.open("get", "https://ma-cats-api.herokuapp.com/api/cats", true);
// oReq.send();
//
// function reqListener() {
//     const cats= JSON.parse(this.responseText);
//     document.querySelector('.ov_common_card').insertAdjacentHTML("afterbegin", renderKittens(cats.cats));
// }
fetch('https://ma-cats-api.herokuapp.com/api/cats?&per_page=12')
    .then(
        function(response) {
            response.json().then(function(cats) {
                document.querySelector('.ov_common_card').insertAdjacentHTML("afterbegin", renderKittens(cats.cats));
            });
        }
    );