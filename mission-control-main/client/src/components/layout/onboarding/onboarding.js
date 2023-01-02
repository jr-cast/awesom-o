/***
*
*   ONBOARDING LAYOUT
*   Simple layout to focus on user onboarding actions
*
**********/

import React, { useEffect } from 'react';
import Style from './onboarding.module.scss';

export function OnboardingLayout(props){

  useEffect(() => {

    document.body.classList.add('color');
    return () => { document.body.classList.remove('color'); }

  }, [])

  return (
    <main className={ Style.onboarding }>

      { <props.children {...props.data }/> }

    </main>
  );
}
