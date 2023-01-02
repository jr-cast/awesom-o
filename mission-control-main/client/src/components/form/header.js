/***
*
*   HEADER
*   Use as section break in a form
*
*   PROPS
*   title: string
*   label: optional description label
*
**********/

import React from 'react';

export function FormHeader(props){

  return(
    <header>

      { props.title && <h2>{ props.title }</h2> }
      { props.label && <p>{ props.label }</p> }

    </header>
  );
}
