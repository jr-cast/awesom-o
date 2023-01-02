/***
*
*   CHECKLIST
*   Ltems with X or ✓
*
*   PROPS
*   items: array of objects containing keys: name (string) and checked (bool)
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import Style from './checklist.module.scss';

export function CheckList(props){

  const css = ClassNames([

    Style.checklist,
    props.className,
    props.interactive && Style.interactive,
    props.circles && Style.circles

  ])

  if (!props.items)
    return <div>No items in list</div>

  return (
    <ul className={ css }>
      { props.items.map((item, index) => {

        return(
          <li 
            onClick={ item.onClick }
            className={ item.checked ? Style.check : (!props.hideCross ? Style.cross : undefined )} 
            key={ index }>
            { item.name }
          </li>
        );

      })}
    </ul>
  );
}
