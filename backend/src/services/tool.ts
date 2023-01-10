import * as crypto from 'crypto'
import {
  addActivity,
  getActivityType,
  login,
  userSignUp
} from '../request/request'
import { IAddActivity, ILogin } from '../types/toolTypes'
import { userFilePath } from '../utils/config'
import { readFile, writeFile } from '../utils/file'
import { randomNum } from '../utils/random'

// 添加用户
export const addUsers = async (
  num: number,
  onEachAdded?: (progress: string) => void
) => {
  for (let i = 0; i < num; i++) {
    const username = Date.now() + crypto.randomBytes(2).toString('hex')
    const password = crypto.randomBytes(12).toString('hex')
    const email = crypto.randomBytes(12).toString('hex') + '@qan.com'
    try {
      const data = await userSignUp({ username, password, email })
      if (data.status === 200) {
        const users: ILogin[] = JSON.parse(await readFile(userFilePath, '[]'))
        users.push({
          password,
          email
        })
        await writeFile(userFilePath, JSON.stringify(users))
      }
    } catch (error) {}
    if (onEachAdded) onEachAdded((i + 1 / num).toFixed(1))
  }
}

// 获取当前记录用户数量
export const getUserNum = async () => {
  const users: ILogin[] = JSON.parse(await readFile(userFilePath, '[]'))
  return users.length
}

// 随机创建活动
export const createActivity = async (type: number) => {
  const users: ILogin[] = JSON.parse(await readFile(userFilePath, '[]'))
  let types: {
    id: number
    type1: string
  }[] = []
  let x1 = 0
  let x2 = 0
  let y1 = 0
  let y2 = 0
  let token = ''
  if (type === 1) {
    x1 = 113.4100001
    x2 = 115.0500001
    y1 = 29.5800001
    y2 = 31.2200001
  } else if (type === 2) {
    x1 = 73.3300001
    x2 = 135.0500001
    y1 = 3.5100001
    y2 = 53.3300001
  } else {
    x1 = 0.0000001
    x2 = 180.0000001
    y1 = 0.0000001
    y2 = 90.0000001
  }
  const user: ILogin = users[Math.floor(Math.random() * users.length)]
  try {
    const data = await login(user)
    if (data.status === 200) {
      token = data.data
    }
  } catch (error) {
    console.log(error)
  }
  try {
    const data = await getActivityType()
    if (data.status === 200) {
      types = data.data
    }
  } catch (error) {
    console.log(error)
  }

  const requestData: IAddActivity = {
    title: crypto.randomBytes(8).toString('hex'),
    x: randomNum(x1, x2),
    y: randomNum(y1, y2),
    type: types[Math.floor(Math.random() * types.length)].id,
    location: crypto.randomBytes(8).toString('hex'),
    introduction: crypto.randomBytes(30).toString('hex'),
    maxnumber: Math.floor(Math.random() * 30) + 1,
    starttime: new Date().toISOString(),
    endtime: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 30)
    ).toISOString()
  }
  try {
    await addActivity(requestData, token)
  } catch (error) {}
}
