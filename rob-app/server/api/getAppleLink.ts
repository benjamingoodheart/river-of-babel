import axios from "axios";
import { ref } from "vue";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const title = encodeURIComponent(query.title);
  const artist = encodeURIComponent(query.artist);
  const developerToken = ref(query.token);
  const href = ref("");
  const axiosInstance = axios.create({
    baseURL: "https://api.music.apple.com/v1/catalog/us/",
    headers: {
      Authorization: `Bearer ${developerToken.value}`,
    },
  });
  const resp = await axiosInstance.get(
    `search?types=albums,artists&term=${artist}+${title}`
  );

  href.value = await resp.data.results.albums.data[0].attributes.url;
  return {
    link: `${href.value}`,
  };
});
