/***
*
*   APP LAYOUT
*   The mission control dashboard layout containing the navigation
*   and header (title, secondary nav)
*
*   PROPS
*   title: title of the view
*
**********/

import React, { Fragment, useContext } from 'react';
import ClassNames from 'classnames';
import { AuthContext, AppNav, Header } from 'components/lib';
import Style from './app.module.scss';
import '../layout.scss'; // globals

export function AppLayout(props){

  // context & style
  const context = useContext(AuthContext);
  const css = ClassNames([ Style.app, 'with-sidebar' ]);

  return (
    <Fragment>
      <AppNav
        type='popup'
        items={[
          { label: 'Dashboard', icon: 'activity', link: '/dashboard' },
          { label: 'Feedback', icon: 'heart', link: '/feedback' },
          { label: 'Logs', icon: 'clipboard', link: '/logs' },
          { label: 'Events', icon: 'clock', link: '/events' },
          { label: 'Accounts', icon: 'credit-card', link: '/accounts' },
          { label: 'Users', icon: 'users', link: '/users' },
          { label: 'Sign Out', icon: 'log-out', action: context.signout }
        ]}
      />

      <main className={ css }>

        <Header title={ props.title } />
        { <props.children {...props.data }/> }

      </main>
    </Fragment>
  );
}
