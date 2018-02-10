const DataStore = require('nedb');
const path = require('path');

const TVDB = new DataStore({
  filename: path.join(__dirname, './db/TVDB'),
  autoload: true
})
const MovieDB = new DataStore({
  filename: path.join(__dirname, './db/MovieDB'),
  autoload: true
})
const DefaultDB = new DataStore({
  filename: path.join(__dirname, './db/DefaultDB'),
  autoload: true
})

async function addMovie (data) {
  if (await isExist({ ...data }, MovieDB)) {
    throw new Error(`Add vol failed for vol${data} already existing`);
  }

  const newDoc = await _insert(data, MovieDB);
  console.log(`Add success: vol${data}`);
  return newDoc;
}

async function getMovies () {
  const result = await _find({}, MovieDB);
  return result
}

async function getMoviesByTags (tags) {
  const result = await _find({tags: {$in: tags}}, MovieDB);
  return result
}

async function updateMovie (id, data) {
  if (await !isExist({_id: id}, MovieDB)) {
    throw new Error(`Origin data does not exist`);
  }

  const newDoc = await _update({_id: id}, data, MovieDB);
  console.log(`Update success: ${data}`);
  return newDoc;
}

async function deleteMovie (id) {
  if (await !isExist({_id: id}, MovieDB)) {
    throw new Error(`Origin data does not exist`);
  }
  const newDoc = await _remove({_id: id}, MovieDB);
  console.log(`Del success`);
  return newDoc;
}

async function addTV (data) {
  if (await isExist({...data}, TVDB)) {
    throw new Error(`Origin data does not exist`);
  }

  const newDoc = await _insert(data, TVDB);
  console.log(`Add success: vol${data}`);
  return newDoc;
}

async function getTVs () {
  const result = await _find({}, TVDB);
  return result
}

async function getTVsByTags (tags) {
  const result = await _find({tags: {$in: tags}}, TVDB);
  return result
}

async function updateTV (id, data) {
  if (await !isExist({_id: id}, TVDB)) {
    throw new Error(`Origin data does not exist`);
  }

  const newDoc = await _update({_id: id}, data, TVDB);
  console.log(`Update success`);
  return newDoc;
}

async function deleteTV (id) {
  if (await !isExist({_id: id}, TVDB)) {
    throw new Error(`Origin data does not exist`);
  }

  const newDoc = await _remove({_id: id}, TVDB);
  console.log(`Del success`);
  return newDoc;
}

async function addTag (data) {
  if (await isExist({...data}, DefaultDB)) {
    throw new Error(`Add vol failed for vol${data} already existing`);
  }

  const newDoc = await _insert(data, DefaultDB);
  console.log(`Add success: vol${data}`);
  return newDoc;
}

async function getTags () {
  const result = await _find({}, DefaultDB);
  return result
}

async function updateTag (prevTag, newTag) {
  if (await !isExist({tag: prevTag}, DefaultDB)) {
    throw new Error(`Origin data does not exist`);
  }

  const newDoc = await _update({tag: prevTag}, newTag, DefaultDB);
  MovieDB.update({tag: prevTag}, {$pull: {tag: prevTag}}, {}, function (error, numReplaced) {
    console.log(`An error happened whiling handling find: ${error}`);
  })
  MovieDB.update({tag: prevTag}, {$addToSet: {tag: newTag}}, {}, function (error, numReplaced) {
    console.log(`An error happened whiling handling find: ${error}`);
  })
  TVDB.update({tag: prevTag}, {$pull: {tag: prevTag}}, {}, function (error, numReplaced) {
    console.log(`An error happened whiling handling find: ${error}`);
  })
  TVDB.update({tag: prevTag}, {$addToSet: {tag: newTag}}, {}, function (error, numReplaced) {
    console.log(`An error happened whiling handling find: ${error}`);
  })
  console.log(`Update success`);
  return newDoc;
}

async function deleteTag (tag) {
  if (await !isExist({tag: tag}, DefaultDB)) {
    throw new Error(`Origin data does not exist`);
  }

  const newDoc = await _remove({tag: tag}, DefaultDB);
  MovieDB.update({tag: tag}, {$pull: {tag: tag}}, {}, function (error, numReplaced) {
    console.log(`An error happened whiling handling find: ${error}`);
  })
  TVDB.update({tag: tag}, {$pull: {tag: tag}}, {}, function (error, numReplaced) {
    console.log(`An error happened whiling handling find: ${error}`);
  })
  console.log(`Del success`);
  return newDoc;
}

async function isExist (arg, db) {
  const doc = await _find(arg, db);
  return doc.length > 0;
}

function _insert (arg, db) {
  if (!arg || typeof arg !== 'object') {
    throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
  }

  return new Promise((resolve, reject) => {
    db.insert(arg, (error, doc) => {
      error && reject(new Error(`An error happened whiling handling find: ${error}`));
      resolve(doc);
    })
  })
}

function _find (arg, db, sort, limit) {
  (!arg || typeof arg !== 'object') && (arg = {});
  return new Promise((resolve, reject) => {
    let exec = db.find(arg);
    sort && (exec = exec.sort(sort));
    limit && (exec = exec.limit(limit));
    exec.exec(function (error, docs) {
      error && reject(new Error(`An error happened whiling handling find: ${error}`));
      resolve(docs);
    })
  })
}

function _update (arg, newArg, db) {
  (!arg || typeof arg !== 'object') && (arg = {});
  return new Promise((resolve, reject) => {
    db.update(arg, {$set: newArg}, {}, function (error, numReplaced) {
      error && reject(new Error(`An error happened whiling handling find: ${error}`));
      resolve(numReplaced);
    })
  })
}

function _remove (arg, db) {
  if (!arg || typeof arg !== 'object') {
    throw new Error(`Function 'insert' except an object not ${typeof arg} as the first argument.`);
  }
  return new Promise((resolve, reject) => {
    db.remove(arg, {}, function (error) {
      error && reject(new Error(`An error happened while handling remove: ${error}`));
      resolve()
    })
  })
}

export default {
  movie: {
    add: addMovie,
    get: getMovies,
    getByTags: getMoviesByTags,
    update: updateMovie,
    del: deleteMovie
  },
  tv: {
    add: addTV,
    get: getTVs,
    getByTags: getTVsByTags,
    update: updateTV,
    del: deleteTV
  },
  default: {
    addTag: addTag,
    getTags: getTags,
    updateTag: updateTag,
    deleteTag: deleteTag
  }
}
