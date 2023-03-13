import * as crypto from 'crypto'
import randomActivity from '../data/activity'
import randomLocation from '../data/location'
import randomUserName from '../data/userName'
import {
  addActivity,
  coverUserTag,
  getActivityType,
  getAllTag,
  login,
  userSignUp
} from '../request/request'
import { IAddActivity, ILogin, ITag } from '../types/toolTypes'
import { userFilePath } from '../utils/config'
import { readFile, writeFile } from '../utils/file'
import { randomNum } from '../utils/random'

// 添加用户
export const addUsers = async (
  num: number,
  onEachAdded?: (progress: string) => void
) => {
  for (let i = 0; i < num; i++) {
    const name =
      Math.random() > 0.8
        ? crypto.randomBytes(4).toString('hex')
        : randomUserName[Math.floor(Math.random() * randomUserName.length)]
    let tags: ITag[] = []
    const username = name
    const password = crypto.randomBytes(12).toString('hex')
    const email = crypto.randomBytes(12).toString('hex') + '@qan.com'
    try {
      const data = await getAllTag()
      if (data.status === 200) {
        tags = data.data
      }
    } catch (error) {
      console.log(error)
    }
    try {
      const data = await userSignUp({ username, password, email })
      if (data.status === 200) {
        const users: ILogin[] = JSON.parse(await readFile(userFilePath, '[]'))
        users.push({
          password,
          email
        })
        await writeFile(userFilePath, JSON.stringify(users))
        try {
          const data = await login({
            password,
            email
          })
          if (data.status === 200) {
            const token = data.data
            const tagNum = Math.floor(Math.random() * 3)
            const tagsReq: number[] = []
            for (let i = 0; i < tagNum; i++) {
              const randomRootTag =
                tags[Math.floor(Math.random() * tags.length)]
              const randomTag =
                randomRootTag.Tag[
                  Math.floor(Math.random() * randomRootTag.Tag.length)
                ]
              if (!tagsReq.find((x) => x === randomTag.id)) {
                tagsReq.push(randomTag.id)
              }
            }
            try {
              await coverUserTag(tagsReq, token)
            } catch (error) {}
          }
        } catch (error) {
          console.log(error)
        }
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
  let tags: ITag[] = []
  let x1 = 0
  let x2 = 0
  let y1 = 0
  let y2 = 0
  let token = ''
  const location =
    randomLocation[Math.floor(Math.random() * (randomLocation.length - 1))]
  if (type === 1) {
    x1 = location.x - 0.002
    x2 = location.x + 0.002
    y1 = location.y - 0.002
    y2 = location.y + 0.002
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
  try {
    const data = await getAllTag()
    if (data.status === 200) {
      tags = data.data
    }
  } catch (error) {
    console.log(error)
  }
  const isPayment = Math.random() > 0.8
  const typeReq = types[Math.floor(Math.random() * types.length)].id
  const titleList = randomActivity.find((x) => x.type === typeReq)?.name || []
  const titleRea =
    titleList[Math.floor(Math.random() * titleList.length)] || '标题'
  const tagNum = Math.floor(Math.random() * 3)
  const tagsReq: { tagId: number }[] = []
  for (let i = 0; i < tagNum; i++) {
    const randomRootTag = tags[Math.floor(Math.random() * tags.length)]
    const randomTag =
      randomRootTag.Tag[Math.floor(Math.random() * randomRootTag.Tag.length)]
    if (!tagsReq.find((x) => x.tagId === randomTag.id)) {
      tagsReq.push({ tagId: randomTag.id })
    }
  }

  const requestData: IAddActivity = {
    title: titleRea,
    x: randomNum(x1, x2),
    y: randomNum(y1, y2),
    type: typeReq,
    location: location.location,
    introduction: '这个人很懒，什么都没写。',
    maxnumber: Math.floor(Math.random() * 30) + 1,
    starttime: new Date().toISOString(),
    endtime: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 30)
    ).toISOString(),
    tags: tagsReq,
    payment: isPayment
      ? {
          payment1: Math.round(Math.random() * 500),
          type: Math.random() > 0.5 ? 1 : 0
        }
      : undefined
  }
  try {
    await addActivity(requestData, token)
  } catch (error) {}
}
