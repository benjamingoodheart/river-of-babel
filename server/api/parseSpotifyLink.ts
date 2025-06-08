import axios from "axios";
import { ref } from "vue";
import ParserHelper from '../utils/parserHelper';
export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const parser = new ParserHelper(query.uri, "Spotify")

  const releaseType = parser.getReleaseType()
  const releaseId = parser.getReleaseId()
  
  console.log(releaseType)
  const arr = String(query.uri).split("/");
  console.log(`https://api.spotify.com/v1/${releaseType}/${releaseId}`)
  const id = arr[2];
  console.log(arr)
  //todo: determine if album song artist whatever
  const resp = await axios.get(`https://api.spotify.com/v1/${releaseType}/${releaseId}`, {
    headers: {
      Authorization: `Bearer ${query.token}`,
    },
  });
  await resp
  if(releaseType == "tracks"){
    console.log(await resp.data.name)
  } 
  console.log(await resp.data)
  const release = ref({
    title: resp.data.name,
    artists: resp.data.artists,
    type: releaseType
  });

  return { release: release };
});
