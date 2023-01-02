import React from 'react';
import { Label } from 'components/lib';
import Style from './radio.module.scss';

export function Radio(props){

  const option = props.option.value || props.option;
  const label  = props.option.label || props.option;

  return (
    <div className={ Style.radio }>

      <input
        type='radio'
        name={ props.name }
        id={ option }
        value={ option }
        checked={ props.checked ? 'checked' : '' }
        onChange={ e => props.callback(props.index, props.checked, option)
        }
      />

      <Label
        text={ label }
        required={ props.required }
        for={ option }
      />
    </div>
  );
}
