const net = require("net");
const fs = require('fs');

const port = 8083;

const server = net.createServer();

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

server.on("connection", (connectecClient) => {
  connectecClient.setEncoding('utf8');

  console.log("A client connected!");
  connectecClient.write("Welcome. Please enter a file name");
  
  connectecClient.on("data", (path) => {
    let relativePath = path.substring(0, path.length - 1);

    fs.readFile(relativePath, 'utf8', (error, data) => {
      if (error) {
        console.log(`File ${relativePath} not found`);
        throw error;
      }
      connectecClient.write(`\n${relativePath}\n${data}`);
    });
  });
});

//MYCODE
