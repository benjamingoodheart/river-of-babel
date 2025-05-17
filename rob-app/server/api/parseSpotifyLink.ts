import axios from "axios";
import { ref } from "vue";
import ParserHelper from '../utils/parserHelper';
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const parser = new ParserHelper(query.uri, "Spotify")

  const releaseType = parser.getReleaseType()
  const releaseId = parser.getReleaseId()
  
  const arr = String(query.uri).split("/");

  const id = arr[2];

  //todo: determine if album song artist whatever
  const resp = await axios.get(`https://api.spotify.com/v1/albums/${releaseId}`, {
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
