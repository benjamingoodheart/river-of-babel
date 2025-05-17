export default class ParserHelper {
  public market: String;
  public releaseType: String;
  public releaseId: String;
  public releaseName: String;
  public originService: String;

  constructor(link: String, originService: String) {
    let arr = String(link).split("/");
    arr = this.cleanArray(arr);
    this.originService = "Apple";
    if (originService == "Apple") {
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
    if (originService == "Spotify") {
      releaseType = arr[1];
      releaseId = arr[2];
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
