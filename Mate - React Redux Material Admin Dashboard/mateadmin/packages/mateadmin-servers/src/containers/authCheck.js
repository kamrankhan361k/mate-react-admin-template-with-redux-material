import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from '../components/utility/layoutWrapper';
import Papersheet from '../components/utility/papersheet';
import { FullColumn } from '../components/utility/rowColumn';
import IntlMessages from '../components/utility/intlMessages';
import Button from '../components/uielements/button';
import notification from '../components/notification';
import AuthHelper from '../helpers/authHelper';

class AuthCheck extends Component {
  state = { loading: false };
  checkDemo = () => {
    this.setState({ loading: true });
    AuthHelper.checkDemoPage(this.props.idToken).then(result => {
      if (result.error) {
        notification('error', result.error);
      } else {
        notification('success', `status: ${result.status}`, result.message);
      }
      this.setState({ loading: false });
    });
  };
  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title={<IntlMessages id="sidebar.authCheck" />}>
            <Button onClick={this.checkDemo}>Check Auth Status</Button>
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}
export default connect(
  state => ({
    idToken: state.Auth.idToken,
  }),
  {}
)(AuthCheck);
