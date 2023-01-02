import React, { Fragment } from 'react';
import ClassNames from 'classnames';
import { Label, Error } from 'components/lib';
import Style from './select.module.scss';

export function Select(props){

  let options = props.options;
  const error = props.errorMessage || 'Please select an option';

  // set the default
  if (!props.default && options?.length){

    // if theres no default, show a please select option
    if (options && options[0]?.value === 'unselected') options.shift(0);
    options.unshift({ value: 'unselected', label: 'Please select an option' });

  }

  function change(e){

    let value = e ? e.target?.value : 'unselected';
    let valid = undefined;

    // validate
    valid = props.required && value === 'unselected' ? false : true;
    props.onChange(props.name, value, valid);
    props.callback && props.callback(value)

  }

  const css = ClassNames([

    Style.select,
    props.className,
    props.valid === true && Style.success,
    props.valid === false && Style.error

  ]);

  return(
    <Fragment>

      <Label
        text={ props.label }
        required={ props.required }
        for={ props.name }
      />

      <div className={ css }>

        <select
          defaultValue={ props.default }
          onChange={ e => change(e) }
          id={ props.name }>

          { options?.map(option => {
            return (
              <option
                key={ option.value }
                value={ option.value }>
                { option.label }
              </option>
            );
          })}

        </select>

        { props.valid === false && <Error message={ error } className={ Style.message }/> }

      </div>
    </Fragment>
  );
}
