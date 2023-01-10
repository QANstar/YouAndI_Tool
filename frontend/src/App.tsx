import { Observer } from 'mobx-react'
import React, { useEffect } from 'react'
import AddActivities from './components/AddActivities'
import AddUser from './components/AddUser'
import CircleSvg from './components/CircleSvg'
import store from './store'
import './styles/global.scss'

function App () {
  const removeSocketEvent = () => {
    store.socketStore.socket.removeAllListeners('connect')
    store.socketStore.socket.removeAllListeners('disconnect')
  }

  useEffect(() => {
    store.socketStore.socket.on('connect', () => {
      console.log('socket已连接')
      store.socketStore.setState(true)
    })
    store.socketStore.socket.on('disconnect', () => {
      console.log('socket连接已断开')
      store.socketStore.setState(false)
    })
    return () => {
      removeSocketEvent()
    }
  }, [store.socketStore.socket])
  return (
    <Observer>
      {() => (
        <div className="main">
          <div className="main-card">
            <div className="header">
              <div>You&I Tools</div>
              <div>
                服务器连接状态：
                <CircleSvg
                  size="12px"
                  color={store.socketStore.socketState ? '#a0d911' : '#cf1322'}
                />
              </div>
            </div>
            <div className="content">
              <AddUser />
              <AddActivities />
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}

export default App
