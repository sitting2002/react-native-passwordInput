/**
 * Created by chenchunyong on 12/2/15.
 */

import React,{StyleSheet,View,TextInput,Text } from 'react-native';
var styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    inputItem: {
        borderWidth: 1,
        height: 45,
        width: 45,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: 0
    },
    iconStyle: {
        width: 16,
        height: 16,
        backgroundColor: '#222',
        borderRadius: 8,
    },
});

export default React.createClass({
    getInitialState(){
        return {
            text: ''
        };
    },
    render(){
        return <View style={styles.container}>
            <TextInput
                maxLength={this.props.maxLength}
                autoFocus={true}
                keyboardType="numeric"
                onChangeText={(text)=>this.setState({text})}
            />
            <View style={{flexDirection:'row'}}>
                {
                    this._getInputItem()
                }
            </View>
        </View>
    },
    _getInputItem(){
        let inputItem = [];
        let {text}=this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem,this.props.inputItem]}>
                        {i < text.length ? <View style={styles.iconStyle}></View> : null}
                    </View>)
            }
            else {
                inputItem.push(
                    <View key={i} style={[styles.inputItem,styles.inputItemBorderLeftWidth,this.props.inputItem]}>
                        {i < text.length ?
                            <View style={[styles.iconStyle]}>
                            </View> : null}
                    </View>)
            }
            ;
        }
        return inputItem;
    },
});