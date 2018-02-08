/**
 * Created by saki on 2018/2/8.
 */
export default class Season {
    constructor ({ seasonNo, year, videos } = {}) {
        this.seasonNo = seasonNo;
        this.year = year;
        this.videos = videos;
    }
    setSeasonNo (seasonNo) {
        this.seasonNo = seasonNo;
        return this;
    }
    setYear (year) {
        this.year = year;
        return this;
    }
    setVideos (videos) {
        this.videos = videos;
        return this;
    }
}
