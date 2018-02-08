/**
 * Created by saki on 2018/2/8.
 */
export default class Video {
    constructor ({ fileName, filePath} = {}) {
        this.fileName = fileName;
        this.filePath = filePath;
    }
    setFileName (fileName) {
        this.fileName = fileName;
        return this;
    }
    setFilePath (filePath) {
        this.filePath = filePath;
        return this;
    }
}
