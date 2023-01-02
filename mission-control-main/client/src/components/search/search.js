/***
*
*   SEARCH
*   Search input field
*
*   PROPS
*   throttle: throttle the callback execution in ms
*   callback: function executed on change and submit
*
**********/

import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import Style from './search.module.scss';
import InputStyle from '../form/input/input.module.scss';

export function Search(props){

  const [value, setValue] = useState(props.value || '');
  const [typing, setTyping] = useState(false);
  const css = ClassNames([ Style.search, props.className ]);

  useEffect(() => {

    // throttle typing
    if (props.throttle && !typing){
      const onKeyPress = () => {

        setTyping(true);
        setTimeout(() => { setTyping(false) }, props.throttle);

      }

      window.addEventListener('keydown', onKeyPress);
      return () => window.removeEventListener('keydown', onKeyPress);
      
    }
  }, [props.throttle, typing]);

  useEffect(() => {

    // callback when typing throttle done
    if (props.throttle && !typing)
      props.callback(value);

  }, [props, typing, value])

  return (
    <form className={ css }>
      <input
        type='text'
        className={ InputStyle.textbox }
        placeholder={ props.placeholder || 'Search' }
        value={ value }
        onChange={ e => {

          setValue(e.target.value);
          !props.throttle && props.callback(e.target.value);

        }}
      />
      <input
        type='submit'
        value=''
        className={ Style.btn }
        onClick={ e => {

          e.preventDefault();
          props.callback(value);

        }}
      />
    </form>
  );
}
