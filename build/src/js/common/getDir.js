/**
 *
 * @param {string} paths
 * @return {object}
 */
cmn.getDir = (paths) => {
  const paths_array = paths.split('/').filter(Boolean),
        obj = {}

  if (paths_array.length === 0) {
    obj.level1 = 'home'
  } else {
    paths_array.forEach((path, index) => {
      obj[`level${index + 1}`] = path
    })
  }

  return obj
}