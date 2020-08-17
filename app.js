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
                let num = 0
                if(page == 'index.html'){
                    num = 1
                } else if(page == 'about.html'){
                    num = 2
                } else if(page == 'contact.html'){
                    num3
                }
                res.write(`
                <!-- Navigation-->
                <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                  <div class="container">
                      <a class="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
                      <button class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                          Menu
                          <i class="fas fa-bars"></i>
                      </button>
                      <div class="collapse navbar-collapse" id="navbarResponsive">
                          <ul class="navbar-nav ml-auto">
                              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/">Portfolio</a></li>
                              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/about">About</a></li>
                              <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/contact">Contact</a></li>
                          </ul>
                      </div>
                  </div>
              </nav>
              `)
                res.end(data,'utf-8')
            }
    
        })
 }

}).listen("8080")
