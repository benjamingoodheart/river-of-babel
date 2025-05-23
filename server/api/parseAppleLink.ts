import axios from "axios";
import { ref } from "vue";
import ParserHelper from '../utils/parserHelper';
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const parser = new ParserHelper(query.uri, "Apple")

  const developerToken = ref(query.token);
  const releaseType = parser.getReleaseType()
  const releaseId = parser.getReleaseId()


  const axiosInstance = axios.create({
    baseURL: "https://api.music.apple.com/v1/catalog/us/",
    headers: {
      Authorization: `Bearer ${developerToken.value}`,
    },
  });
  
  const resp = await axiosInstance
    .get(`albums?filter[equivalents]=${releaseId}`)

  const artistArray = String(await resp.data.data[0].attributes.artistName).split('&') //splitting for multiple artists

  const releaseObj = ref({
    title: resp.data.data[0].attributes.name,
    artists: artistArray
  })

    return {release: releaseObj}
});
