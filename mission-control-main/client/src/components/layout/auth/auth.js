/***
*
*   AUTH LAYOUT
*   Layout for the signup/signin pages
*
**********/

import React from 'react';
import { HomeNav } from 'components/lib';
import Style from './auth.module.scss';

export function AuthLayout(props){

  return (
    <main className={ Style.auth }>
      <HomeNav/>
      { <props.children {...props.data }/> }
    </main>
  );
}
