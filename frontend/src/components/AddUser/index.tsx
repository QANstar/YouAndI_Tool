import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import store from '../../store'
import Card from '../Card'
import style from './style.module.scss'

const AddUser = () => {
  const [userNum, setUserNum] = useState(0)

  const onFinish = (values: { num: number }) => {
    store.socketStore.socket.emit('addUsers', values.num)
  }

  const removeSocketEvent = () => {
    store.socketStore.socket.removeAllListeners('getUserNum')
  }

  useEffect(() => {
    store.socketStore.socket.on('getUserNum', (num: number) => {
      setUserNum(num)
    })
    return () => {
      removeSocketEvent()
    }
  }, [store.socketStore.socket])

  return (
    <div className={style.main}>
      <div className={style.title}>添加虚拟用户</div>
      <div className={style.content}>
        <Card width="150px" height="150px">
          <div className={style.cardContent}>
            <div className={style.cardTitle}>虚拟用户数量</div>
            <div className={style.userNum}>{userNum}</div>
          </div>
        </Card>
        <Card height="150px" width="500px">
          <div className={style.cardContent}>
            <div className={style.cardTitle}>添加虚拟用户</div>
            <Form className={style.form} onFinish={onFinish} autoComplete="off">
              <Form.Item
                name="num"
                rules={[
                  {
                    required: true,
                    message: '请输入需要添加的虚拟用户的数量!'
                  }
                ]}
              >
                <Input placeholder="请输入虚拟用户数量" bordered={false} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit">
                  确认
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddUser
