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
  payment?: {
    payment1: number
    type: number
  }
  tags: {
    tagId: number
  }[]
}

// 随机活动数据
export interface IRandomActivityData {
  type: number
  name: string[]
}

// 地点
export interface IRandomloaction {
  location: string
  x: number
  y: number
}

// 标签
export interface ITag {
  id: number
  name: string
  Tag: {
    id: number
    name: string
  }[]
}
