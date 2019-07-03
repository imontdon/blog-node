const https = require('https')
const querystring = require('querystring')



/* const postData = querystring.stringify({
  'service': 'https%3A%2F%2Fi.hdu.edu.cn%2Ftp_up%2F'
}); */
// https://cas.hdu.edu.cn/cas/login?service=https%3A%2F%2Fi.hdu.edu.cn%2Ftp_up%2F
const options = {
  // hostname: 'cas.hdu.edu.cn',
  hostname: 'i.hdu.edu.cn',
  port: 443,
  // path: '/cas/login',
  path: '/tp_up/view?m=up',
  method: 'POST',
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    Connection: 'keep-alive',
    'Content-Length': 351,
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: 'Language=zh_CN; jsessionid_cas=ZvBoAqQuT79rlTm3et3rSQ8Ik87NQIrH2-YVn5IK8MhAAKoG44V5!1190985634',
    Host: 'cas.hdu.edu.cn',
    Origin: 'https://cas.hdu.edu.cn',
    Referer: 'https://cas.hdu.edu.cn/cas/login?service=https%3A%2F%2Fi.hdu.edu.cn%2Ftp_up%2F',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36'
  }
};

const req = https.request(options, (res) => {
  // console.log(`res：`, res)
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中已无数据');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入请求主体。
// req.write(postData);
req.end();