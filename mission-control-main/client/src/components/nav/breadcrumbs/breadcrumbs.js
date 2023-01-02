/***
*
*   BREADCRUMBS
*   Navigation trail for nested pages.
*
*   PROPS
*   items: array of objects containing keys: name and url
*
**********/

import React from 'react';
import { Link } from 'components/lib';
import Style from './breadcrumbs.module.scss';

export function Breadcrumbs(props){

  return(
    <nav className={ Style.breadcrumbs }>
      { props.items?.map(item => {
        return (
          <Link
            key={ item.name }
            url={ item.url }
            text={ item.name }
          />
        );
      })}
    </nav>
  );
}
