/***
*
*   ERROR
*   Form error message renders below input
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import Style from './error.module.scss';

export function Error(props){

  const css = ClassNames([

    Style.error,
    props.className

  ]);

  return (
    <div className={ css }>
      { props.message }
    </div>
  )
}
