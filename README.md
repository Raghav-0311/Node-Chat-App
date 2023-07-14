# **NODE CHAT APP**
In this mini project i have tried to create a Node based client-server model for a Chat Application. In this we have a server and two clients over it say **client-1** is ``Alice``, and **client-2** is ``Raghav``.
<br>
Now we will set up a server-client model where our server will listen on **``Port: 8080``** and with the help of **SOCKETS** we are going the handle two different clients at the same time.
<br>
The major concept is to broadcast messages or data to all the SOCKETS (clients) in our SocketList so that they can see the message or data came from which SOCKET (client) and make a reply.
<br>
Our server will going to first connect with these two SOCKETS and will be able to read data from them and broadcast it. Our clients will going to provide data to our server so that it can process and broadcast it.

---

## **CODE**

In order to achieve this type of functionality we only need two seperate JavaScript Module files one for **Server** (say - ``Server.mjs``) and other for **Clients** (say - ``Client.mjs``)

---

### **Server.mjs**
```js
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
```
<br>

---

<br>

### **Client.mjs**

```js
// import the net module
import net from "net";
import { resolve } from "path";

// to get the inputs we need the readline module
import readline from "readline";

// set up the readline module
//create an interface
const readLine = readline.createInterface({
  // that interface is going to take input as process.stdin
  input: process.stdin,
  //that interface is going to send output as process.stdout
  output: process.stdout,
});

// set an input for the username
const usernameIn = new Promise((resolve) => {
  //it will read in the answer of a question "enter a username"
  readLine.question("Enter a username", (answer) => {
    //when it receive an answer it will also resolve the answer
    resolve(answer);
  });
});

// handle the promise
usernameIn.then((username) => {
  //create a client and connect it
  const client = net.connect({ port: 8080 }, function () {
    console.log("Connected to Server");
  });

  // now with the readline event if we recieve a new line then we are going to take that data and go ahed and write it
  readLine.on("line", (data) => {
    client.write(username + ":" + data);
  });

  // now if we recieve data then we would display it as well
  client.on("data", function (data) {
    console.log(data.toString());
  });
});
```

---

> All the explaition is provided as JavaScript Comments in the code files.

---

## **How to Run / Test**
- To test our app we need 3 terminals - one for server (say - ``ServerTerminal``), one for client-1 (**Alice**) (say - ``AliceTerminal``), and last is for client-2 (**Raghav**) (say - ``RaghavTerminal``).
- Open the ``ServerTerminal`` and execute the following command:
  ```sh 
  node .\Server.mjs 
  ```
  ![ServerRunning](Output%20Snippits/server.jpg)
- Now open ``AliceTerminal`` and execute the following command:
  ```sh
  node .\Client.mjs
  ```
- It will ask for ``"Enter a username"`` Type **Alice** and Alice will be connected to Server.
  ```
  Enter a usernameAlice
  Connected to Server
  ```
- Now lets open our second terminal that is ``RaghavTerminal`` and execute the following command:
  ```sh
  node .\Client.mjs
  ```
- It will ask for ``"Enter a username"`` Type **Raghav** and Raghav will be connected to Server.
  ```
  Enter a usernameRaghav
  Connected to Server
  ```
- Now as our both clients are connected to our server, It's time for some ChitChat !!!

> Alice will send data / message from AliceTerminal. <br>
> Raghav will send data / message from RaghavTerminal.
<br>
> You can choose client names as per your prefered names. <br>
> Server is responsible for brodcasting these messages. <br>
> Example chat is given bellow - check out how it looks

- ## **Alice Terminal**
  ![AliceTerminal](Output%20Snippits/client-1%20(Alice).jpg) <br>
- ## **Raghav Terminal**
  ![RaghavTerminal](Output%20Snippits/client-2%20(Raghav).jpg) <br>

---

# **``THANK-YOU !!!``**
  