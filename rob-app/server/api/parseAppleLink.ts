import axios from "axios";
import { ref } from "vue";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const arr = String(query.uri).split("/");
  const developerToken = ref(query.token);

  const axiosInstance = axios.create({
    baseURL: "https://api.music.apple.com/v1/catalog/us/search",
    headers: {
      Authorization: `Bearer ${developerToken.value}`,
    },
  });

  await axiosInstance
    .get("?types=songs,albums,artists&term=fugazi")
    .then((res) => {
      console.log(res.data.results);
    });
});
