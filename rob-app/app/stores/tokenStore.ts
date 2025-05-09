export const useTokenStore = defineStore('token', () => {
  const spotifyToken = ref("");
  const lastSpotifyFetched = ref(null);
  const spotifyExpiryTime = ref(3599)

  const appleToken = ref("")
  const lastAppleFetched = ref("")
  const appleExpiryTime = ref(3599)

  function setSpotifyToken (newToken: String) {
    spotifyToken.value = newToken;
  }

  function getSpotifyToken(){
    return spotifyToken
  }

  function setSpotifyLastFetched(lastFetchedTime:Date){
    lastSpotifyFetched.value = lastFetchedTime;
  }

  function getSpotifyLastFetched(){
    return lastSpotifyFetched
  }
  function setAppleToken (newToken: String) {
    appleToken.value = newToken;
  }

  function getAppleToken(){
    return appleToken
  }

  function setAppleLastFetched(lastFetchedTime:Date){
    lastAppleFetched.value = lastFetchedTime;
  }

  function getAppleLastFetched(){
    return lastAppleFetched
  }

  return {setSpotifyToken , getSpotifyToken, setSpotifyLastFetched, getSpotifyLastFetched, setAppleToken, getAppleToken, setAppleLastFetched, getAppleLastFetched}
});
