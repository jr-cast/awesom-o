import React, { Fragment } from 'react';

export function RowHeader(props){

  const showHeader = props.title ? true : false;

  return (
    <Fragment>
      { showHeader &&
        <header>

          { props.mainTitle ?
            <h1>{ props.mainTitle }</h1> :
            <h2>{ props.title }</h2>
          }

          { props.desc && <p>{ props.desc }</p> }
        </header>
      }
    </Fragment>
  )
}
