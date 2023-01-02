/***
*
*   STAT
*   Statistic value with optional icon and -/+ change value
*
*   PROPS
*   value:  numeric value
*   label: string
*   loading: boolean to toggle loading animation (optional)
*   icon: icon to use (optional)
*   change: positive/negative number indicating change amount (optional)
*
**********/

import React from 'react'
import ClassNames from 'classnames';
import { Card, Icon, Loader } from 'components/lib';
import Style from './stat.module.scss';

export function Stat(props){

  // style
  const changeCss = ClassNames([

    Style.change,
    props.change?.toString().includes('-') ? Style.down : Style.up,

  ])

  // is loading
  if (props.loading || props.value === undefined){
    return (
      <Card>
        <div className={ Style.stat }>
          <Loader />
        </div>
      </Card>
    );
  }

  return(
    <Card>
      <div className={ Style.stat }>

        { props.icon &&
          <Icon
            color='dark'
            image={ props.icon }
            size={ 20 }
            className={ Style.icon }
          />
        }

        <div className={ Style.value }>{ props.value }</div>
        <div className={ Style.label }>{ props.label }</div>

        { props.change &&
          <div className={ changeCss }>
          { props.change }
          </div>
        }

      </div>
    </Card>
  );
}
