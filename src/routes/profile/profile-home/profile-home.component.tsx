import React, { FC } from 'react'
import { Tabs } from 'antd'
import { IoMdGrid } from 'react-icons/io'
import { RiFileUserLine } from 'react-icons/ri'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'

import NotImplemented from 'src/components/not-implemented/not-implemented.component'
import PostGrid from './post-grid/post-grid.component'
import ProfileSummary from './profile-summary/profile-summary.component'

const { TabPane } = Tabs
const ProfileHome: FC<{}> = () => {
  return (
    <div>
      <ProfileSummary />
      <Tabs className="justified-ant-tab">
        <TabPane tab={<IoMdGrid size={24} />} key="posts">
          <PostGrid />
        </TabPane>
        <TabPane tab={<AiOutlineFundProjectionScreen size={24} />} key="igtv">
          <NotImplemented feature="IG TV (Profile)" />
        </TabPane>
        <TabPane tab={<RiFileUserLine size={24} />} key="tagged">
          <NotImplemented feature="Tagged Post (Profile)" />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ProfileHome
