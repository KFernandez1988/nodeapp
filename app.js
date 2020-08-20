const filesys = require("fs")
const http = require("http")
const path = require("path")
const url = require("url")


http.createServer(function(req, res) {

    let parsed = url.parse(req.url)
    let filename = path.parse(parsed.pathname)
        console.log(filename)
    let filen = filename.name == "" ? "index" : filename.name
    let ext = filename.ext == ""?".html": filename.ext
    let dir = filename.dir == "/"? "": filename.dir+"/"
    let page = filename.name == "" ? "index.html": filename.name

    let file = (dir+filen+ext).replace("/","")

    let mTypes = {
        '.html': 'text/html',
        '.js': "text/javascript",
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    }
    if(file){
        console.log('file is good')
        filesys.readFile( file, function(err, data) {
            console.log(mTypes[ext])
            if(page) {
                console.log(page)
                if(mTypes.hasOwnProperty(ext))
                res.writeHead(200, {'Content-type': mTypes[ext] })
                
                res.write(`
                
                 <script> var page = "${filen}" </script>;
              `)
                res.end(data,'utf-8')
            }
    
        })
 }

}).listen("8080")
