/**
 * Created by saki on 2018/2/8.
 */
export default class Movie {
    constructor ({ nameEn, nameZh, year, tags, thumb, videos } = {}) {
        this.nameEn = nameEn;
        this.nameZh = nameZh;
        this.year = year;
        this.tags = tags;
        this.thumb = thumb;
        this.videos = videos;
    }
    setNameEn (nameEn) {
        this.nameEn = nameEn;
        return this;
    }
    setNameZh (nameZh) {
        this.nameZh = nameZh;
        return this;
    }
    setYear (year) {
        this.year = year;
        return this;
    }
    setTags (tags) {
        this.tags = tags;
        return this;
    }
    setThumb (thumb) {
        this.thumb = thumb;
        return this;
    }
    setVideos (videos) {
        this.videos = videos;
        return this;
    }
}
