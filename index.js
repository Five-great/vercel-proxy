const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

const axios = require('axios');
const querystring = require('querystring');

const getHunlihuAppJSData = (url, req) => {
    let headers = {};
    let head = {
        'sec-fetch-site': 'none',
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
    Object.keys(head).forEach((key) => {
        headers[key] = req.headers[key]
    })
    headers['origin'] = 'https://h5.hunlihu2.com';
    headers['referer'] = 'https://h5.hunlihu2.com';
    headers['host'] = "h.hunlihu.com";
    let forwarded = headers['forwarded']
    headers['sec-ch-ua-mobile'] = '?1',
        headers['forwarded'] = forwarded.replace(/love\.fivecc\.cn/gi, "h5.hunlihu2.com");
    headers['x-forwarded-host'] = "h.hunlihu.com";
    headers['x-forwarded-proto'] = 'http';

    headers['sec-ch-ua-platform'] = '"Android"';
    headers['sec-ch-ua'] = '"Chromium";v="130", "Android WebView";v="130", "Not?A_Brand";v="99"';
    headers['x-requested-with'] = 'com.tencent.mm';

    headers['user-agent'] = 'Mozilla/5.0 (Linux; Android 14; PJE110 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.103 Mobile Safari/537.36 XWEB/1300333 MMWEBSDK/20241202 MMWEBID/5968 MicroMessenger/8.0.56.2800(0x2800385B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64'
    console.error('请求出错:', headers);
    return new Promise((resolve, reject) => {
        try {
            const options = {
                hostname: 'h.hunlihu.com',
                path: url,
                port: 80,
                method: 'GET',
                headers: headers,
            };
            axios.get(url, {}, { headers: options.headers })
                .then(response => {
                    resolve(response.data)
                }).catch((err) => {
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
        } catch (err) {
            console.error('请求出错:', err);
        }
    })


}

let getFormData = (req) => {
    return new Promise((resolve, reject) => {
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

let getFormData2 = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            let body = '';

            // 监听 data 事件，接收数据块
            req.on('data', (chunk) => {
                if(chunk){
                body += chunk.toString();
                }
            });

            // 监听 end 事件，数据接收完成
            req.on('end', () => {
                // 解析请求体
                const formData = querystring.parse(body);

                // 打印解析后的数据
                console.log('解析后的表单数据:', formData);
                resolve(formData)

            });
        }else{
            resolve()
        }
    })
}
let uploadFiles = (req, res) => {

}

let ProxyvVhunlihu = (req, res, proxyUrl) => {
    var headersData = {
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Host: "v.hunlihu.com",
        Origin: "https://h5.hunlihu2.com",
        Referer: "https://h5.hunlihu2.com/",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36",
    };
    return new Promise((resolve, reject) => {
        getFormData2(req).then((formData)=>{
   let url = "http://v.hunlihu.com" + proxyUrl;
        // 目标服务器地址和端口
        const options = {
            headers: headersData
        };
            if(req.method=="OPTIONS"){

                // 配置请求选项
const config = {
    method: 'OPTIONS',
    url: url,
    headers: options.headers,
};
                // 发送 OPTIONS 请求
axios(config)
   .then(response => {
        resolve(response.data)
        console.log('响应状态码:', response.status);
    })
   .catch(error => {
        if (error.response) {
            // 请求已发出，但服务器响应状态码不在 2xx 范围内
            console.log('响应状态码:', error.response.status);
            console.log('响应头:', error.response.headers);
            console.log('响应数据:', error.response.data);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.log('没有收到响应:', error.request);
        } else {
            // 在设置请求时发生错误
            console.log('错误信息:', error.message);
        }
        console.log('错误配置:', error.config);
    });
            }else{

        // let url= "https://h5.hunlihu.com/vashow/ly/door/door/sign2";
     

        // // 将对象格式的数据转换为 x-www-form-urlencoded 格式
        const encodedData = querystring.stringify(formData);
                if(/getScene/.test(url)){
resolve({"code":200,"data":"15cc1df90d06091d0fccd4dac6cc1df9001f080df903080009ccd41517c6cc1df90e0f060f1e0fccd4dac6cc1df91a0b1d1d11091c0eccd4ccccc6cc08090801e603eb1c1cccd4f5ccdcdadcdfccc6cc8f3535ccc6cc8f272b8f3535ccf7c6cc1df91e031e060fccd4cc803728805f518358338f3c26803728803f29803f2981342e8f4334814e56832c2a824951ccc6cc1df90103001ef90c1e08ccd4dbc6cc1df900060911ccd4ccccc6cc1df9091a0f08f903080009ccd41517c6cc041d0908ccd4cc021e1e1a1dd4c9c9021f080603021fc8091d1dc70d08c714020b080104030b05091fc80b0603131f080d1dc80d0907c90d0b0d020fe41d0908c910db0b0fd10fd1dbfc10c8041d0908d91ed7dbd1dcccc6cc03f9031df91e0312030b08ccd4dac6cc03f9070b1c1c13f91e03070fccd4ccdcdadcdfc7dadfc7dbdbcadbdbd4dfd2ccc6cc03f907f903080009ccd415cc1a0209080fccd4ccdbdddad2d2dbdcdcd0ded3ccc6cc080b070fccd4cc803728805f51835833cc17c6cc03f90608060bf903080009ccd415cc0608ccd4ccdbdad0c8d1d2d2dfdadadadadadcd3d3d2dcccc6cc060bccd4ccdddac8dedadcdfdbd3d3deddddded0dedfdfccc6cc14090907ccd4ccdbdfcc17c6cc0b0eccd415cc11031e02f91a0b13f90b0ef90c1f1e1e0908ccd41e1c1f0fc6cc1d0f1a0b1c0b1e0ff90b0eccd4000b061d0fc6cc070f1cccd415cc1c09060fccd4ddc6cc020f0b0e030701ccd4ccd1f90bd1de0b00de0cd1db0c00dc0dda0cda0fda0e00dcd100dedcc8041a01ccc6cc070f1cf9080b070fccd4cc8f4334814e568e53288f4832803053ccc6cc070f1cf90e0f1e0b0306f903080009ccd415cc0c0b1d030df903080009ccd415cc1e0f06ccd4ccdedadad3d3d0d0dadbddccc6cc0b0e0e1cccd4cc8f35358f51376c5180223a832d576c518f43348e532881413b80242acc17c6cc030810f90b0eccd415cc0b0d1e03100fccd4dac6cc06090109ccd4ccd1f9dc000fddd2deda0b0d0bdad30bdad0dedc0f0fdbdf0c0f000dc81a0801ccc6cc001f0e0b03ccd4ccccc6cc1d1e13060fccd4db17c6cc0608060bccd415cc0608ccd4dbdadec8dad1ded2d0d0ddd1d0d1d0dadad1c6cc060bccd4dddac8dfdedcd1d0dcdfdcdbdededad0d2dcc6cc14090907ccd4dbd21717c6cc0d1c0f0b1e0f070f081eccd4dbc6cc02dff90f080ef91e03070fccd4ccdcdad3d3c7dadcc7dbd0cc1717c6cc1df90009091ef9070b1c05ccd4dbc6cc1e09f90b1a1accd41e1c1f0fc6cc1df90d09081e0f081eccd4cc9a393c31824934802634832c2a824951802c428f292c8f244a80223b8e554681342e8f4334814e5618ccc6cc0103001ef91e131a0fccd4ccdbccc6cc1df90c1f1e1e0908f903080009ccd415cc11031d02ccd4dbc6cc0009060eccd4dbc6cc0d0906091cccd4cccdefdbd1dfd1dfccc6cc0603050fccd4dbc6cc1d030108ccd4dbc6cc1e0f06ccd4dbc6cc030810031e0fccd4dbc6cc070b1accd4db17c6cc1df90307011f1c06ccd4ccdbdddedad3f9d1d0d1dfdddedcd00e0cdfdd0bdf0cd1d0d10d0bdddfdf0bdbc8041a01ccc6cc1df906090b0e030801ccd4dbc6cc1dccd4dcc6cc1df9031d1a0b13ccd4dac6cc1df91d03140ff903080009ccd415cc11030e1e02ccd4dedadac6cc020f0301021eccd4dbdfd0dad217c6cc1df90c0107f903080009ccd415cc071f1d030df91f1c06ccd4ccdadadaf412f1fd08dc1c1d01eed2c8071addccc6cc071f1d030df9080b070fccd4cc8f5a298f4334814e56cac7ca8f3a5e8f5554825b44cc17c6cc1df91a0b010ff903080009ccd415cc1a0b010ff91d1a0f0f0eccd4d3da17c6cc03f900f903080009ccd415cc080b070fccd4cc803728803f29803f29cc17c6cc030e1dccd4cc10db0b0fd10fd1dbfc10ccc6cc1e0f071a060b1e0ff9030eccd4dcdfd2dcc6cc1d0f1c030b06f90809ccd4dbd1dcc6cc03f902091e0f06f903080009ccd415cc02091e0f06ccd4cc8f2728823d4f822349805d5a8f355783332fccc6cc1a060b0d0fccd4cc8f35358f513781362b8f53598f48238f522c8f2728823d4f8f522c822349805d5a8f355783332f832f3c8f5431dc804f568f485e8e56348f282fdbcc17c6cc1df91d1a0f0d0300030d0b1e030908ccd4dc17","message":"OK"})
                   return }   // // 更新请求头中的 Content-Length
        options.headers['Content-Length'] = Buffer.byteLength(encodedData);
        axios.post(url, encodedData, { headers: options.headers })
            .then(response => {
                console.log('请求成功，响应数据:', req, response.data);
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
 }
        })
   
    })
}
let getProxyInfoData = (req, res, proxyUrl) => {

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
    return new Promise((resolve, reject) => {
        getFormData(req).then((formData) => {
            formData.ua ? headersData["sec-ch-ua"] = formData.ua : ''

            // 目标服务器地址和端口
            const options = {
                headers: headersData
            };

            // let url= "https://h5.hunlihu.com/vashow/ly/door/door/sign2";
            let url = "http://h5.hunlihu.com" + proxyUrl;

            // 将对象格式的数据转换为 x-www-form-urlencoded 格式
            const encodedData = querystring.stringify(formData);

            // 更新请求头中的 Content-Length
            options.headers['Content-Length'] = Buffer.byteLength(encodedData);
            axios.post(url, encodedData, { headers: options.headers })
                .then(response => {
                    console.log('请求成功，响应数据:', req, response.data);
                    resolve(response.data)
                }).catch((err) => {
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
    "blogs": "https://img2024.cnblogs.com",
    "upload": "https://upload.cnblogs.com",
    "app": "https://h5.hunlihu2.com",
};
// 创建HTTP服务器
const server = http.createServer(async (req, res) => {

    if (new RegExp(`^\/static-img\/`).test(req.url)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        proxy.options.target = subdirectoryMappings.blogs;

        req.headers['origin'] = subdirectoryMappings.blogs;
        req.headers['referer'] = 'https://www.cnblogs.com/';
        req.headers['host'] = "img2024.cnblogs.com";
        req.url = req.url.replace(new RegExp(`^\/static-img`), '/blog');

        // 将请求代理到目标服务器
        proxy.web(req, res);
    }
    if (new RegExp(`^\/static\/`).test(req.url)) {
        // proxyRes.headers =  
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (/\/inv\/js\//.test(req.url)) {
            let proxyData = await getHunlihuAppJSData(`http://h.hunlihu.com${req.url}`, req)
            if (/\/inv\/js\/index\-/.test(req.url)) {
                proxyData = proxyData.replace(/"\/\/h.hunlihu.com\/"/gi, '"//vercel-proxy.fivecc.cn/"');
                proxyData = proxyData.replace(/"https\:\/\/v.hunlihu.com\/"/gi, '"https://vercel-proxy.fivecc.cn/apiv/"');
                 proxyData = proxyData.replace(/\/\/h.hunlihu.com\//gi, '//vercel-proxy.fivecc.cn/static/');
            }

            res.writeHead(200, { 'Content-Type': 'application/javascript;charset=utf-8' });
            res.end(proxyData);
        } else {

            proxy.options.target = 'https://h.hunlihu.com';
            // req.headers['Access-Control-Allow-Origin']='https://h5.hunlihu2.com';
            req.headers['origin'] = subdirectoryMappings.app;
            req.headers['referer'] = subdirectoryMappings.app;
            req.headers['host'] = "h.hunlihu.com";
            req.url = req.url.replace(new RegExp(`^\/static`), '');
            // 将请求代理到目标服务器
            proxy.web(req, res);
        }
    }
    if (new RegExp(`^\/apiv\/`).test(req.url)) {
        // proxyRes.headers =  
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        proxy.options.target = 'https://v.hunlihu.com';

        req.headers['origin'] = subdirectoryMappings.app;
        req.headers['referer'] = subdirectoryMappings.app;
        req.headers['host'] = "v.hunlihu.com";
        req.url = req.url.replace(new RegExp(`^\/apiv`), '');
           let proxyData = await ProxyvVhunlihu(req, res, req.url)
           res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
           res.end(proxyData);

        // 将请求代理到目标服务器
        // proxy.web(req, res);
    }
    if (new RegExp(`^\/shunlihu\/`).test(req.url)) {
        // proxyRes.headers =  
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        proxy.options.target = subdirectoryMappings.shunlihu;

        req.headers['origin'] = subdirectoryMappings.shunlihu;
        req.headers['referer'] = subdirectoryMappings.shunlihu;
        req.headers['host'] = "h5.hunlihu.com";
        req.url = req.url.replace(new RegExp(`^\/shunlihu`), '');

        // 将请求代理到目标服务器
        proxy.web(req, res);
    }
    if (new RegExp(`^\/h5hunlihu\/`).test(req.url)) {
        // proxyRes.headers =  
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        //https://h5.hunlihu.com/vashow/ly/door/door/init?0.9173087912286308
        if (/\/vashow\/ly\/door\/door\/init/.test(req.url)) {
            let proxyData = await getProxyInfoData(req, res, req.url.replace(/^\/h5hunlihu/, ''))
            eval('var proxyDataObj =' + proxyData)
            proxyDataObj.info.is_pay = '1'
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(`${JSON.stringify(proxyDataObj)}`);
        } else {
            proxy.options.target = subdirectoryMappings.h5hunlihu;
            req.headers['origin'] = subdirectoryMappings.shunlihu;
            req.headers['referer'] = subdirectoryMappings.shunlihu;
            req.headers['host'] = "h5.hunlihu.com";
            req.url = req.url.replace(new RegExp(`^\/h5hunlihu`), '');
            // 将请求代理到目标服务器
            proxy.web(req, res);
        }


    }
    if (new RegExp(`^\/map`).test(req.url)) {
        // proxyRes.headers =  
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        //https://h5.hunlihu.com/vashow/ly/door/door/init?0.9173087912286308

        proxy.options.target = subdirectoryMappings.map;
        req.headers['origin'] = subdirectoryMappings.shunlihu;
        req.headers['referer'] = subdirectoryMappings.shunlihu;
        req.headers['host'] = "api.map.baidu.com";
        req.url = req.url.replace(new RegExp(`^\/map`), '/');
        if (/qt=verify\&callback\=BMap/.test(req.url)) {
            const regex = /callback=([^&]+)/;
            const match = req.url.match(regex);
            const callbackValue = match[1];
            res.writeHead(200, {
                'Content-Type': 'application/javascript;charset=utf-8'
            });
            res.end(`/**/${callbackValue} && ${callbackValue}({error: 0})`)
            return
        }
        if (/qt=jsapi_log/.test(req.url)) {

            const regex = /callback=([^&]+)/;
            const match = req.url.match(regex);
            if (match && match.length > 1) {
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
    if (new RegExp(`^\/api\/upload`).test(req.url)) {
        // proxyRes.headers =  
        res.setHeader('Access-Control-Allow-Origin', '*');
        // 允许所有请求方法
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // 允许所有请求头
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
        // 允许携带凭证（如 cookies）
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        //https://h5.hunlihu.com/vashow/ly/door/door/init?0.9173087912286308
        proxy.options.target = subdirectoryMappings.upload;
        req.headers['origin'] = 'https://i.cnblogs.com';
        req.headers['referer'] = 'https://i.cnblogs.com';
        req.headers['host'] = "upload.cnblogs.com";
        req.url = req.url.replace(new RegExp(`^\/api\/upload`), '/imageuploader/CorsUpload');
        if (req.method === 'POST') {

            uploadFiles(req, res)
        } else {
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
    res.end('Proxy error: ' + err.message);
});
// 处理代理响应
proxy.on('proxyRes', (proxyRes, req, res) => {
    // 处理可能需要修改的响应头，比如修改 cookie 中的 domain 等

    // proxyRes.headers =  res.headers
    console.log(11, proxyRes.headers, req.headers, res.headers)
    if (req.headers['host'] == "h.hunlihu.com") {
        proxyRes.headers['origin'] = "https://h5.hunlihu2.com";
        proxyRes.headers['referer'] = "https://h5.hunlihu2.com";
    } else {
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
        if (req.headers['host'] == "h.hunlihu.com") {
            proxyRes.headers['Origin'] = "https://h5.hunlihu2.com";
            proxyRes.headers['Referer'] = "https://h5.hunlihu2.com";
        } else {
            proxyRes.headers['Origin'] = "https://s.hunlihu.com";
            proxyRes.headers['Referer'] = "https://s.hunlihu.com";
        }


    }
});
