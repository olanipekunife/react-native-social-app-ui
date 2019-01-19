import React from 'react';
import { Icon } from 'expo';


export default class Micon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={this.props.size ? this.props.size : 26}
        style={this.props.style}
        color={this.props.color}
      />
    );
  }
}
