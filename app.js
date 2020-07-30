var http = require('http');

var fs = require('fs');

var url = require('url');

var hostname = "localhost";

var part = 8888;

// 模板
var template = require('art-template');

var comments = [
    {
        name: '张三',
        message:'经历诸多事，我眼中河山，已有新意',
        dateTime: '2030-11-3'
    },
    {
        name: '李四',
        message:'经历诸多事，我眼中河山，已有新意',
        dateTime: '2030-11-3'
    },
    {
        name: '王五',
        message:'经历诸多事，我眼中河山，已有新意',
        dateTime: '2030-11-3'
    },
    {
        name: '齐六',
        message:'经历诸多事，我眼中河山，已有新意',
        dateTime: '2030-11-3'
    },
    {
        name: '刘七',
        message:'经历诸多事，我眼中河山，已有新意!',
        dateTime: '2030-11-3'
    }
]
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    // parse解析url，主要是为了获取表单提交的数据
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./view/homePage.html', function (err, data) {
            if (err) return 'error!!!';
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })
    } else if (pathname.indexOf('/public/') === 0) {

        fs.readFile('.' + pathname, function (err, data) {
            if (err) return 'error!!!';
            res.end(data)
        })
    }else if(pathname === '/post'){
        fs.readFile('./view/post.html', function(err,data) {
            if(err) return res.end('404 not found');
            res.end(data);
        })
    }else if(pathname.indexOf('comment') !== -1) {
        // 处理时间
        const date = new Date();
        const date_day = date.getDate();
        const date_month = date.getMonth() + 1;
        const date_year = date.getFullYear()
    
        urlObj.query.dateTime = date_year + '-' + date_month + '-' + date_day;
        comments.unshift(urlObj.query)
        // 数据更改之后要返回视图，重定向
        // 改变状态码---302 临时重定向
        // 在响应头中通过location告诉客户端重定向的位置  setHeader

        res.statusCode = 302;
        res.setHeader('Location', '/');
        // 不要忘了返回使用end
        res.end();
    } else{
        fs.readFile('./view/notFound.html', function(err,data) {
            if(err) return res.end('404 not found');
            res.end(data);
        })
    }
}).listen(8888, function () {
    console.log(`server is running at http://${hostname}:${{part}}`);
})