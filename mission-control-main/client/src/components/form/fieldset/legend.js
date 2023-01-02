import React from 'react';
import ClassNames from 'classnames';
import Style from '../label/label.module.scss';

export function Legend(props){

  const css = ClassNames([

    Style.label,
    Style.legend,
    props.className,
    props.required && Style.required,

  ])

  return(
    <legend className={ css }>
    { props.text }
    </legend>
  );
}
