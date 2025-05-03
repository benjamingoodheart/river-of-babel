export default defineEventHandler((event)=>{
    const query = getQuery(event)
    //console.log(query.artist)
    //console.log(query.token)
    //call spotify api
    return{
        link: "spotify.com/whatever"
    }
})