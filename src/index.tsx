/* eslint-disable import/no-cycle */
import React, { PureComponent } from 'react'

import FastImage, { ImageStyle, ResizeMode, Source } from 'react-native-fast-image'

import { baseConfig } from '../../../src/config/themes';

type resizeModes = 'contain' | 'cover' | 'stretch' | 'center'

interface ComponentProps {
  /**
   * Source image
   *
   * Can be a local image or remote image
   */
  uri: number | Source,
  token?: string,
  /**
    * width of the image
    *
    * defaults to 20
    */
  width?: number,
  /**
    * height of the image
    *
    * defaults to 20
    */
  height?: number,
  /**
    * Specifies if image should have rounded border or not
    */
  rounded?: boolean,
  bordered?: boolean,
  borderWidth?: number,
  borderColor?: string,
  /**
    * style of the image.
    */
  imageStyle?: ImageStyle,
  /**
    * resizeMode of the image.
    */
  resize?: resizeModes,
  /**
    * tintColor of the image,
    */
  tintColor?: string,
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

  identifyRadius = (): any => {
    const {
      rounded,
      height,
    } = this.props;
    if (rounded) {
      return { borderRadius: height! / 2 };
    }

    return { borderRadius: 0 };
  }

  identifyBordered = (): any => {
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

  identifyMode = (): ResizeMode => {
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

  checkPriority = (priorityType: string): string => {
    if (priorityType === 'normal') {
      return FastImage.priority.normal;
    }
    if (priorityType === 'high') {
      return FastImage.priority.high;
    }
    return FastImage.priority.low;
  }

  checkCache = (cacheType: string): string => {
    if (cacheType === 'immutable') {
      return FastImage.cacheControl.immutable;
    }

    if (cacheType === 'cacheOnly') {
      return FastImage.cacheControl.cacheOnly;
    }

    return FastImage.cacheControl.web;
  }

  defineUri = (): any => {
    const {
      uri,
      // token,
    } = this.props;
    if (typeof uri === 'string') {
      return {
        uri,
        // headers: { Authorization: baseConfig.cachedImage.token },
        priority: this.checkPriority(baseConfig.cachedImage.priority),
        cache: this.checkCache(baseConfig.cachedImage.cache),
      }
    }

    if (typeof uri === 'object') {
      return {
        uri: uri.uri,
        // headers: { Authorization: token || baseConfig.cachedImage.token },
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
