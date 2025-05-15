export default class ParserHelper{
        public market: String;
        public releaseType: String;
        public releaseId: String;
        public releaseName: String;
        public originService: String;

    constructor(link: String, originService: String){
        let arr = String(link).split("/");
        arr = this.cleanArray(arr)
        this.originService = 'Apple';
        if(originService == 'Apple'){
            
            this.market = arr[1]
            this.releaseType = `${arr[2]}s`
            //TODO: REGEX TO DROP ALBUMS WITH NAME IN TITLE
            this.releaseId = arr[3]
        } 
        if(originService == 'Spotify'){
            releaseType = arr[1]
            releaseId = arr[2]
        }
    }

    cleanArray(arr: Array){
        if(arr[0]=='https:'){
            arr.splice(0, 2)
            return arr
        }
        else{
            return arr
        }
    }

    getReleaseType(){
        return this.releaseType;
    }
    getReleaseName(){
        return this.releaseName;
    }
    getReleaseId(){
        return this.releaseId;
    }
}