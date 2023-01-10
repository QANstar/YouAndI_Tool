// 注册
export interface IUserSignUp {
  username: string
  password: string
  email: string
}

// 登录
export interface ILogin {
  password: string
  email: string
}

// 创建活动
export interface IAddActivity {
  title: string
  x: number
  y: number
  type: number
  location: string
  introduction: string
  maxnumber: number
  starttime: string
  endtime: string
}
