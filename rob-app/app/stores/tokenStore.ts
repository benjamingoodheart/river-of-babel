export const useTokenStore = defineStore('token', () => {
  const token = ref("");
  const lastFetched = ref(null);
  const expiryTime = ref(3599)

  function setToken(newToken: String) {
    token.value = newToken;
  }

  function getToken(){
    return token
  }

  function setLastFetched(lastFetchedTime:Date){
    lastFetched.value = lastFetchedTime;
  }

  function getLastFetched(){
    return lastFetched
  }

  return {setToken, getToken, setLastFetched, getLastFetched}
});
