import React from 'react';
import { Label } from 'components/lib';
import Style from './checkbox.module.scss';

export function Checkbox(props){

  return (
    <div className={ Style.checkbox }>
      <input
        type='checkbox'
        name={ props.name }
        id={ props.option }
        value={ props.option }
        checked={ props.checked ? 'checked' : '' }
        onChange={ e => props.callback(props.index, props.checked, props.option)}
      />

      <Label
        text={ props.option }
        required={ props.required }
        for={ props.option }
      />
    </div>
  );
}
