//importing the "net" module form the node build in packages / modules
import net from "net";

//creating a list of sockets !
let sockets = [];

// broadcast function definition
function broadcast(data) {
  // for each socket in sockets list we are going to write data to it
  sockets.forEach((socket) => {
    socket.write(data);
  });
}

//set up our server
const server = net.createServer(function (socket) {
  //putting that socket in the list of our sockets
  sockets.push(socket);

  //creating listeners for different cases we have for out sockets

  //creating an event handler for receiving data
  socket.on("data", function (data) {
    // whatever data we recieve we broadcast it
    broadcast(data);
  });

  //CASE OF ERROR - (optional, but good practice)
  socket.on("error", function (err) {
    console.error(err);
  });
});

//set our server to listen on port 8080
server.listen(8080, function () {
  console.log("Server is listening on port : 8080");
});
