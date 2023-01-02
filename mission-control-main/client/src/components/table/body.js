import React from 'react';
import { Button, Badge } from 'components/lib';
import Style from './table.module.scss';

export function Body(props){

  if (props.data?.length){
    return (
      <tbody>
        { props.data.map((row, index) => {
          
          return <Row {...props } data={ row } key={ index }/>

        })}
      </tbody>
    );
  }

  return (
    <tbody>
      <tr>
        <td colSpan='10'>No results found</td>
      </tr>
    </tbody>
  );
}

export function Row(props){

  let row = {...props.data }
  row.actions = row.actions || props.actions;
  const hasActions = Object.values(row.actions).some(x => (x !== undefined));

  return(
    <tr data-id={ props.data.id }>
      { Object.keys(row).map((cell, index) => {

        // actions
        if (cell === 'actions'){
          if (hasActions){
            return (
              <td key={ index } className={ Style.actions }>

                { row.actions?.custom?.map((action, i) => {
                  if (action.condition){

                    return row[action.condition.col] === action.condition.value ? 
                      <Button key={ i } icon={ action.icon } action={ () => action.action(row) } /> : false;

                  }

                  return <Button key={ i } icon={ action.icon } action={ () => action.action(row) } />

                })}
                
                { row.actions.edit &&
                  <Button icon='edit' action={ () => row.actions.edit(row, (res) => props.callback.edit(res, row) )}/>}

                { row.actions.download &&
                  <Button icon='download' url={ row.actions.download }/>}

                { row.actions.view &&
                  <Button icon='eye' url={ `${row.actions.view.url}/${row[row.actions.view.col]}` }/>}

                { row.actions.email &&
                  <Button icon='mail' action={ () => window.location = `mailto:${row.email}` }/>}

                { row.actions.invite &&
                  <Button icon='mail' action={ e => row.actions.invite(row) }/> }
                                   
                { row.actions.delete &&
                  <Button icon='trash' action={ () => row.actions.delete(row, (res) => props.callback.delete(res, row)) }/>}
                  
              </td>
            );
          }
          else return false;

        }

        // hide
        if (props.hide?.includes(cell))
          return false;

        // show
        if (props.show && !props.show.includes(cell))
          return false;

        let value = row[cell];

        // is date/time
        if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(value)){

          const date = new Date(value).toISOString().split('T');
          value = `${date[0]} ${date[1].split('.')[0]}`;

        }

        // has badge
        if (typeof value !== undefined && props.badge && cell === props.badge.col){

          // default color
          let color = props.badge.color;

          // check each condition
          if (props.badge.condition){
            props.badge.condition.forEach(cond => {

              (typeof cond.value === 'string' && typeof value === 'string') ? 
                color = cond.value.toLowerCase() === value.toLowerCase() ? cond.color : color :
                color = cond.value === value ? cond.color : color;

            });
          } 
   
          return (
            <td key={ index }>
              <Badge text={ value === true  ? 'Yes' : (value === false ? 'No' : value) } color={ color }/>
            </td>
          );
        }

        // standard cell
        return(
          <td key={ index }>
            { value === true  ? 'Yes' : (value === false ? 'No' : value) }
          </td>
        );
      })}
    </tr>
  );
}
