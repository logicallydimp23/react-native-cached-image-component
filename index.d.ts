import React, { PureComponent } from 'react'

import {
  StyleProp,
  ImageStyle,
} from 'react-native'

import { Source } from 'react-native-fast-image'

type ImageStyleProp = StyleProp<ImageStyle>

/**
 * CachedImage exclusive prop
 */
 type authorization = {
  Authorization?: string,
}

type priority = 'high' | 'normal' | 'low'

type cache = 'immutable' | 'web' | 'cacheOnly'

type resizeModes = 'contain' | 'cover' | 'stretch' | 'center'

/**
 * CachedImage exclusive prop
 */
 type customImageCache = {
  uri: string,
  header?: authorization,
  priority?: priority,
  cache?: cache,
}

export interface CachedImageProps {
  /**
   * Source image
   *
   * Can be a local image or remote image
   */
  uri: customImageCache | Source,
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
  imageStyle?: ImageStyleProp,
  /**
   * resizeMode of the image.
   */
  resize?: resizeModes,
  /**
   * tintColor of the image,
   */
  tintColor?: string,
}

/**
 * CachedImage
 *
 * Custom image component.
 *
 * Made with react-native-fast-image.
 */
export class CachedImage extends PureComponent<CachedImageProps> { }
