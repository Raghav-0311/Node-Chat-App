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
