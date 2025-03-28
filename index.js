const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

const axios = require('axios');
const querystring = require('querystring');

const getHunlihuAppJSData = (url,req) => {
    let headers = {};
  let head=  {'sec-fetch-site': 'none',
  'x-forwarded-host': 'love.fivecc.cn',
  'sec-ch-ua-platform': '"Android"',
  'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'sec-fetch-mode': 'navigate',
  priority: 'u=0, i',
  'x-forwarded-for': '110.184.235.156',
  'x-forwarded-proto': 'http',
  'upgrade-insecure-requests': '1',
  forwarded: 'for=110.184.235.156;host=love.fivecc.cn;proto=https;sig=0QmVhcmVyIGFiOTlhNTU4OGMwMDkyMjAyYzFkM2IzMDMxNDNkNTQzYzMyOGQ5MzU5ODQ3MGMyNThmZDlmMTFmODAzMjRlZmY=;exp=1741737563',
  'sec-ch-ua-mobile': '?1',
  'user-agent': 'Mozilla/5.0 (Linux; Android 14; PJE110 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.103 Mobile Safari/537.36 XWEB/1300333 MMWEBSDK/20241202 MMWEBID/5968 MicroMessenger/8.0.56.2800(0x2800385B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
  'x-requested-with': 'com.tencent.mm',
   host: 's.hunlihu.com',
  'sec-ch-ua': '"Chromium";v="130", "Android WebView";v="130", "Not?A_Brand";v="99"',
  'sec-fetch-user': '?1',
    }
    Object.keys(head).forEach((key)=>{
        headers[key] = req.headers[key]
    })
      headers['origin'] = 'https://h5.hunlihu2.com';
       headers['referer'] = 'https://h5.hunlihu2.com';
      headers['host'] = "h.hunlihu.com";
    let forwarded = headers['forwarded'] 
     headers['sec-ch-ua-mobile']='?1',
    headers['forwarded'] = forwarded.replace(/love\.fivecc\.cn/gi, "h5.hunlihu2.com");
    headers['x-forwarded-host'] = "h.hunlihu.com";
    headers['x-forwarded-proto'] = 'http';
    
    headers['sec-ch-ua-platform'] = '"Android"';
    headers['sec-ch-ua'] = '"Chromium";v="130", "Android WebView";v="130", "Not?A_Brand";v="99"';
    headers['x-requested-with'] = 'com.tencent.mm';
  
    headers['user-agent']= 'Mozilla/5.0 (Linux; Android 14; PJE110 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.103 Mobile Safari/537.36 XWEB/1300333 MMWEBSDK/20241202 MMWEBID/5968 MicroMessenger/8.0.56.2800(0x2800385B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64'
       console.error('请求出错:', headers);
    return new Promise((resolve, reject) => {
        try{
        const options = {
    hostname: 'h.hunlihu.com',
    path: url,
            port: 80,
    method: 'GET',
    headers: headers,
};
                  axios.get(url, {}, { headers:options.headers })
        .then(response => {
            console.log('请求成功，响应数据:', req,response.data);
            resolve(response.data)
        }).catch((err)=>{
            reject(err)
        })
        // http.request(options, (resdata) => {
        //     let data = '';

        //     // 监听 data 事件，接收数据块
        //     resdata.on('data', (chunk) => {
        //         data += chunk;
        //     });

        //     // 监听 end 事件，数据接收完成
        //     resdata.on('end', () => {
        //         resolve(data)
        //     });

        // }).on('error', (err) => {
        //     console.error('请求出错:', err.message);
        //     reject(err.message)
        // });
        }catch(err){
             console.error('请求出错:', err);
        }
    })


}

let getFormData = (req)=>{
    return new Promise((resolve,reject)=>{
        if (req.method === 'POST' && /application\/x\-www\-form\-urlencoded/.test(req.headers['content-type'])) {
            let body = '';
    
            // 监听 data 事件，接收数据块
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
    
            // 监听 end 事件，数据接收完成
            req.on('end', () => {
                // 解析请求体
                const formData = querystring.parse(body);
               
                // 打印解析后的数据
                // console.log('解析后的表单数据:', formData);
                resolve(formData)
                
            });
        }

    })
}

