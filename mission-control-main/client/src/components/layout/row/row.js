/***
*
*   ROW
*   Renders a new landing page row
*
*   PROPS
*   align: left/right/center
*   color: dark/tint/brand
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import { RowHeader } from './header.js';
import { Content } from './content.js'
import Style from './row.module.scss';

export function Row(props){

  const css = ClassNames([

    Style.row,
    Style[props.color],
    props.align === 'center' && Style.center,
    props.align === 'left' && Style.left

  ]);

  if (props.header){
    return (
      <header className={ css }>
        <Content>

          { props.children }

        </Content>
      </header>
    );
  }

  return (
    <section className={ css }>
      <Content>

        <RowHeader
          title={ props.title }
          desc={ props.desc }
          mainTitle={ props.mainTitle }
        />

        { props.children }

      </Content>
    </section>
  )
}
