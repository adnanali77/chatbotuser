import { io } from "socket.io-client";
const URL = "http://ec2-43-205-237-35.ap-south-1.compute.amazonaws.com:4200/";

const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
export default socket;