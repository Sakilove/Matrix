/**
 * Created by saki on 2018/2/8.
 */
export default class TV {
    constructor ({ nameEn, nameZh, yearBeg, yearEnd, tags, thumb, seasons } = {}) {
        this.nameEn = nameEn;
        this.nameZh = nameZh;
        this.yearBeg = yearBeg;
        this.yearEnd = yearEnd;
        this.tags = tags;
        this.thumb = thumb;
        this.seasons = seasons;
    }
    setNameEn (nameEn) {
        this.nameEn = nameEn;
        return this;
    }
    setNameZh (nameZh) {
        this.nameZh = nameZh;
        return this;
    }
    setYearBeg (yearBeg) {
        this.year = yearBeg;
        return this;
    }
    setYearEnd (yearEnd) {
        this.year = yearEnd;
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
    setSeasons (seasons) {
        this.seasons = seasons;
        return this;
    }
}
