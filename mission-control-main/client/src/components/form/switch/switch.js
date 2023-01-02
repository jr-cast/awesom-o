import React, { useState } from 'react';
import ClassNames from 'classnames';
import { Label } from 'components/lib';
import Style from './switch.module.scss';

export function Switch(props){

  // state
  const [on, setOn] = useState(props.default);

  function toggle(){

    setOn(!on);
    props.onChange(props.name, !on, true);

  }

  const trackCss = ClassNames([ Style.track, on && Style.trackOn ]);
  const handleCss = ClassNames([ Style.handle, on && Style.handleOn ]);

  return(
    <div className={ Style.switch }>

      <Label
        text={ props.label }
        required={ props.required }
      />

      <div className={ trackCss } onClick={ toggle } >
        <div className={ handleCss }></div>
      </div>
    </div>
  );
}
