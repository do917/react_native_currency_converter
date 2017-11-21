import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Keyboard, Animated, Platform, Image, StyleSheet } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;
class AnimatedImageBackground extends React.Component {
  setNativeProps(props: Object) {
    // Work-around flow
    const viewRef = this._viewRef;
    if (viewRef) {
      viewRef.setNativeProps(props);
    }
  }

  _viewRef = null;

  _captureRef = ref => {
    this._viewRef = ref;
  };

  render() {
    const {children, style, imageStyle, imageRef, ...props} = this.props;

    return (
      <Animated.View style={style} ref={this._captureRef}>
        <Animated.Image
          {...props}
          style={[
            StyleSheet.absoluteFill,
            {
              // Temporary Workaround:
              // Current (imperfect yet) implementation of <Image> overwrites width and height styles
              // (which is not quite correct), and these styles conflict with explicitly set styles
              // of <ImageBackground> and with our internal layout model here.
              // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
              // This workaround should be removed after implementing proper support of
              // intrinsic content size of the <Image>.
              width: style.width,
              height: style.height,
            },
            imageStyle,
          ]}
          ref={imageRef}
        />
        {children}
      </Animated.View>
    );
  }
}

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };
  }

  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardDidShowListener = Keyboard.addListener(
      `keyboard${name}Show`,
      this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      `keyboard${name}Hide`,
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  render() {
    const containerImageStyles = [
      styles.containerImage,
      { width: this.state.containerImageWidth, height: this.state.containerImageWidth },
    ];
    const imageStyles = [
      styles.logo,
      { width: this.state.imageWidth },
      this.props.tintColor ? { tintColor: this.props.tintColor } : null,
    ];

    return (
      <View style={styles.container}>
        <AnimatedImageBackground
          resizeMode="contain"
          style={containerImageStyles}
          source={require('./images/background.png')}
        >
          <Animated.Image
            resizeMode="contain"
            style={imageStyles}
            source={require('./images/logo.png')}
          />
        </AnimatedImageBackground>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;