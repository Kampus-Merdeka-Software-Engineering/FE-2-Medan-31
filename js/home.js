let counter = 1;

setInterval(() => {
    document.getElementById("radio" + counter).checked = true;
    counter++;
    if (counter > 3) {
        counter = 1;
    }
}, 5000);

function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    dropdown.style.display = (dropdown.style.display === "flex") ? "none" : "flex";
  }

  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "flex") {
          openDropdown.style.display = "none";
        }
      }
    }
  }


const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', function(){
  nav.classList.toggle('menu');
});

fetch("https://sleepy-jay-bandanna.cyclic.app/articles?category=fesyen")
.then(res => res.json())
.then(data => renderDataToContent(data.data));

function renderDataToContent(articles){
    // get element content
    // let content = document.getElementById("content");
    // let id = 1;
    // for (article of articles){
    //     console.log(article);
    //     content.innerHTML+=`<div class="card" id=${id}>
    // <div class="thumb">
    //     <img src=${article.urlImage} alt="">
    // </div>
    // <div class="title">
    //     <a onclick="redirectToDetail(${id})">${article.title}</a>
    // </div>
    // </div>`
    //     id++;
    // }
    console.log(articles)
    // get parent element
    const limitedArticles = articles.slice(0, 7); // Ubah angka 5 sesuai dengan jumlah yang diinginkan
    let parent = document.getElementById("list-news-right")
    for (article of limitedArticles){
      parent.innerHTML+=
      `<div class="image-container">
                <img src=${article.url_image} alt="">
                <div class="overlay-text">${article.title}</div>
              </div>`
    }
}

fetch("https://sleepy-jay-bandanna.cyclic.app/articles?category=kesehatan")
.then(res => res.json())
.then(data => renderDataToContentKesehatan(data.data));

function renderDataToContentKesehatan(articles){
    // get element content
    // let content = document.getElementById("content");
    // let id = 1;
    // for (article of articles){
    //     console.log(article);
    //     content.innerHTML+=`<div class="card" id=${id}>
    // <div class="thumb">
    //     <img src=${article.urlImage} alt="">
    // </div>
    // <div class="title">
    //     <a onclick="redirectToDetail(${id})">${article.title}</a>
    // </div>
    // </div>`
    //     id++;
    // }
    console.log(articles)
    // get parent element
    let parent = document.getElementById("list-news")
    const maxDescriptionLength = 190;
    for (article of articles){
      // Mengambil sebagian dari description dengan menggunakan slice
      const truncatedDescription = article.description.slice(0, maxDescriptionLength);
      parent.innerHTML+=
      `<div class="picture pct1">
      <a href="content.html"><img src=${article.url_image} alt=""></a>    
      <a href="content.html">
        <div class="text">
          <span>${article.title}</span>
          <span>${truncatedDescription}...</span> <!-- Menampilkan description yang telah dipotong -->
        </div>
      </a>
  </div>`
    }
}

// function untuk direct ke content.html
function redirectToDetail(article_id) {
  console.log('redirect to content');
  // You can use window.location.href to redirect to the detail page
  window.location.href = 'content.html?id=' + article_id;
}

// Misalkan terdapat sebuah form pencarian pada halaman HTML dengan id "searchForm" dan input dengan id "searchInput"
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Mencegah form untuk melakukan submit default

  const searchTerm = searchInput.value;

  fetch(`https://sleepy-jay-bandanna.cyclic.app/articles/search?q=${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Data yang diterima dari server
      console.log('Search Results:', data.data); // Menampilkan data pencarian di konsol

      // Lakukan sesuatu dengan data pencarian di sini
      // Misalnya, tampilkan hasil pencarian ke dalam sebuah div di halaman web
      displaySearchResults(data.data);
    })
    .catch(error => {
      // Menampilkan pesan kesalahan jika terjadi error
      console.error('There was a problem with the fetch operation:', error);
      // Lakukan penanganan error sesuai kebutuhan
    });
});

function displaySearchResults(results) {
  // Lakukan sesuatu dengan hasil pencarian yang diterima dari server
  // Misalnya, menambahkan hasil pencarian ke dalam sebuah div di halaman web
  const resultsDiv = document.getElementById('searchResults');

  resultsDiv.innerHTML = ''; // Kosongkan isi div sebelum menambahkan hasil pencarian baru

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.textContent = result.title; // Asumsi ada properti 'title' di setiap artikel

    resultsDiv.appendChild(resultElement);
  });
}
