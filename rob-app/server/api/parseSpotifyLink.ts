import axios from "axios";
import { ref } from "vue";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  //remove https://etc
  const arr = String(query.uri).split("/");

  const id = arr[2];

  //todo: determine if album song artist whatever
  const resp = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${query.token}`,
    },
  });

  const release = ref({
    title: resp.data.name,
    artists: resp.data.artists,
  });

  return { release: release };
});
