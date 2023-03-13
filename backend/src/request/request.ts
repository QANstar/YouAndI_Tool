import axios from 'axios'
import { IAddActivity, ILogin, ITag, IUserSignUp } from '../types/toolTypes'
import 'dotenv/config'

const url = process.env.SERVER_URL

const request = axios.create({
  validateStatus: (status) => status < 500
})

// 注册
export const userSignUp = async (params: IUserSignUp) => {
  const data = await request.post<string>(`${url}/api/User/userSignUp`, params)
  return data
}

// 登录
export const login = async (params: ILogin) => {
  const data = await request.post<string>(`${url}/api/User/login`, params)
  return data
}

// 获取活动类型
export const getActivityType = async () => {
  const data = await request.get<{ id: number; type1: string }[]>(
    `${url}/api/Activity/getActivityType`
  )
  return data
}

// 创建活动
export const addActivity = async (params: IAddActivity, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const data = await request.post<string>(
    `${url}/api/Activity/addActivity`,
    params,
    { headers }
  )
  return data
}

// 获取标签
export const getAllTag = async () => {
  const data = await request.get<ITag[]>(`${url}/api/User/GetAllTag`)
  return data
}

// 覆盖标签
export const coverUserTag = async (params: number[], token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const data = await request.post<boolean>(
    `${url}/api/User/CoverUserTag`,
    params,
    { headers }
  )
  return data
}
