import React from 'react';
import { Text as GText } from 'native-base';

export class Text extends React.Component {
  render() {
    return <GText {...this.props} style={[this.props.style, { fontFamily: 'gibson' }]} />;
  }
}
