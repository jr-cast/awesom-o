/***
*
*   LINK
*   Routes a new view within the application router
*   Use this instead of <a> to avoid reloading the page
*
*   PROPS
*   url: the destination as defined in /app/app.js
*   title: link title
*   text: link text
*   btn: display a button
*   small: display a small button
*   className: apply a custom css class
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Style from '../button/button.module.scss';

export function Link(props){

  const css = ClassNames([

    'link',
    props.className,
    props.btn && Style.btn,
    props.big && Style.big,
    props.small && Style.small

  ]);

  if (props.url.includes('http')){
    return (
      <a href={ props.url } title={ props.title } className={ css }>
      { props.text }
      </a>
    )
  }

  return(
    <NavLink
      to={ props.url }
      className={ css }
      title={ props.title }
      activeclassname='active'>

      { props.children || props.text }

    </NavLink>

  );
}
