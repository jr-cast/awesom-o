import React, { Fragment } from 'react';
import { Label } from 'components/lib';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import Style from './input.module.scss';

export function DateInput(props){

  // init default value
  let date = props.value;

  if (date && date.indexOf('-') && date.length >= 10){

    date = date.split('-');

    date = {

      year: parseInt(date[0]),
      month: parseInt(date[1]),
      day: parseInt(date[2])

    }
  }
  else {

    const now = new Date();
    date = {

      year: now.getFullYear(),
      month: now.getMonth()+1,
      day: now.getDate()

    }
  }

  function formatDateString(d){

    return `${d.year}-${ d.month < 10 ? '0' + d.month : d.month }-${ d.day < 10 ? '0' + d.day : d.day }`

  }

  function change(date){

    let valid;

    if (props.required)
      valid = date.year && date.day && date.month ? true : false;

    props.onChange(props.name, formatDateString(date), valid);

  }

  function customInput({ ref }){

    return (
      <input 
        ref={ ref } 
        value={ props.value?.split('T')[0] }
        placeholder={ props.placeholder || 'Please select a date' }
        className={ Style.textbox }
      />
    );
  }
  
  return (
    <Fragment>

      { props.label && 
        <Label text={ props.label } /> }

      <DatePicker
        value={ date }
        onChange={ change }
        minimumDate={ props.min }
        maximumDate={ props.max }
        colorPrimary='#73B0F4'
        wrapperClassName={ Style.dateWrapper }
        renderInput={ customInput }
        calendarPopperPosition='bottom'
        inputClassName={ Style.textbox }
      />
    </Fragment>
  )
}