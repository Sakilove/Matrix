const DataStore = require('nedb')
const path = require('path')

module.exports = {
  movie: {
    add: addMovie,
    get: getMovies,
    getByTags: getMoviesByTags,
    update: updateMovie,
    del: deleteMovie,
    isExist: async id => await isExist({ _id: id }, id)
  },
  tv: {
    add: addTV,
    get: getTVs,
    getByTags: getTVsByTags,
    update: updateTV,
    del: deleteTV,
    isExist: async id => await isExist({ _id: id }, id)
  },
  default: {
    addTag: addTag,
    getTags: getTags,
    updateTag: updateTag,
    deleteTag: deleteTag
  }
}

const TVDB = new DataStore({
  filename: path.join(__dirname, '../../db/TVDB'),
  autoload: true
})
const MovieDB = new DataStore({
  filename: path.join(__dirname, '../../db/MovieDB'),
  autoload: true
})
const DefaultDB = new DataStore({
  filename: path.join(__dirname, '../../db/DefaultDB'),
  autoload: true
})

async function addMovie(data) {
  if (await isExist({ ...data }, MovieDB))
    throw new Error(`Add vol failed for vol${ data } already existing`);

  const newDoc = await _insert(data, MovieDB);
  console.log(`Add success: vol${data}`);
  return newDoc;
}

async function getMovies() {
  return await _find({}, MovieDB);
}

async function getMoviesByTags(tags) {
  return await _find({ tags: { $in: tags}}, MovieDB);
}

async function updateMovie(id, data) {
  if (await !isExist({ _id: id }, MovieDB))
    throw new Error(`Origin data does not exist`);

  const newDoc = await _update({_id: id}, data, MovieDB);
  console.log(`Update success: ${data}`);
  return newDoc;
}

async function deleteMovie(id) {
  if (await !isExist({ _id: id }, MovieDB))
    throw new Error(`Origin data does not exist`);

  const newDoc = await _remove({ _id: id }, MovieDB);
  console.log(`Del success: ${data}`);
  return newDoc;
}

async function addTV(data) {
  if (await isExist({ ...data }, TVDB))
    throw new Error(`Add vol failed for vol${ data } already existing`);

  const newDoc = await _insert(data, TVDB);
  console.log(`Add success: vol${data}`);
  return newDoc;
}

async function getTVs() {
  return await _find({}, TVDB);
}

async function getTVsByTags(tags) {
  return await _find({ tags: { $in: tags}}, TVDB);
}

async function updateTV(id, data) {
  if (await !isExist({ _id: id }, TVDB))
    throw new Error(`Origin data does not exist`);

  const newDoc = await _update({_id: id}, data, TVDB);
  console.log(`Update success: ${data}`);
  return newDoc;
}

async function deleteTV(id) {
  if (await !isExist({ _id: id }, TVDB))
    throw new Error(`Origin data does not exist`);

  const newDoc = await _remove({ _id: id }, TVDB);
  console.log(`Del success: ${data}`);
  return newDoc;
}

async function addTag(data) {
  if (await isExist({ ...data }, DefaultDB))
    throw new Error(`Add vol failed for vol${ data } already existing`);

  const newDoc = await _insert(data, DefaultDB);
  console.log(`Add success: vol${data}`);
  return newDoc;
}

async function getTags() {
  return await _find({}, DefaultDB);
}

async function updateTag(prevTag, newTag) {
  if (await !isExist({ tag: prevTag }, DefaultDB))
    throw new Error(`Origin data does not exist`);
  const newDoc = await _update({tag: prevTag}, newTag, DefaultDB);
  MovieDB.update(arg, {$pull: { tag: prevTag }}, {}, function (error, numReplaced) {
    error && reject(`An error happened whiling handling find: ${error}`);
    resolve(numReplaced);
  })
  MovieDB.update(arg, {$addToSet: { tag: newTag }}, {}, function (error, numReplaced) {
    error && reject(`An error happened whiling handling find: ${error}`);
    resolve(numReplaced);
  })
  TVDB.update(arg, {$pull: { tag: prevTag }}, {}, function (error, numReplaced) {
    error && reject(`An error happened whiling handling find: ${error}`);
    resolve(numReplaced);
  })
  TVDB.update(arg, {$addToSet: { tag: newTag }}, {}, function (error, numReplaced) {
    error && reject(`An error happened whiling handling find: ${error}`);
    resolve(numReplaced);
  })
  console.log(`Update success: ${data}`);
  return newDoc;
}

async function deleteTag(tag) {
  if (await !isExist({ tag: tag }, DefaultDB))
    throw new Error(`Origin data does not exist`);

  const newDoc = await _remove({ tag: tag }, DefaultDB);
  MovieDB.update(arg, {$pull: { tag: tag }}, {}, function (error, numReplaced) {
    error && reject(`An error happened whiling handling find: ${error}`);
    resolve(numReplaced);
  })
  TVDB.update(arg, {$pull: { tag: tag }}, {}, function (error, numReplaced) {
    error && reject(`An error happened whiling handling find: ${error}`);
    resolve(numReplaced);
  })
  console.log(`Del success: ${data}`);
  return newDoc;
}

async function isExist(arg, db) {
  const doc = await _find(arg, db);
  return doc.length > 0;
}

function _insert(arg, db) {
  if (!arg || typeof arg !== 'object')
    throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
  return new Promise((resolve, reject) => {
    db.insert(arg, (error, doc) => {
      error && reject(`An error happened whiling handling insert: ${error}`);
      resolve(doc);
    })
  })
}


function _find(arg, db, sort, limit) {
  (!arg || typeof arg !== 'object') && (arg = {});
  return new Promise((resolve, reject) => {
    let exec = db.find(arg);
    sort && (exec = exec.sort(sort));
    limit && (exec = exec.limit(limit));
    exec.exec(function (error, docs) {
      error && reject(`An error happened whiling handling find: ${error}`);
      resolve(docs);
    })
  })
}


function _update(arg, newArg, db) {
  (!arg || typeof arg !== 'object') && (arg = {});
  return new Promise((resolve, reject) => {
    db.update(arg, {$set: newArg}, {}, function (error, numReplaced) {
      error && reject(`An error happened whiling handling find: ${error}`);
      resolve(numReplaced);
    })
  })
}


function _remove(arg, db) {
  if (!arg || typeof arg !== 'object')
    throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
  return new Promise((resolve, reject) => {
    db.remove(arg, {}, function (error) {
      error && reject(`An error happened while handling remove: ${error}`);
      resolve()
    })
  })
}
