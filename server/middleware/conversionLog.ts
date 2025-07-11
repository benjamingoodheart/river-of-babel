export default defineEventHandler((event) => {

    const urlArr = String(event.node.req.url).split('?')
    const queryString = urlArr[1]
    const params = new URLSearchParams(queryString)
    const now = Date.now()

    if (params.size >=3){
        params.delete('token')
        console.log("---")
        console.log('request time:', Date.now())
        console.log('type:', params.get('releaseType'))
        console.log('artist:',params.get('artist'))
        console.log('release name:',params.get('title'))
        console.log('++++')
    }
   
  })