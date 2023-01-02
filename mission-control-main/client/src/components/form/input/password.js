import React, { useState } from 'react';
import ClassNames from 'classnames';
import { Label, Error, Icon } from 'components/lib';
import Style from './input.module.scss';

export function PasswordInput(props){

  const [error, setError] = useState(props.errorMessage || 'Please enter a password')

  function validate(e){

    let value = e ? e.target.value : '';
    let valid = undefined;

    // input is required and value is blank
    if (props.required && value === '')
      valid = false;

    // input isn't required and value is blank
    if (!props.required && value === '')
      valid = true;

    if (props.required && value !== '')
      valid = true;

    if (!props.required)
      valid = true;

    // complexity rules
    if (props.complexPassword){
      if (value.length < 8){

        valid = false;
        setError('Password must be a minimum of 8 characters');

      }
      else if (!/[A-Z]/.test(value)){

        valid = false;
        setError('Password must have at least one upper case letter');

      }
      else if (!/[a-z]/.test(value)){

        valid = false;
        setError('Password must have at least one lower case letter');

      }
    }
      
    // update the parent form
    props.onChange?.(props.name, value, valid);

  }

  const css = ClassNames([

    Style.textbox,
    props.className,
    props.valid === false && Style.error,
    props.valid === true && Style.success

  ]);

  return(
    <div className={ Style.input }>

      { props.label && 
        <Label
          text={ props.label }
          required={ props.required }
          for={ props.name }
        /> }

      <input
        type='password'
        id={ props.for }
        name={ props.name }
        className={ css }
        onChange={ e => props.onChange?.(props.name, e.target.value, undefined) }
        onBlur={ e => validate(e) }
      />

      { props.valid === false &&
        <Error message={ error }/> }

      { props.valid === true &&
        <Icon
          image='check'
          color='#8CC57D'
          className={ Style.successIcon }
          size={ 16 }
        />}

    </div>
  );
}
