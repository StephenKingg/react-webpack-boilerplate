var http = require('http');
var fs = require('fs');
var server = new http.Server();
var port = 80;
var pathMiddle = '';
server.listen(port);
// 使用on方法监听请求
server.on('request', function(request, response) {
  // 当有request请求的时候触发处理函数
  // 解析请求的URL
  var url = require('url').parse(request.url);
  console.log(url.pathname);
  switch (url.pathname) {
    case '/' + pathMiddle:
      fs.readFile('./' + pathMiddle + 'index.html', function(err, content) {
        if (err) {
          response.writeHead(404, {
            'Content-Type': 'text/plain; charset="UTF-8"',
          });
          response.write(err.message);
          response.end();
        } else {
          response.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
          });
          response.write(content);
          response.end();
        }
      });
      break;

    default:
      // 处理来自本地目录的文件
      var filename = url.pathname.substring(1); // 去掉前导'/'
      var type = getType(filename.substring(filename.lastIndexOf('.') + 1));
      console.log('read file', '.' + url.pathname);
      // 异步读取文件,并将内容作为单独的数据模块传给回调函数
      fs.readFile('.' + url.pathname, function(err, content) {
        // console.log(content);
        if (err) {
          response.writeHead(404, {
            'Content-Type': 'text/plain; charset="UTF-8"',
          });
          response.write(err.message);
          response.end();
        } else {
          response.writeHead(200, { 'Content-Type': type });
          response.write(content);
          response.end();
        }
      });
      break;
  }
});
function getType(endTag){
    var type=null;
    switch(endTag){
        case 'html' :
        case 'htm' :
            type = 'text/html; charset=UTF-8';
            break;
        case 'js' :
            type = 'application/javascript; charset="UTF-8"';
            break;
        case 'css' :
            type = 'text/css; charset="UTF-8"';
            break;
        case 'txt' :
            type = 'text/plain; charset="UTF-8"';
            break;
        case 'json' :
            type = 'application/json; charset="UTF-8"';
            break;
        case 'manifest' :
            type = 'text/cache-manifest; charset="UTF-8"';
            break;
        case 'png':
            type='image/png';
            break;
        case 'gif':
            type='image/gif';
            break;
        case 'jpg':
            type='image/jpeg';
            break;
        case 'jpeg':
            type='image/jpeg';
            break;
        case 'svg':
            type='image/svg+xml';
            break;
        default :
            type = 'application/octet-stream';
            break;
    }
    return type;
}