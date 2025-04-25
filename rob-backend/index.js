function determine_service(link) {
  const apple_regex = /(\bappl\w+\b)/;
  const spotify_regex = /(\bspotif\w+\b)/;
  const str = link;

  if (str.search(apple_regex) == 0) {
    console.log("apple");
  } else if (str.search(spotify_regex) == 0) {
    console.log("spotify");
  } else {
    console.log(-1);
  }
}

var apple_link = "apple.com/us/musicbasd";
var spotify_link = "spotify.com/whatever";

determine_service(apple_link);
