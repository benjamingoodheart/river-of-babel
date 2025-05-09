import {ref} from 'vue'
import axios from 'axios'
export default defineEventHandler(async (event)=>{
    
    const query = getQuery(event)
    const title = encodeURIComponent(query.title)
    const artist = encodeURIComponent(query.artist)
    //console.log(query.artist)
    //console.log(query.token)
    //call spotify api
    const endpoint = `https://api.spotify.com/v1/search?q=${title}%2520artist%3A${artist}&type=album%2Cartist`

    const resp = await axios.get(endpoint, {headers: {
        'Authorization' : `Bearer ${query.token}`
    }})

    let ret_link = await resp.data.albums.items[0].external_urls.spotify

    return{
        link: ret_link
    }
})