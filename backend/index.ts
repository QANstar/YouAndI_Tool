import { Server } from 'socket.io'
import tool from './src/socket/tool'
import 'dotenv/config'

const io = new Server({
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  tool(socket, io)
})
io.listen(parseInt(process.env.PORT || '1100'))
console.log('socket run on ' + process.env.PORT || '1100')
