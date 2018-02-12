import React from "react";
import { Row, Col } from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router-dom'
import MenuItem from "antd/lib/menu/MenuItem";
const FormItem = Form.Item;
const TabsPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class MobileHeader extends React.Component{
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
        }
    };

    componentWillMount(){
        if(localStorage.userid != ""){
            this.setState({hasLogined: true});
            this.setState({userid: localStorage.userid,userNickName: localStorage.userNickName});
        }
    }

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        })
    };

    handleClick(e) {
        if (e.key === "register") {
            this.setState({ current: 'register' });
            this.setModalVisible(true);
        } else {
            this.setState({ current: e.key });
        }
    };

    handleSubmit(e) {
        // 页面开始向api提交数据
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        }
        var formData = this.props.form.getFieldsValue();
        console.log(formData);
        // 用fetch来观念里api发送请求
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).
            then(response => response.json()).then(json => {
                this.setState({
                    userNickName: json.NickUserName,
                    userid: json.UserId
                });
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            });
        if(this.state.action == "login"){
            this.setState({hasLogined: true});
        }
        message.success('请求成功!');
        this.setModalVisible(false);
    };

    login (e){
        e.preventDefault();
        this.setModalVisible(true);
    };

    callBack(key){
        if(key==1){
            this.setState({action: 'login'});
        }else if(key==2){
            this.setState({action: "register"});
        }
    }

    logout(){
        localStorage.userid = "";
        localStorage.userNickName = "";
        this.setState({hasLogined: false});
    }

    render(){
        const { getFieldProps } = this.props.form;
        const showUser = this.state.hasLogined ?
        <a target="_blank">
            <Icon type="logout" onClick={()=>this.logout()}/>
            <Icon type="inbox"/>
        </a>
        :
        <Icon type="setting" onClick={(e)=>this.login(e)}/>;
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/static/images/logo.png" alt="logo"/>
                    <span>ReactNews</span>
                    {showUser}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange={(key)=>this.callBack(key)}>
                        <TabsPane tab="登录" key="1">
                            <Form onSubmit={(e) => this.handleSubmit(e)} horizontal="true">
                                <FormItem label="账户">
                                    < Input placeholder="请输入您的账号" {...getFieldProps("userName") } />
                                </FormItem>
                                <FormItem label="密码">
                                    < Input placeholder="请输入您的密码"
                                        type="password" {...getFieldProps("password") } />
                                </FormItem>
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </Form>
                        </TabsPane>
                        <TabsPane tab="注册" key="2">
                            <Form onSubmit={(e) => this.handleSubmit(e)} horizontal="true">
                                <FormItem label="账户">
                                    < Input placeholder="请输入您的账号" {...getFieldProps("r_userName") } />
                                </FormItem>
                                <FormItem label="密码">
                                    < Input placeholder="请输入您的密码"
                                        type="password" {...getFieldProps("r_password") } />
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input placeholder="请再次输入您的密码" type="password" {...getFieldProps("r_confirmPassword") } />
                                </FormItem>
                                <Button type="primary" htmlType="submit">
                                    注册
                                </Button>
                            </Form>
                        </TabsPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}
export default MobileHeader = Form.create({})(MobileHeader);