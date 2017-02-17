/**
 * Created by chenchunyong on 12/2/15.
 */

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  InteractionManager,
  Text,
} from 'react-native';

export default class Password extends Component {
  static propTypes = {
    style: View.propTypes.style,
    inputItemStyle: View.propTypes.style,
    iconStyle: View.propTypes.style,
    maxLength: TextInput.propTypes.maxLength.isRequired,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    autoFocus: PropTypes.bool,
    isSecureText: PropTypes.bool,
  };

  static defaultProps = {
    autoFocus: true,
    onChange: () => {},
    onEnd: () => {},
  };

  state = {
    text: ''
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      InteractionManager.runAfterInteractions(() => {
        this._onPress();
      });
    }
  }

  render(){
    return(
      <TouchableHighlight
        onPress={this._onPress.bind(this)}
        activeOpacity={1}
        underlayColor='transparent'>
        <View style={[styles.container,this.props.style]}>
          <View style={{opacity: 0, width: 0, height: 0}}>
            <TextInput
              ref='textInput'
              maxLength={this.props.maxLength}
              autoFocus={false}
              keyboardType="numeric"
              isSecureText={this.props.isSecureText}
              onChangeText={
                (text) => {
                  this.setState({text});
                  this.props.onChange(text);
                  if (text.length === this.props.maxLength) {
                    this.props.onEnd(text);
                  }
                }
              }
            />
          </View>
          {
            this._getInputItem()
          }
        </View>
      </TouchableHighlight>
    )

  }
  _getInputItem(){
    let inputItem = [];
    let {text}=this.state;
    for (let i = 0; i < parseInt(this.props.maxLength); i++) {
      if (i == 0) {
        inputItem.push(
          <View key={i} style={[styles.inputItem,this.props.inputItemStyle]}>
            {this.setupInputText(text, i)}
          </View>)
      }
      else {
        inputItem.push(
          <View key={i} style={[styles.inputItem,styles.inputItemBorderLeftWidth,this.props.inputItemStyle]}>
            {this.setupInputText(text, i)}
          </View>)
      }
    }
    return inputItem;
  }

  setupInputText(text, i) {
      if (this.props.isSecureText) {
        return (
            i < text.length ? <View style={[styles.iconStyle,this.props.iconStyle]} /> : null
        );
      } else {
        return (
            i < text.length ? <Text style={styles.textStyle}>{text[i]}</Text> : null
        );
      }
  }

  _onPress(){
    this.refs.textInput.focus();
  }

  clear(){
    this.refs.textInput.clear();
    this.setState({text: ''});
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  inputItem: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputItemBorderLeftWidth: {
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
  iconStyle: {
    width: 16,
    height: 16,
    backgroundColor: '#222',
    borderRadius: 8,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});