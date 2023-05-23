import { cmd } from '@/types/socket'
import { reactive } from 'vue'

export const socket_state = reactive({
  connected: false
})

// "undefined" means the URL will be computed from the `window.location` object
let URL = 'ws://http://vdophgzesl.us14.qoddiapp.com'

let socket: undefined | WebSocket

export function connect(user_id: string) {
  URL += user_id
  socket = new WebSocket(URL)
  socket.onopen = () => {
    sendMessage(cmd.req.connect, user_id)
  }
}

if (socket) {
  socket.onmessage = function (event) {
    console.log(event.data)
  }
}

export function sendMessage(cmd: number, data: any) {
  const send_obj = {
    cmd,
    data
  }
  if (socket) {
    socket.send(JSON.stringify(send_obj))
  }
}
