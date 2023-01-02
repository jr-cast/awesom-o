/***
*
*   LOADER
*   Infinite spinning animation for loading states
*
**********/

import React, { useEffect } from 'react';
import ClassNames from 'classnames';
import Orbit from './images/orbit.svg';
import Style from './loader.module.scss';

export function Loader(props){

  const css = ClassNames([

    Style.loader,
    props.className,

  ]);

  useEffect(() => {

    if (props.fullScreen){

      document.body.classList.add('disableOverflow');
      return () => document.body.classList.remove('disableOverflow')

    }
  }, [props.fullScreen]);

  return (
    <div className={ css }>
      <img src={ Orbit } className={ Style.orbit } alt='Orbit Spinner'/>
    </div>    
  );
}
