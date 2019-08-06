/**
 * [驼峰转连字符]
 * xxxId -> xxx_id
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
const humpToHyphen = function (str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
/**
 * [时间格式转换yyyy-MM-dd]
 * @param {[type]} date [description]
 * @return {[type]} str
 */
const formatDate = function (date) {
  const year = date.getFullYear()
  // const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  const month = getDate(date.getMonth() + 1)
  const day = getDate(date.getDate())
  const hours = getDate(date.getHours())
  const minutes = getDate(date.getMinutes())
  const seconds = getDate(date.getSeconds())
  /* const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  const hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  const seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds() */
  return [ year, month, day ].join('-') + ' ' + [ hours, minutes, seconds ].join(':')
};

const getDate = (number) => {
  return number >= 10 ? number : '0' + number
}


const FILE = {
  URL: 'http://192.168.22.240:1997/uploads/',
  TYPE: {
    VOICE: 'voice',
    IMG: 'img',
    VIDEO: 'video',
    FILE: 'file'
  },
  FILEPATH: './public/uploads/'
}
module.exports = {
    humpToHyphen,
    formatDate,
    FILE
};
