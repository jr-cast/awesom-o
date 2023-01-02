/***
*
*   BADGE
*   Text badge with background color
*
*   PROPS
*   text: string to be displayed
*   color: blue/red/green/orange (default: purple)
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import Style from './badge.module.scss';

export function Badge(props){

  const css = ClassNames([

    Style.badge,
    props.color && Style[props.color]

  ])

  return (

    <span className={ css }>
      { props.text }
    </span>

  );
}
