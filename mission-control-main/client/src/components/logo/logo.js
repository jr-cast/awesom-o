/***
*
*   LOGO
*   Replace the image in /images with your own logo
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import { Link } from 'components/lib';
import LogoImage from './images/logo.svg';
import LogoMark from './images/logo-mark.svg';
import Style from './logo.module.scss';

export function Logo(props){

  const css = ClassNames([

    Style.logo,
    props.className

  ]);

  return(
    <Link url='/' className={ css }>
      <img src={ props.mark ? LogoMark : LogoImage } alt='Logo' />
    </Link>
  )
}
