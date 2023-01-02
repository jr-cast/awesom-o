import React from 'react';
import Style from './content.module.scss';

export function Content({ children }){

  return <div className={ Style.content }>{ children }</div>

}
