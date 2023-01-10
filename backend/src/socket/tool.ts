import { Server, Socket } from 'socket.io'
import { addUsers, createActivity, getUserNum } from '../services/tool'

export default async function (socket: Socket, io: Server) {
  let activityTestState = false
  socket.emit('getUserNum', await getUserNum())
  socket.emit('getActivityTestState', activityTestState)
  // 连接测试
  socket.on('test', () => {
    console.log('连接')
  })

  // 批量添加用户
  socket.on('addUsers', async (num: number) => {
    console.log('添加用户')
    await addUsers(num, async (progress) => {
      socket.emit('progress', progress)
      console.log(`添加用户，进度:${progress}`)
      const userNum = await getUserNum()
      io.emit('getUserNum', userNum)
    })
  })

  // 随机添加活动
  socket.on(
    'addActivity',
    async (data: {
      intervalTime: number
      durationTime: number
      type: number
    }) => {
      activityTestState = true
      io.emit('getActivityTestState', activityTestState)
      await new Promise((resolve) => {
        let timeout: any = null
        let intertime: any = null

        timeout = setTimeout(() => {
          if (timeout) {
            clearTimeout(timeout)
          }
          if (intertime) {
            clearInterval(intertime)
          }
          resolve(true)
        }, data.durationTime * 60 * 60 * 1000)
        intertime = setInterval(async () => {
          if (!activityTestState) {
            if (timeout) {
              clearTimeout(timeout)
            }
            if (intertime) {
              clearInterval(intertime)
            }
            resolve(true)
          }
          console.log('一个活动开始添加')
          await createActivity(data.type)
          console.log('一个活动添加完成')
        }, data.intervalTime * 1000)
      })
      activityTestState = false
      io.emit('getActivityTestState', activityTestState)
      console.log('添加活动运行结束')
    }
  )

  // 关闭持续测试
  socket.on('closeTest', () => {
    activityTestState = false
    io.emit('getActivityTestState', activityTestState)
  })
}