let uploadFiles=(req,res)=>{
  
}
let getProxyInfoData = (req, res, proxyUrl)=>{

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
    let body = req.body
//   let formData = {
//     'auth': 'Lz8rzL8zzt',
//     'jsons': `[{"d_name":"five123","user_agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36","msg_type":"1","openid":"","nickname":"哈哈1","headimgurl":"","d_else":"新婚快乐 百年好合"}]`

//   }
return new Promise((resolve,reject)=>{
    getFormData(req).then((formData)=>{
        formData.ua? headersData["sec-ch-ua"]=formData.ua:''
       
// 目标服务器地址和端口
    const options = {
     headers: headersData
    };
    
    // let url= "https://h5.hunlihu.com/vashow/ly/door/door/sign2";
    let url= "http://h5.hunlihu.com"+proxyUrl;
    
        // 将对象格式的数据转换为 x-www-form-urlencoded 格式
        const encodedData = querystring.stringify(formData);

        // 更新请求头中的 Content-Length
        options.headers['Content-Length'] = Buffer.byteLength(encodedData);
        axios.post(url, encodedData, { headers:options.headers })
        .then(response => {
            console.log('请求成功，响应数据:', req,response.data);
            resolve(response.data)
        }).catch((err)=>{
            reject(err)
        })

    })

 })
}
    




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
     'h5hunlihu': 'https://h5.hunlihu.com',
     'map': "https://api.map.baidu.com",
     "blogs":  "https://img2024.cnblogs.com",
     "upload": "https://upload.cnblogs.com",
     "app": "https://h5.hunlihu2.com",
};
// 创建HTTP服务器
const server = http.createServer(async(req, res) => {
    
   if(new RegExp(`^\/static-img\/`).test(req.url)){
         res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许所有请求方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 允许所有请求头
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
    // 允许携带凭证（如 cookies）
    res.setHeader('Access-Control-Allow-Credentials', 'true');
      proxy.options.target=subdirectoryMappings.blogs;
       
         req.headers['origin'] = subdirectoryMappings.blogs;
         req.headers['referer'] = 'https://www.cnblogs.com/';
         req.headers['host'] = "img2024.cnblogs.com";
         req.url = req.url.replace(new RegExp(`^\/static-img`), '/blog');
            
    // 将请求代理到目标服务器
     proxy.web(req, res);
   }
    if(new RegExp(`^\/static\/`).test(req.url)){
        // proxyRes.headers =  
     res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许所有请求方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 允许所有请求头
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
    // 允许携带凭证（如 cookies）
    res.setHeader('Access-Control-Allow-Credentials', 'true');
 if(/\/inv\/js\//.test(req.url)){
       let proxyData = await getHunlihuAppJSData(`http://h.hunlihu.com${req.url}`,req)
           if(/\/inv\/js\/index\-/.test(req.url)){
                proxyData = proxyData.replace(/"\/\/h.hunlihu.com\/"/gi, '"//vercel-proxy.fivecc.cn/"');
           }
    
       res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
        res.end(proxyData);
 }else{
      
      proxy.options.target='https://h.hunlihu.com';
         // req.headers['Access-Control-Allow-Origin']='https://h5.hunlihu2.com';
         req.headers['origin'] = subdirectoryMappings.app;
         req.headers['referer'] = subdirectoryMappings.app;
         req.headers['host'] = "h.hunlihu.com";
            
    // 将请求代理到目标服务器
     proxy.web(req, res);
 }
   }
   if(new RegExp(`^\/shunlihu\/`).test(req.url)){
        // proxyRes.headers =  
     res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许所有请求方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 允许所有请求头
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
    // 允许携带凭证（如 cookies）
    res.setHeader('Access-Control-Allow-Credentials', 'true');
      proxy.options.target=subdirectoryMappings.shunlihu;
      
         req.headers['origin'] = subdirectoryMappings.shunlihu;
         req.headers['referer'] = subdirectoryMappings.shunlihu;
         req.headers['host'] = "h5.hunlihu.com";
         req.url = req.url.replace(new RegExp(`^\/shunlihu`), '');
            
    // 将请求代理到目标服务器
     proxy.web(req, res);
   }
    if(new RegExp(`^\/h5hunlihu\/`).test(req.url)){
        // proxyRes.headers =  
     res.setHeader('Access-Control-Allow-Origin', '*');
    // 允许所有请求方法
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 允许所有请求头
    res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
    // 允许携带凭证（如 cookies）
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    //https://h5.hunlihu.com/vashow/ly/door/door/init?0.9173087912286308
    if(/\/vashow\/ly\/door\/door\/init/.test(req.url)){
       let proxyData = await getProxyInfoData(req, res,req.url.replace(/^\/h5hunlihu/, ''))
       eval('var proxyDataObj ='+proxyData)
       proxyDataObj.info.is_pay='1'
       res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(`${JSON.stringify(proxyDataObj)}`);
    }else{
        proxy.options.target=subdirectoryMappings.h5hunlihu;
        req.headers['origin'] = subdirectoryMappings.shunlihu;
        req.headers['referer'] = subdirectoryMappings.shunlihu;
        req.headers['host'] = "h5.hunlihu.com";
        req.url = req.url.replace(new RegExp(`^\/h5hunlihu`), '');
      // 将请求代理到目标服务器
        proxy.web(req, res);
    }
      
      
   }
   if(new RegExp(`^\/map`).test(req.url)){
    // proxyRes.headers =  
 res.setHeader('Access-Control-Allow-Origin', '*');
// 允许所有请求方法
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// 允许所有请求头
res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
// 允许携带凭证（如 cookies）
res.setHeader('Access-Control-Allow-Credentials', 'true');
//https://h5.hunlihu.com/vashow/ly/door/door/init?0.9173087912286308

    proxy.options.target=subdirectoryMappings.map;
    req.headers['origin'] = subdirectoryMappings.shunlihu;
    req.headers['referer'] = subdirectoryMappings.shunlihu;
    req.headers['host'] =  "api.map.baidu.com";
    req.url = req.url.replace(new RegExp(`^\/map`), '/');
       if(/qt=verify\&callback\=BMap/.test(req.url)){
           const regex = /callback=([^&]+)/;
           const match = req.url.match(regex);
           const callbackValue = match[1];
           res.writeHead(200, {
                'Content-Type': 'application/javascript;charset=utf-8'
            });
           res.end(`/**/${callbackValue} && ${callbackValue}({error: 0})`)
           return
       }
       if(/qt=jsapi_log/.test(req.url)){
           
           const regex = /callback=([^&]+)/;
           const match = req.url.match(regex);
           if(match&&match.length>1){
            const callbackValue = match[1];
            res.writeHead(200, {
                'Content-Type': 'application/javascript;charset=utf-8'
            });
            res.end(`/**/${callbackValue} && ${callbackValue}({"result":{"error":0}})`)
            return
           }
       }
  // 将请求代理到目标服务器
    proxy.web(req, res);
}
   if(new RegExp(`^\/api\/upload`).test(req.url)){
    // proxyRes.headers =  
 res.setHeader('Access-Control-Allow-Origin', '*');
// 允许所有请求方法
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// 允许所有请求头
res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
// 允许携带凭证（如 cookies）
res.setHeader('Access-Control-Allow-Credentials', 'true');
//https://h5.hunlihu.com/vashow/ly/door/door/init?0.9173087912286308
    proxy.options.target=subdirectoryMappings.upload;
    req.headers['origin'] = 'https://i.cnblogs.com';
    req.headers['referer'] = 'https://i.cnblogs.com';
    req.headers['host'] =  "upload.cnblogs.com";
    req.url = req.url.replace(new RegExp(`^\/api\/upload`), '/imageuploader/CorsUpload');
     if(req.method === 'POST'){
         
       uploadFiles(req, res)
     }else{
                 // 设置响应状态码
        res.writeHead(204, { 'Content-Length': 0 });
        res.end();

  // 将请求代理到目标服务器
    // proxy.web(req, res);
     }
}
    
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
  
         // proxyRes.headers =  res.headers
      console.log(11,proxyRes.headers, req.headers,res.headers)
    if(req.headers['host'] == "h.hunlihu.com"){
         proxyRes.headers['origin'] = "https://h5.hunlihu2.com";
         proxyRes.headers['referer'] = "https://h5.hunlihu2.com";
    }else{
           proxyRes.headers['host'] = "h5.hunlihu.com";
         proxyRes.headers['origin'] = "https://s.hunlihu.com";
         proxyRes.headers['referer'] = "https://s.hunlihu.com";
    }
              
  
            // console.log(` proxyRes.headers2`,req.url,req.headers, proxyRes.headers)
    if (proxyRes.headers['set-cookie']) {
        const cookies = proxyRes.headers['set-cookie'].map(cookie => {
            // 这里可以根据需要修改 cookie 的 domain
            return cookie;
        });
        proxyRes.headers['set-cookie'] = cookies;
          if(req.headers['host'] == "h.hunlihu.com"){
         proxyRes.headers['Origin'] = "https://h5.hunlihu2.com";
         proxyRes.headers['Referer'] = "https://h5.hunlihu2.com";
    }else{
            proxyRes.headers['Origin']="https://s.hunlihu.com";
         proxyRes.headers['Referer']="https://s.hunlihu.com";
    }
      

    }
});
