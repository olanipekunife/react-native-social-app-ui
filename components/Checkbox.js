
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'underscore';

let BACKGROUND_COLOR, 
BORDER_RADIUS, 
BORDER_WIDTH, 
COLOR, 
MARGIN, 
SIZE, 
BORDER_COLOR;

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#FFF',
      borderRadius: 0,
      borderWidth: 2,
      checked: false,
      color: '#000',
      margin: 2,
      name: '',
      onChange: null,
      size: 20,
      borderColor: '#000',
      marginRight: 0
    };
  }

  componentDidMount() {
    this.setState(_.extend({}, this.props.style, _.omit(this.props, 'style')));
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({ checked: nextProps.checked });
  }

  render() {
    BACKGROUND_COLOR = this.state.backgroundColor;
    BORDER_RADIUS = this.state.borderRadius;
    BORDER_WIDTH = this.state.borderWidth;
    MARGIN_RIGHT = this.state.marginRight;
    COLOR = this.state.color;
    MARGIN = this.state.margin;
    SIZE = this.state.size;
    BORDER_COLOR = this.state.borderColor;
    return (
      <TouchableHighlight
underlayColor='transparent'
        onPress={() => { this._toggleCheck(); }}
      >
        <View style={{ flexDirection: 'row', marginRight: 25 }}>
          <View
style={{
            backgroundColor: (this.state.checked) ? BACKGROUND_COLOR : '#b6bfc4',
borderColor: BORDER_COLOR,
            borderRadius: BORDER_RADIUS,
borderWidth: BORDER_WIDTH, 
            height: SIZE,
margin: MARGIN,
width: SIZE,
paddingTop: 2
          }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              {this.state.checked &&
                <Icon name='check' size={SIZE - 5} color={COLOR} />}
            </View>
          </View>
          <Text style={{ paddingTop: 3, marginLeft: 6, color: '#fff' }}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _toggleCheck() {
    let checked = !this.state.checked;
    let yn = '';
    checked ? yn = 'yes' : yn = 'no';
    this.setState({ checked });
    this.props.onChange && this.props.onChange(this.props.name, checked, yn);
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
};

module.exports = Checkbox;
