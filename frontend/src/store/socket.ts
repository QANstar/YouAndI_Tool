import { action, makeAutoObservable } from 'mobx'
import io from 'socket.io-client'

const SOCKET_URL = 'http://121.4.109.235:1100'

// socket.on('connect', async () => {
//   console.log('socket已连接')
//   socketState = true
// })

// socket.on('disconnect', async () => {
//   console.log('socket连接已断开')
//   socketState = false
// })

export default class SocketStore {
  socket = io(SOCKET_URL, {
    transports: ['websocket']
  })

  socketState = false
  constructor () {
    makeAutoObservable(this)
  }

  @action setState (state: boolean) {
    this.socketState = state
  }
}
