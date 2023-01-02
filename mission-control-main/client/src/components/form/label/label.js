import React from 'react';
import ClassNames from 'classnames';
import Style from './label.module.scss';

export function Label(props){

  const css = ClassNames([

    Style.label,
    props.required && Style.required

  ]);

  return(
    <label className={ css } htmlFor={ props.for }>
      { props.text }
    </label>
  );
}
