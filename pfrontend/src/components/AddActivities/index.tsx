import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import store from '../../store'
import Card from '../Card'
import style from './style.module.scss'
const { Option } = Select

const AddActivities = () => {
  const [state, setState] = useState(false)

  const onFinish = (values: any) => {
    store.socketStore.socket.emit('addActivity', values)
  }

  const removeSocketEvent = () => {
    store.socketStore.socket.removeAllListeners('getActivityTestState')
  }

  useEffect(() => {
    store.socketStore.socket.on('getActivityTestState', (state: boolean) => {
      setState(state)
    })
    return () => {
      removeSocketEvent()
    }
  }, [store.socketStore.socket])

  return (
    <div className={style.main}>
      <div className={style.title}>
        添加活动
        <Tooltip title="添加活动功能参数说明：从左往右，持续时间为持续运行的时间（如设置24将持续运行该功能一天不断添加活动，可手动停止），间隔时间为每次添加活动的间隔（不建议设置太小），范围为活动生成的范围">
          <QuestionCircleOutlined
            style={{ marginLeft: 10, cursor: 'pointer' }}
          />
        </Tooltip>
      </div>
      <div className={style.content}>
        <Card width="150px" height="150px">
          <div className={style.cardContent}>
            <div className={style.cardTitle}>运行状态</div>
            <div className={style.state}>
              {state
                ? (
                <div style={{ color: '#7cb305' }}>运行中</div>
                  )
                : (
                <div style={{ color: '#cf1322' }}>未运行</div>
                  )}
            </div>
          </div>
        </Card>
        <Card height="150px" width={state ? '150px' : '800px'}>
          <div className={style.cardContent}>
            <div className={style.cardTitle}>添加活动</div>
            {state
              ? (
              <div className={style.stopbtn}>
                <Button
                  onClick={() => {
                    store.socketStore.socket.emit('closeTest')
                  }}
                  type="primary"
                  danger
                  shape="round"
                  htmlType="submit"
                >
                  停止
                </Button>
              </div>
                )
              : (
              <Form
                className={style.form}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  name="durationTime"
                  rules={[
                    {
                      required: true,
                      message: '请输入持续时间!'
                    }
                  ]}
                >
                  <Input placeholder="持续时间（单位小时）" bordered={false} />
                </Form.Item>
                <Form.Item
                  name="intervalTime"
                  rules={[
                    {
                      required: true,
                      message: '请输入每次添加的间隔时间!'
                    }
                  ]}
                >
                  <Input placeholder="间隔时间（单位秒）" bordered={false} />
                </Form.Item>
                <Form.Item
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: '请选择活动生成范围!'
                    }
                  ]}
                >
                  <Select bordered={false} placeholder="活动生成范围">
                    <Option value={1}>武汉</Option>
                    <Option value={2}>全国</Option>
                    <Option value={3}>全球</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" shape="round" htmlType="submit">
                    确认
                  </Button>
                </Form.Item>
              </Form>
                )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddActivities
