import axios from "axios";
import { ref } from "vue";
import ParserHelper from '../utils/parserHelper';
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const parser = new ParserHelper(query.uri, "Apple")
  const arr = String(query.uri).split("/");
  const developerToken = ref(query.token);
  const releaseType = parser.getReleaseType()
  const releaseName = parser.getReleaseName()

  const axiosInstance = axios.create({
    baseURL: "https://api.music.apple.com/v1/catalog/us/",
    headers: {
      Authorization: `Bearer ${developerToken.value}`,
    },
  });

  await axiosInstance
    .get(`albums?filter[equivalents]=${releaseName}`)
    .then((res) => {
      console.log(res.data);
      for (let obj in res.data.data){
        console.log(res.data.data[obj])}
    });
    
});
