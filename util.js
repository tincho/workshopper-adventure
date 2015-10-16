const path   = require('path')
    , fs     = require('fs')
    , vw     = require('visualwidth')


function repeat (ch, sz) {
  return new Array(sz + 1).join(ch)
}


function idFromName (id) {
  if (id === null || id === undefined)
    id = ""
  
  return id.toString().toLowerCase()
    .replace(/^\s+|\s+$/g, '')
    .replace(/\s/g, '_')
    .replace(/[^\w]/gi, '')
}


function dirFromName (exerciseDir, name) {
  if (typeof exerciseDir !== 'string') {
    return null;
  }
  return path.join(exerciseDir, idFromName(name))
}

function getFsObject(type, file, base) {
  var stat
  
  if (typeof base !== 'string' || typeof file !== 'string')
    return null

  file = path.resolve(base, file)
  try {
    stat = fs.statSync(file)
  } catch(e) {}

  if (!stat || !(type === 'file' ? stat.isFile() : stat.isDirectory()))
    return null

  return file
}

module.exports = {
	  idFromName: idFromName
	, dirFromName: dirFromName
  , repeat: repeat
  , getDir: getFsObject.bind(null, 'dir')
  , getFile: getFsObject.bind(null, 'file')
}
