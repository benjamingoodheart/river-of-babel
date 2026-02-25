export default class ParserHelper {
  public market: String;
  public releaseType: String;
  public releaseId: String;
  public trackId: String;
  public releaseName: String;
  public originService: String;
  //TODO: REFACTOR
  constructor(link: String, originService: String) {
    let arr = String(link).split("/");
    arr = this.cleanArray(arr);
    console.log(arr);
    this.originService = "Apple";
    if (originService == "Apple") {
      if (!this.isAppleSong(arr)) {
        /* Sometimes links have the album title in them, sometimes not
         * The block below handles that case
         */
        if (!this.hasAlbumTitle(arr)) {
          this.market = arr[1];
          this.releaseType = `${arr[2]}s`;
          this.releaseId = arr[3];
        }
        if (this.hasAlbumTitle(arr)) {
          this.market = arr[1];
          this.releaseType = `${arr[2]}s`;
          this.releaseId = arr[4];
        }
      }
      if (this.isAppleSong(arr)) {
        let lastIndex = arr.length - 1;
        console.log(arr);
        if (this.isAppleMobile(arr)) {
          let tempArr = String(arr[lastIndex]).split("&ls");

          let releaseArr = String(tempArr[0]).split("?i=");
          console.log(releaseArr);
          this.market = arr[1];
          this.releaseType = `songs`;
          this.releaseId = releaseArr[1];
        } else {
          let releaseArr = String(arr[lastIndex]).split("?i=");
          this.market = arr[1];
          this.releaseType = `songs`;
          this.releaseId = releaseArr[1];
        }
      }
    }
    if (originService == "Spotify") {
      if (this.isSpotifySong(arr)) {
        this.releaseType = "tracks";
        let releaseArr = String(arr[2]).split("?si=");
        this.releaseId = releaseArr[0];
        this.trackId = releaseArr[1];
      } else {
        this.releaseType = "albums";
        this.releaseId = arr[2];
      }
    }
  }

  isAppleSong(arr: Array) {
    /**
     * songs are denoted the ?i= expression inbtwn the album id and the song id
     */
    let lastIndex = arr.length - 1;
    let albumTrackArr = String(arr[lastIndex]).split("?i=");
    console.log(albumTrackArr);
    if (albumTrackArr.length == 2) {
      return true;
    }
    if (albumTrackArr.length == 1) {
      return false;
    }
  }

  isAppleMobile(arr: Array) {
    let mobileSuffix = /[?ls]/;
    let lastIndex = arr.length - 1;
    if (String(arr[lastIndex]).search(mobileSuffix) != -1) {
      return true;
    }
    return false;
  }

  isSpotifySong(arr: Array) {
    if (arr[1] === "track") {
      return true;
    } else {
      return false;
    }
  }

  hasAlbumTitle(arr: Array): bool {
    const notDigitRegex = /[^\d]\w+/g;
    const indexStr = String(arr[3]);
    if (indexStr.search(notDigitRegex) == -1) {
      return false;
    }
    return true;
  }

  handleExtraReleaseInfo(releaseName): String {
    if (releaseName.includes(" - Single")) {
      let temp = releaseName.split(" - Single");
      return temp[0];
    }
    if (releaseName.includes("- EP")) {
      let temp = releaseName.split(" - EP");
      console.log(temp);
      return temp[0];
    }
    return releaseName;
  }

  cleanArray(arr: Array) {
    //handle mobile
    if (this.isAppleMobile(arr)) {
      let lastIndex = arr.length - 1;
      let cleanedIdArr = String(arr[lastIndex]).split("?ls");
      arr[lastIndex] = cleanedIdArr[0];
    }
    if (arr[0] == "https:") {
      arr.splice(0, 2);
      return arr;
    } else {
      return arr;
    }
  }

  getReleaseType() {
    return this.releaseType;
  }
  getReleaseName() {
    return this.releaseName;
  }
  getReleaseId() {
    return this.releaseId;
  }
}
