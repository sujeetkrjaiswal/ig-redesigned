import React, { FC } from 'react'
import { Tabs } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineUser,
} from 'react-icons/ai'
import { GoDiffAdded } from 'react-icons/go'
import { FaSearch, FaUserAlt } from 'react-icons/fa'
import { MdAddBox } from 'react-icons/md'

import styles from './bottom-nav.module.scss'

const IconSize = 34
const { TabPane } = Tabs
const BottomNav: FC<{}> = () => {
  const { pathname } = useLocation()
  const currentKey = ['profile', 'home', 'search', 'add', 'activity'].find((key) =>
    pathname.startsWith(`/${key}`)
  )
  const iconProps = {
    size: IconSize,
    color: '#231f20',
  }
  return (
    <Tabs
      defaultActiveKey="profile"
      activeKey={currentKey}
      tabPosition="bottom"
      className={`justified-ant-tab ${styles.bottomNav}`}
      tabBarGutter={0}
    >
      <TabPane
        key="home"
        tab={
          <Link to="/home">
            {currentKey === 'home' ? (
              <AiFillHome {...iconProps} />
            ) : (
              <AiOutlineHome {...iconProps} />
            )}
          </Link>
        }
      />
      <TabPane
        key="search"
        tab={
          <Link to="/search">
            {currentKey === 'search' ? (
              <FaSearch {...iconProps} />
            ) : (
              <AiOutlineSearch {...iconProps} />
            )}
          </Link>
        }
      />
      <TabPane
        key="add"
        tab={
          <Link to="/add">
            {currentKey === 'add' ? <MdAddBox {...iconProps} /> : <GoDiffAdded {...iconProps} />}
          </Link>
        }
      />
      <TabPane
        key="activity"
        tab={
          <Link to="/activity">
            {currentKey === 'activity' ? (
              <AiFillHeart {...iconProps} />
            ) : (
              <AiOutlineHeart {...iconProps} />
            )}
          </Link>
        }
      />
      <TabPane
        key="profile"
        tab={
          <Link to="/profile">
            {currentKey === 'profile' ? (
              <FaUserAlt {...iconProps} />
            ) : (
              <AiOutlineUser {...iconProps} />
            )}
          </Link>
        }
      />
    </Tabs>
  )
}

export default BottomNav
