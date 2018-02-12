import React from 'react'
import { Tabs } from 'antd'
import MobileHeader from './components/mobile_header'
import MobileFooter from './components/mobile_footer'
import style from './static/css/mobile.css'
const TabPane = Tabs.TabPane

export default class MobileIndex extends React.Component{
    render(){
        return (
            <div>
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane tab='头条' key='top'></TabPane>
                    <TabPane tab='社会' key='shehui'></TabPane>
                    <TabPane tab='国内' key='guonei'></TabPane>
                    <TabPane tab='国际' key='guoji'></TabPane>
                    <TabPane tab='娱乐' key='yule'></TabPane>
                    <TabPane tab='体育' key='tiyu'></TabPane>
                    <TabPane tab='科技' key='keji'></TabPane>
                    <TabPane tab='时尚' key='shishang'></TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        )
    }
}