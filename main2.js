const baseIMG_URL= 'https://www.artic.edu/iiif/2';
const endIMGURL = '/full/843,/0/default.jpg';
const baseURL = 'https://api.artic.edu/api/v1/artworks?page=1&limit=16';

let page = 1;
let search = false;
let searchTerm =""

getArtwork(baseURL);


form.addEventListener("submit", (e) => {
    e.preventDefault();
    getArtwork()

    });


async function getArtwork() {

 const searchTerm = document.getElementsByClassName("search")[0].value;


    await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&page=${page}&limit=16&fields=id,title,image_id,artist_display,date_display,artist_type_title,place_of_origin,medium_display`)
    .then(res => res.json())
    .then(artwork =>{
        console.log(artwork.data);
       


         if(artwork.data.length !== 0){
            showArtWork(artwork.data);
           
        }else{
            main.innerHTML= `<h3 class="no-results"> No Artwork Found ! </h3>`
        }
       
    })

}
   


function showArtWork(data) {
 main.innerHTML="";


 data.forEach(artwork => {
        const {title, artist_display, date_display,artwork_type_title, 
        place_of_origin,medium_display}= artwork;
        const artEl = document.createElement('div');
       artEl.classList.add('art');
        artEl.innerHTML = `
        <img src ="https://www.artic.edu/iiif/2/${artwork.image_id+endIMGURL}" alt="${title}">

        <div class="art-info">
            <h3>${title}</h3>
        </div>

        <div class = "overview">
            
            <p><b>Artist:</b> ${artist_display}</p>
            <p><b>Display Date:</b> ${date_display}</p>
            <p><b>Type:</b> ${artwork_type_title} <p> 
            <p><b>Place of Origin:</b> ${place_of_origin} </p>
            <p><b>Medium:</b> ${medium_display} </p>
        `
        main.appendChild(artEl);
        })}



load.addEventListener("click" ,() => {
 
    page+=16;
    getArtwork()
 }
);