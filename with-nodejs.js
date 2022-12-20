// server creation

const { Console } = require("console");
const http = require("http");

const port = 8081;

const toDoList = ["Need to learn", "Need to code"];

//http method

// GET => getting certain details from server / default method/ n it can directly work on any browser
// PUT => overwrite, fully update
// DELETE => Deleting data from server
// PATCH => Update very few fields / certain fields
// POST => Sending to the server



http
.createServer((req , res) => {
    // res.writeHead(200, {"Content-Type" : "text/html"});
    // res.write("<h4>Hello, shubham bhoyar new server</h4>");
    // res.end();

    // const {method, url} = req;
    //  console.log(method,url);
    //  res.end();
    // if(url === "/todos"){
    //  http://localhost:8081/todos
    // if(method === "GET"){
    //     res.writeHead(200,{"content-Type": "text/html"});
    //     res.write(toDoList.toString)
    //     res.end();
    // }  
    // else{
    //     res.write(401);
    // }
    // }

    const{method, url} = req;
    // console.log(method, url);
    // res.end();
    if(url === "/todos"){ 
     //   http://localhost:8081/todos
    if(method === "GET"){
        res.writeHead(200,{"content-Type":"text/html"});
        res.write(toDoList.toString());
        res.end();
    }else if(method === "POST"){
        let body = "";
        req.on('error', (err) =>{
            console.log(err);
        }).on('data',(chunk) => { 
            //body = body + chunk;
            body += chunk;
            // console.log(chunk);
        }).on('end',() => {
            body=JSON.parse(body);
            // console.log("body data",body);
            let newToDo = toDoList;
            newToDo.push(body.item);
            console.log(newToDo);
            res.writeHead(201);
        });
    }else if(method === "DELETE"){
        let body = '';
        req.on('error',(err) => {
            console.error(err);
        })
        .on('data',(chunk) => {
            body += chunk;
        })
        .on('end',() =>{
            body = JSON.parse(body);
            let deleteItem = body.item;
            for(let i=0; i<toDoList.length; i++){
                if(toDoList[i]===deleteItem){
                    toDoList.splice(i,1)
                    break;
                }
            }
            res.writeHead(204);

        })
    }
    else{
        res.writeHead(401);
    }
    res.end();

}


})
.listen(port, () =>{
    console.log(`My NodeJs server started on port ${port}`);
});


//  http://localhost:8081
//  http://localhost:8081/
//  http://localhost:8081/home
//  http://localhost:8081/aboutUs
//  http://localhost:8081/contactUs


//CSR
// Client Side Rendered

//  url : http://localhost:8081 (req)
//  Server side Data (res)
//  html,css,js(tons of js operations woudl be carried here)
//  all the frontend related computation happens on client side.
//  it won't refresh
//  speed
//  low cost of server (because we are not raising a new req for every reload)


// SSR
// Server Side Rendered

//  url : http://localhost:8081/todos (req)
//  Server Side Data
//  html,css,js
//  refresh