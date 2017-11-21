import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { connectAlert } from '../components/Alert'

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies'

import { Container } from '../components/Container'
import { Logo } from '../components/Logo'
import { InputWithButton } from '../components/TextInput'
import { ClearButton } from '../components/Button'
import { LastConverted } from '../components/Text'
import { Header } from '../components/Header'

const TEMP_CONVERSION_DATE = new Date();

class Home extends Component {

  
  componentDidMount() {
    this.props.dispatch(getInitialConversion())
  }  
  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError) {
      this.props.alertWithType('error', 'Error', nextProps.currencyError)
    }
  }
  
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
  }
  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
  }
  handleTextChange = (text) => {
    this.props.dispatch(changeCurrencyAmount(text));
  }
  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  }
  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  }

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = '...'
    }

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle={'light-content'}/>
        <Header onPress={this.handleOptionsPress}/>
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor = {this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={ false }
            value={quotePrice}
            textColor = {this.props.primaryColor}
          />
          <LastConverted 
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.lastConvertedDate}
            conversionRate={this.props.conversionRate}
          />
          <ClearButton 
            text="Reverse Currencies"
            onPress={this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  baseCurrency: PropTypes.string,
  quoteCurrency: PropTypes.string,
  amount: PropTypes.number,
  conversionRate: PropTypes.number,
  lastConvertedDate: PropTypes.object,
  isFetching: PropTypes.bool,
  primaryColor: PropTypes.string,
  alertWithType: PropTypes.func,
  currencyError: PropTypes.string
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates  || {};

  return {
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.themes.primaryColor,
    currencyError: state.currencies.error 
  }
}

export default connect(mapStateToProps)(connectAlert(Home))