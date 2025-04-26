function determine_service(link) {
    const apple_regex = /(\bappl\w+\b)/;
    const spotify_regex = /(\bspotif\w+\b)/;
    const str = link;
  
    if (str.search(apple_regex) !=-1) {
      console.log("apple");
    } else if (str.search(spotify_regex) != -1) {
      console.log("spotify");
    } else {
      console.log(-1);
    }
  }

  apple_link = "https://music.apple.com/us/album/haunted-cities/1485061880"

  determine_service(apple_link)