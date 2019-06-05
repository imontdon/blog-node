/**
 * [驼峰转连字符]
 * xxxId -> xxx_id
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
const humpToHyphen = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

module.exports = {
  humpToHyphen
}