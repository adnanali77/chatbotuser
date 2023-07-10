import { io } from "socket.io-client";
const URL = "http://ec2-13-232-237-49.ap-south-1.compute.amazonaws.com:4200/";

const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
export default socket;