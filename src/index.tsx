/* eslint-disable import/no-cycle */
import React, { PureComponent } from 'react'

import FastImage from 'react-native-fast-image'

import { baseConfig } from '../../../src/config/themes';

type authorization = {
  Authorization?: string,
}

type priority = 'high' | 'normal' | 'low'

type cache = 'immutable' | 'web' | 'cacheOnly'

type customImageCache = {
  uri: string,
  header?: authorization,
  priority?: priority,
  token?: string,
  cache?: cache,
}

interface ComponentProps {
  rounded?: boolean,
  height?: number,
  bordered?: boolean,
  borderWidth?: number,
  borderColor?: string,
  resize?: string,
  uri: string | customImageCache | any,
  width?: number,
  imageStyle?: object,
}

class CachedImage extends PureComponent<ComponentProps> {
  public static defaultProps = {
    width: baseConfig.cachedImage.width,
    height: baseConfig.cachedImage.height,
    rounded: baseConfig.cachedImage.rounded,
    bordered: baseConfig.cachedImage.bordered,
    borderWidth: baseConfig.cachedImage.borderWidth,
    borderColor: baseConfig.cachedImage.borderColor,
    imageStyle: baseConfig.cachedImage.imageStyle,
    resize: baseConfig.cachedImage.resize,
  }

  identifyRadius = () => {
    const {
      rounded,
      height,
    } = this.props;
    if (rounded) {
      return { borderRadius: height! / 2 };
    }

    return { borderRadius: 0 };
  }

  identifyBordered = () => {
    const {
      bordered,
      borderWidth,
      borderColor,
    } = this.props;
    if (bordered) {
      return {
        borderWidth,
        borderColor,
      }
    }

    return {
      borderWidth: 0,
    }
  }

  identifyMode = () => {
    const { resize } = this.props;
    if (resize === 'cover') {
      return FastImage.resizeMode.cover;
    }
    if (resize === 'stretch') {
      return FastImage.resizeMode.stretch;
    }
    if (resize === 'center') {
      return FastImage.resizeMode.center;
    }
    return FastImage.resizeMode.contain;
  }

  checkPriority = (priorityType: string) => {
    if (priorityType === 'normal') {
      return FastImage.priority.normal;
    }
    if (priorityType === 'high') {
      return FastImage.priority.high;
    }
    return FastImage.priority.low;
  }

  checkCache = (cacheType: string) => {
    if (cacheType === 'immutable') {
      return FastImage.cacheControl.immutable;
    }

    if (cacheType === 'cacheOnly') {
      return FastImage.cacheControl.cacheOnly;
    }

    return FastImage.cacheControl.web;
  }

  defineUri = () => {
    const { uri } = this.props;
    if (typeof uri === 'string') {
      return {
        uri,
        headers: { Authorization: baseConfig.cachedImage.token },
        priority: this.checkPriority(baseConfig.cachedImage.priority),
        cache: this.checkCache(baseConfig.cachedImage.cache),
      }
    }

    if (typeof uri === 'object') {
      return {
        uri: uri.uri,
        headers: { Authorization: uri.token },
        priority: this.checkPriority(typeof uri.priority !== 'undefined' ? uri.priority : baseConfig.cachedImage.priority),
        cache: this.checkCache(typeof uri.cache !== 'undefined' ? uri.cache : baseConfig.cachedImage.cache),
      }
    }

    return uri
  }

  render() {
    const {
      height,
      width,
      imageStyle,
      ...props
    } = this.props;
    return (
      <FastImage
        source={this.defineUri()}
        style={{
          width,
          height,
          ...this.identifyRadius(),
          ...this.identifyBordered(),
          ...imageStyle,
        }}
        resizeMode={this.identifyMode()}
        {...props}
      />
    )
  }
}

export default CachedImage;
