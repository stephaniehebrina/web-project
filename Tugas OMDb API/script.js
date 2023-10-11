document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '70f93d94'; 

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const featuredMovies = document.getElementById('featured-movies');

    // Function to search and display movies
    function searchMovie() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            alert('Please enter a movie title.');
            return;
        }

        // searching by title
        const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

        // Perform the request to the OMDB API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    // Clear previous search results
                    featuredMovies.innerHTML = '';

                    // Loop through the search results and display them in a list
                    data.Search.forEach(movie => {
                        // Create a new element for each movie
                        const movieCard = document.createElement('div');
                        movieCard.classList.add('col-md-3', 'mb-4'); // Changed from 'col-md-4'

                        // Make another API request to get movie details including the description
                        const movieDetailUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
                        fetch(movieDetailUrl)
                            .then(detailResponse => detailResponse.json())
                            .then(movieDetail => {
                                movieCard.innerHTML = `
                                    <div class="card">
                                        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                                        <div class="card-body">
                                            <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                                            <p class="card-text">${movieDetail.Plot}</p>
                                        </div>
                                    </div>
                                `;
                                featuredMovies.appendChild(movieCard);
                            });
                    });

                    // Save the search term in localStorage
                    localStorage.setItem('lastSearch', searchTerm);
                } else {
                    // No movies found
                    featuredMovies.innerHTML = '<p>No movies found.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Check if there is a previous search in localStorage
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        // Pre-fill the search input with the last search term
        searchInput.value = lastSearch;
        // Perform the search immediately
        searchMovie();
    }

    // Add an event listener to the "Search" button
    searchButton.addEventListener('click', searchMovie);

    // Add an event listener for the "Enter" key on the keyboard
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            searchMovie();
        }
    });
});
