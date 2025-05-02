export default defineEventHandler(async (event)=>{
    const query = getQuery(event)
    const head = {'Authorization' : `Bearer ${query.token}`}
    //determine if album song artist whatever
    const resp = await fetch('https://api.spotify.com/v1/me', {headers: head})
    console.log(resp)
})