/***
*
*   ICON
*   Render an icon from feather icons
*
*   PROPS
*   color: dark/light/grey/green/orange/blue or hex code
*   pack: icon pack to use, default is feathericons
*   image: image to use (see: https://feathericons.com)
*   className: inject a parent class object
*
**********/

import React from 'react';
import ClassNames from 'classnames';
import FeatherIcon from 'feather-icons-react';

import Style from './icon.module.scss';

export function Icon(props){

  let color;
  const css = ClassNames([ Style.icon, props.className ]);

  switch (props.color){

    case 'light':
    color = '#FFFFFF';
    break;

    case 'dark':
    color = '#758197';
    break;

    case 'grey':
    color = '#ccc';
    break;

    case 'green':
    color = '#8CC57D';
    break;

    case 'blue':
    color = '#73B0F4';
    break;
    
    case 'orange':
    color = '#F0AA61'
    break;

    case 'purple':
    color = '#6363AC';
    break;

    default:
    color = props.color;
    break;

  }

  const Icon = FeatherIcon;

  return(
    <Icon
      color={ color }
      icon={ props.image }
      size={ props.size }
      className={ css }
    />
  )
}
