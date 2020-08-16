import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie' // to manage frontent cookie => get()/set()/remove()
import { Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile';

import Bewerber from '../bewerber/bewerber'
import Geber from '../geber/geber'
import BewerberInfo from '../bewerber-info/bewerber-info'
import GeberInfo from '../geber-info/geber-info'
import Message from '../message/message'
import Person from '../person/person'
import NotFound from '../../components/not-found/not-found';
import BottomNav from '../../components/bottom-nav/bottom-nav'
import Chat from '../chat/chat'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

class Main extends Component {
  
  // bottom navgation bar info
  navList = [
    {
      path: '/bewerber',
      component: Geber,
      title: 'Bewerber List',
      icon: 'bewerber',
      text: "Bewerber",
    },
    {
      path: '/geber',
      component: Bewerber,
      title: 'Geber List',
      icon: 'geber',
      text: "Geber",
    },
    {
      path: '/message',
      component: Message,
      title: 'Message List',
      icon: 'message',
      text: "Message",
    },
    {
      path: '/person',
      component: Person,
      title: 'Person List',
      icon: 'person',
      text: "Person",
    },
    
  ]

  componentDidMount () {
    // logged in before, but this time no log in, (redux=>user hasnt id), should send request obtain user
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      // send asyc, obtain user
      // console.log('send ajax, obtain user')
      this.props.getUser()
    }
  }
  render(){
    // check userid from cookie
    const userid = Cookies.get('userid')
    if(!userid) {
      return <Redirect to="/login" />
    }
    // check whether user login (has cookie), if not then redirect to login page
    const {user} = this.props
    if(!user._id) {
      return null
    } else {
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(user.type, user.header)
        return <Redirect to={path} />
      }
    }
    
    const { navList } = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav => nav.path === path)

    if(currentNav) {
      if (user.type === 'geber') {
        // hide the second bottom_nav_bar_item
        navList[1].hide = true
      } else {
        // hide the first bottom_nav_bar_item
        navList[0].hide = true
      }
    }
    return(
      <div>
        { currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
          }
          <Route path="/bewerberinfo" component={BewerberInfo} />
          <Route path="/geberinfo" component={GeberInfo} />
          <Route path="/chat/:userid" component={Chat} />

          <Route component={NotFound} />
        </Switch>
        { currentNav ? <BottomNav navList={navList} /> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)