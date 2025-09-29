const artistInput = document.getElementById("artistInput");
const searchButton = document.getElementById("searchButton");
const results = document.getElementById("results");


const proxyUrl = "https://cors-anywhere.herokuapp.com/";

async function searchArtist() {
  const artistName = artistInput.value.trim();
  if(!artistName) {
    results.innerHTML = '<p>Please enter an artist name.</p>';
    return;
  }
  localStorage.setItem("lastArtist", artistName);
  try {
    
    const response = await fetch(`${proxyUrl}https://theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artistName)}`);
    
    if(!response.ok) {
      throw new Error("Erro de acesso à API");
    }

    const json = await response.json();

    if(!json.artists) {
      results.innerHTML = '<p>No artists found.</p>';
      return;
    }
    console.log(json);
    results.innerHTML = ""; 
    console.log(json.artists);

    for (let i = 0;  i < json.artists.length; i++) {
      const artist = json.artists[i];

        results.innerHTML += `
          <div class="artistCard">
          <h2>${artist.strArtist}</h2>
          <img src="${artist.strArtistThumb || 'placeholder.jpg'}" alt="${artist.strArtist}" />
          <p><a href="${artist.strLastFMChart}" target="_blank">Ver no Last.fm</a></p>
          </div>
        `;
    }
  }

   catch (error) {
    results.innerHTML = `<p>Erro: Problema de busca</p>`;
  }
}

searchButton.addEventListener("click", searchArtist);
window.addEventListener("load", () => {
  const lastArtist = localStorage.getItem("lastArtist");
  if (lastArtist) {
    artistInput.value = lastArtist;
    searchArtist(); 
  }
});
