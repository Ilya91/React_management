import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../AC'

class Signout extends Component {
  componentWillMount() {
    const { signoutUser } = this.props
      signoutUser()
  }

  render() {
    return null
  }
}

export default connect(null, {signoutUser})(Signout);
