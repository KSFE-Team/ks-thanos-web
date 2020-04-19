import React, { Component } from 'react';
import { Layout, Breadcrumb, Menu, Icon } from 'antd';
import routerList from 'Src/router';
import menuList, { MenuConfig } from 'Src/menu';
import { matchRouter } from 'Src/utils';
import './index.scss';
import { goto } from 'Src/utils/commonFunc';
const { Sider, Content, Header } = Layout;
const { SubMenu, Item: MenuItem } = Menu;
const BreadcrumbItem = Breadcrumb.Item;

interface BasicLayoutProps {
    children: React.ReactNode | React.ReactNode[],
    match?: {
        path: string;
        params: any;
        url: string
    }
}

export default class BasicLayout extends Component<BasicLayoutProps> {

    /**
     * 获取面包屑
     */
    getBreadcrumb = () => {
        const { match: { path = '' } = {} } = this.props;
        const currentItem = matchRouter(path, routerList);
        return <BreadcrumbItem>
            {currentItem.title || ''}
        </BreadcrumbItem>;
    }

    /**
     * 菜单title展示
     */
    getMenuName = (name: string, icon: string | undefined) => {
        return <span>
            {icon && <Icon type={icon} />}
            {name}
        </span>;
    }

    /**
     * 菜单展示
     */
    getMenu = (childrenMenu?: MenuConfig[]) => {
        return (childrenMenu || menuList).map((menu: MenuConfig) => {
            const { name, path, children, icon } = menu;
            if (children && children.length) {
                return <SubMenu
                    key={path}
                    title={this.getMenuName(name, icon)}
                >
                    {this.getMenu(children)}
                </SubMenu>;
            } else {
                return <MenuItem
                    key={path}
                    onClick={() => {
                        this.handleGoto(path);
                    }}
                >
                    {this.getMenuName(name, icon)}
                </MenuItem>;
            }
        });
    }

    /**
     * 路由跳转方法
     */
    handleGoto = (path: string) => {
        const { match: { path: currentPath = '' } = {} } = this.props;
        if (currentPath !== path) {
            goto(path);
        }
    }

    render() {
        const { match: { path = '/' } = {} } = this.props;
        return (
            <Layout className='thanos-layout'>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[path]}
                        style={{ height: '100%' }}
                    >
                        <div className='thanos-logo'>
                            <img
                                className='thanos-logo-img'
                                src={'http://kms.kaishustory.com/logo.png'}
                            />
                            灭霸
                        </div>
                        {this.getMenu()}
                    </Menu>
                </Sider>
                <Content>
                    <Header className='thanos-title'></Header>
                    <Breadcrumb className='thanos-breadcrumb'>
                        {this.getBreadcrumb()}
                    </Breadcrumb>
                    <Content className='thanos-content'>
                        {this.props.children}
                    </Content>
                </Content>
            </Layout>
        );
    }
}
