import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import BewerberInfo from '../bewerber-info/bewerber-info'
import GeberInfo from '../geber-info/geber-info'

export default class Main extends Component {
  render(){
    return(
      <div>
        <Switch>
          <Route path="/bewerberinfo" component={BewerberInfo} />
          <Route path="/geberinfo" component={GeberInfo} />
        </Switch>
      </div>
    )
  }
}