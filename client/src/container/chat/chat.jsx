import React, { Component } from 'react';
import {connect} from 'react-redux'
import { NavBar, List, WingBlank, WhiteSpace, Card, InputItem, Grid, Icon } from 'antd-mobile';
import { sendMsg } from '../../redux/actions'

const Header = Card.Header

class Chat extends Component {
  state = {
    content: '',
    isShow: false // emoji input default is hidden
  }

  componentWillMount () {
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
      this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  componentDidMount() {
    // init msg list
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate() {
    // after send msg
    window.scrollTo(0, document.body.scrollHeight)
  }
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState ({isShow})
    if(isShow) {
      // asyn manuell dispatch a resize event, fix emoji shown bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0);
    }
  }

  handleSend = () => {
    // collect data
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // send msg request
    if (content) {
      this.props.sendMsg({from, to, content})
    }
    // clear the text field
    this.setState({
      content: '',
      isShow: false
  })

  }
  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    // check chatid from current chat
    const meId = user._id
    if(!users[meId]) { // if not get any data, no move
      return null
    }
    const targetId = this.props.match.params.userid
    const chatid = [ meId, targetId ].sort().join('_')

    // filter chatMsgs
    const shownMsgs = chatMsgs.filter(msg => msg.chat_id === chatid)

    // get header
    const meHeader = users[meId].header.toLowerCase()
    const meIcon = meHeader ? require(`../../assets/images/${meHeader}.png`) : null
    const targetHeader = users[targetId].header.toLowerCase()
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          className="sticky-header"
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[meId].username}
        </NavBar>
        <List style={{marginTop: 50, marginBottom: 50}}>
          {
            shownMsgs.map(msg => {
              if (meId === msg.to) { // target send me
                return (
                  <WingBlank size="lg" key={msg._id}>
                    <Card>
                      <Header
                        title={<span style={{margin: 14}}>{msg.content}</span>}
                        thumb={targetIcon}
                      />
                    </Card>
                  </WingBlank>
                )
              } else { // I send target
                return (
                  <WingBlank size="lg" className="flipx" key={msg._id}>
                    <Card>
                      <Header
                        title={<span className="flipxx" style={{margin: 14}}>{msg.content}</span>}
                        thumb={meIcon}
                      />
                    </Card>
                  </WingBlank>
                )
              }
            })
          }
        </List>
        <div className="am-tab-bar">
          <InputItem 
            placeholder="Please input..."
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span style={{marginRight:10}} onClick={this.toggleShow}>😊</span>
                <span onClick={this.handleSend}>send</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item.text})
              }}
            /> 
          ) : null}
        
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { sendMsg }
)(Chat)