/***
*
*   GRID
*   Responsive one-to-six column grid layout
*
*   PROPS
*   cols: number of columns (default: 2, max: 6)
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import Style from './grid.module.scss';

export function Grid(props){

  let grid = [];
  let cols = ['one', 'two', 'three', 'four', 'five', 'six'];

  if (props.cols){

    for (let i = 0; i < parseInt(props.cols); i++)
      grid.push(Style[cols[i]]);

  }

  const css = ClassNames([ Style.grid, ...grid ])

  return(
    <section className={ css }>
      { props.children?.length > 1 ?
        props.children.map((child, index) => {

          return child

        }) : props.children
      }
    </section>
  );
}
