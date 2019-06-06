/**
 * [驼峰转连字符]
 * xxxId -> xxx_id
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
var humpToHyphen = function (str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
/**
 * [时间格式转换yyyy-MM-dd]
 * @param {[type]} date [description]
 * @return {[type]} str
 */
var formatDate = function (date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  const hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  return [ year, month, day ].join('-') + ' ' + [ hours, minutes, seconds ].join(':')
};
module.exports = {
    humpToHyphen,
    formatDate
};
