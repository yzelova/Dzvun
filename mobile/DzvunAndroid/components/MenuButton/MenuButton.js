import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import styles from './styles';

export default class MenuButton extends React.Component{
    render(){
        return (
            <Icon name="navicon" size={30} style={styles.menuIcon} 
                onPress={()=>this.props.navigation.toggleDrawer()}
            />
        )
    }
}
