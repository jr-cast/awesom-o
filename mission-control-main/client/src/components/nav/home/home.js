/***
*
*   HOME NAV
*   Navigation used on the main external website. Renders a dashboard link
*   if the user is signed in, or a sign up link if they are not
*
**********/

import React, { useContext } from 'react';
import ClassNames from 'classnames';
import { AuthContext, Logo, Link, Content } from 'components/lib';
import Style from './home.module.scss';

export function HomeNav(props){

  // context
  const context = useContext(AuthContext);

  // style
  const css = ClassNames([

    Style.nav,
    props.transparent && Style.transparent

  ]);

  return(
    <section className={ css }>
      <Content>

        <Logo className={ Style.logo }/>

        <nav>
          { context.user?.token &&
          <Link btn small url='/dashboard' className={ Style.cta } text='Dashboard' /> }
        </nav>

      </Content>
    </section>
  );
}
