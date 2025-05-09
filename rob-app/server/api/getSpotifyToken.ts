import axios from 'axios'
import {ref} from 'vue'
export default defineEventHandler(async (event)=>{
    const endpoint = 'https://accounts.spotify.com/api/token'
    const response = ref('')    
    
    await axios.post(
        endpoint, {
            'grant_type':'client_credentials',
            'client_id': process.env.VITE_SPOTIFY_CLIENT_ID,
            'client_secret': process.env.VITE_SPOTIFY_CLIENT_SECRET,
        }, {headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }}
    ).then((res)=>{
        response.value = res.data
        return response.value
    }) 
    if (response.value != '') {
        return response.value
    }
})