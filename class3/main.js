window.onload = () => {
  console.log("script is connected");

  let button = document.getElementById("send");
  button.addEventListener("click", request);
  // call my function
  request();
};

//added async inside function header so that
async function request() {
  // this is the base url retrieved

  let baseURL = "http://omdbapi.com/?";

  let searchInput = document.getElementById("search").value;

  let params = new URLSearchParams({
    apikey: "c2375e60",
    s: searchInput,
    type: "movie",
  });

  console.log(baseURL + params);

  let url = baseURL + params.toString();
  console.log("URL:", url);

  // the retrieves the entire request
  let response = await fetch(url);
  console.log("Response:", response);
  // I just want to see the data, everything abou the request

  let data = await response.json();
  console.log("Data:", data);

  let movies = data.Search;
  console.log(movies);

  let container = document.getElementById("container");

  for (let movie of movies) {
    //1. retrieve where on the webpage my movie data

    // 2. create the item to be added
    let m = document.createElement("div");
    m.textContent = movie.Title + " " + movie.Year;
    container.appendChild(m);
  }
  // git status
  // git add .
  // git commit -m "added the movie data"
  // git push
}
