const searchForm = document.querySelector('#search-form');
const container = document.querySelector('.container')


searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    container.innerHTML = "";
    const searchTerm = searchForm.elements.query.value;
    const config = { params: { q: searchTerm } }
    const response = await axios.get(`https://api.tvmaze.com/search/shows`, config)

    getImages(response.data)

})

const getImages = (show) => {
    for (let result of show) {
        if (result.show.image) {
            // get the image
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            container.append(img);

            // get the title
            const mainTitle = document.createElement('h2');
            mainTitle.classList.add('mainTitle');
            mainTitle.innerHTML = result.show.name;
            container.append(mainTitle);

            // get the description
            const summary = document.createElement('p');
            summary.classList.add('summary');
            summary.innerHTML = result.show.summary;
            container.append(summary);

            // get the language
            const lang = document.createElement('p');
            lang.classList.add('lang');
            lang.innerHTML = `Language: ${result.show.language}`
            container.append(lang)

            // get the genrew
            const genre = document.createElement('p');
            genre.classList.add('genre');
            genre.innerHTML = `Genres: ${result.show.genres}`;
            container.append(genre)
        }
    }
}


