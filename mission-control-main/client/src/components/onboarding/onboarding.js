/***
*
*   ONBOARDING
*   Flow to help users set up the app, accepts multiple views/steps 
*   On finish/cancel, the user will be marked as onboarded
*
*   PROPS
*   views: array of views to render containing keys: 
*     name, description and component to render
*
**********/

import React, { useState } from 'react';
import Axios from 'axios';
import { Animate, Card, CheckList, Button, Logo, useNavigate } from 'components/lib';
import Style from './onboarding.module.scss';

export function Onboarding(props){

  const navigate = useNavigate();
  const hash = window.location.hash;
  const [activeView, setActiveView] = useState(hash ? hash.substring(1)-1 : 0);

  if (!props?.views?.length)
    return false;

  const view = props.views[activeView];

  async function goTo(view){

    window.location.hash = view + 1;
    setActiveView(view);

  }

  async function finish(){

    if (props.save)
      await Axios.patch('/api/user', { onboarded: true });
      
    navigate(props.onFinish || '/dashboard');
  
  }

  return (
    <div className={ Style.wrapper }>
      <Animate type='pop-center'>
      <Card noPadding className={ Style.onboarding }>

      <Button 
        color='light'
        icon='arrow-right-circle'
        alignIcon='right' 
        text='Skip Intro'
        className={ Style.skip } 
        size={ 16 } 
        action={ () => {
          
          finish();
        
        }}
      />

      <section className={ Style.sidebar }>

        <Logo />
        <CheckList 
          className={ Style.checklist } 
          hideCross circles interactive
          items={ props.views.map((view, i) => {

            return { name: view.name, checked: i <= activeView ? true : false, onClick: () => goTo(i) }

          })
        }/>

      </section>

      <section className={ Style.main }>
                
        <header>
          <h2>{ view.name }</h2>
          { view.description && <span>{ view.description }</span> }
        </header> 

        { view.component }

      </section>

      <nav className={ Style.nav }>
        
        { activeView > 0 &&
          <Button 
            icon='chevron-left' 
            alignIcon='left'
            color='dark' 
            size={ 16 } 
            text='Prev' 
            className={ Style.prev }
            action={ () => goTo(activeView-1) }
           />
        }

        { activeView < props.views.length-1 && 
          <Button 
            icon='chevron-right' 
            alignIcon='right'
            color='dark' 
            size={ 16 } 
            text='Next' 
            className={ Style.next }
            action={ () => { goTo(activeView+1) }}
         />
        }

        { activeView === props.views.length -1 &&
         <Button 
           icon='check-circle' 
           alignIcon='right'
           color='dark' 
           size={ 16 } 
           text='Finish' 
           className={ Style.next }
           action={ () => {
             
            finish();
          
          }}
         />
        }

      </nav>
    </Card>
   </Animate>
   </div>
  );
}