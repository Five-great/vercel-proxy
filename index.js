const http = require('http');
const httpProxy = require('http-proxy');
// 创建代理服务器实例
const proxy = httpProxy.createProxyServer({
   // target: 'https://s.hunlihu.com', // 替换为你要代理的目标服务器地址
    changeOrigin: true,// 改变源地址，使目标服务器能正确识别请求来源
       autoRewrite: true,
//    protocolRewrite: 'http',
});
// 定义子目录和对应的目标服务器映射
const subdirectoryMappings = {
    'shunlihu': 'https://s.hunlihu.com',
};
// 创建HTTP服务器
const server = http.createServer((req, res) => {
        // proxyRes.headers =  
      proxy.options.target=subdirectoryMappings.shunlihu;
       
         req.headers['origin'] = subdirectoryMappings.shunlihu;
         req.headers['referer'] = subdirectoryMappings.shunlihu;
         req.headers['host'] = "h5.hunlihu.com";
         req.url = req.url.replace(new RegExp(`^\/shunlihu`), '');
             console.log(11,req.url, req.headers)
    // 将请求代理到目标服务器
    proxy.web(req, res);
});
// 监听端口
const port = 9080;
server.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});
     var headersData = {
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            Connection: "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Host: "h5.hunlihu.com",
            Origin: "https://s.hunlihu.com",
            Referer: "https://s.hunlihu.com/",
            "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "Windows",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36",
        };
// 处理代理错误
proxy.on('error', (err, req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy error: '+ err.message);
});
// 处理代理响应
proxy.on('proxyRes', (proxyRes, req, res) => {
    // 处理可能需要修改的响应头，比如修改 cookie 中的 domain 等
    // console.log(11, req.headers)
         proxyRes.headers =  req.headers
         proxyRes.headers['host'] = "h5.hunlihu.com";
         proxyRes.headers['origin'] = "https://s.hunlihu.com";
         proxyRes.headers['referer'] = "https://s.hunlihu.com";
  
            // console.log(` proxyRes.headers2`,req.url,req.headers, proxyRes.headers)
    if (proxyRes.headers['set-cookie']) {
        const cookies = proxyRes.headers['set-cookie'].map(cookie => {
            // 这里可以根据需要修改 cookie 的 domain
            return cookie;
        });
        proxyRes.headers['set-cookie'] = cookies;
         proxyRes.headers['Origin']="https://s.hunlihu.com";
         proxyRes.headers['Referer']="https://s.hunlihu.com";

    }
});
