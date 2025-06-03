export default class ParserHelper {
  public market: String;
  public releaseType: String;
  public releaseId: String;
  public trackId: String;
  public releaseName: String;
  public originService: String;

  constructor(link: String, originService: String) {
    let arr = String(link).split("/");
    arr = this.cleanArray(arr);
    this.originService = "Apple";
    if (originService == "Apple") {
      //TODO: SONG STUFF APPLE TO SPOTIFY
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

    let mobileSuffix = /[?ls]/;
    lastIndex = albumTrackArr.length - 1;

    //handles ?ls which appears in mobile
    if (String(albumTrackArr[lastIndex]).search(mobileSuffix) != -1) {
      let cleanedIdArr = String(albumTrackArr[lastIndex]).split("?ls");
      albumTrackArr[1] = cleanedIdArr[0];
    }


    if ((albumTrackArr.length = 2)) {
      this.trackId = albumTrackArr[1];
      this.releaseId = albumTrackArr[0];
      return true;
    }
    if ((albumTrackArr.length = 1)) {
      return false;
    }
  }

  isAppleMobile(arr: Array) {}

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

  cleanArray(arr: Array) {
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
