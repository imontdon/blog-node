const https = require('https')

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
  method: 'GET',
  headers: {
    Host: 'i.hdu.edu.cn',
    Connection: 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-User': '?1',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Sec-Fetch-Site': 'none',
    Referer: 'https://i.hdu.edu.cn/tp_up/view;tp_up=uu__GyqlnihxRYaqhbtL6L95mW70dtrKkKJgttj5N4QJOavgLNOf!1661803318?m=up',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    Cookie: 'tp_up=uu__GyqlnihxRYaqhbtL6L95mW70dtrKkKJgttj5N4QJOavgLNOf!1661803318',
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