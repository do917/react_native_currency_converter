import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74'

export default class Home extends Component {
  handlePressBaseCurrency = () => {
    
  }
  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle={'light-content'}/>
        <Logo />
        <InputWithButton
          buttonText={}
          onPress={}
        />
        <InputWithButton
          buttonText={}
          onPress={}
          editable={ false }
        />
      </Container>
    )
  }
}