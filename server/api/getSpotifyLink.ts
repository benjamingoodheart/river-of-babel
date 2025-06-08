import { ref } from "vue";
import axios from "axios";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const title = encodeURIComponent(query.title);
  const artist = encodeURIComponent(query.artist);
  const type = encodeURIComponent(query.releaseType);
  //call spotify api
  console.log(type);
  const endpoint = `https://api.spotify.com/v1/search?q=${title}%2520artist%3A${artist}&type=${type}%2Cartist`;

  const resp = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${query.token}`,
    },
  });

  if (type == "track") {
    let itemsArr = await resp.data.tracks.items;
    for (let item in itemsArr) {
      let tempName = itemsArr[item].artists[0].name;
      if (tempName == decodeURI(artist)) {
        let ret_link = await resp.data.tracks.items[item].external_urls.spotify;
        return {
          link: await ret_link,
        };
      }
    }
  } if (type == 'album') {
    //maybe add timeout or something?
    console.log(await resp.data)
    let ret_link = await resp.data.albums.items[0].external_urls.spotify;

    return {
      link: ret_link,
    };
  }

  return {
    link: null,
  };
});
