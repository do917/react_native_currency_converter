import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { connectAlert } from '../components/Alert'
import { ListItem, Separator } from '../components/List';


const ICON_COLOR = '#868686';
const ICON_SIZE = 23;
const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md'

class Options extends Component {
  handleThemesPress = () => {
    this.props.navigation.navigate('Themes')
  }
  handleSitePress = () => {
    Linking.openURL('http://fixer.io').catch(() => this.props.alertWithType('error', 'Sorry!', "Fixer.io can't be opened right now"))
  }
  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem 
          text="Themes" 
          onPress={this.handleThemesPress} 
          customIcon={
            <Icon name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />
          }
        />
        <Separator />
        <ListItem 
          text="Fixir.io" 
          onPress={this.handleSitePress}
          customIcon={
            <Icon name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />
          }
        />
      </ScrollView>
    ) 
  }
}

Options.propTypes = {
  navigation: PropTypes.object,
  alertWithType: PropTypes.func
}

export default connectAlert(Options);