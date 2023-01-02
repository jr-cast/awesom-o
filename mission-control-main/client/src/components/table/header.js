import React, { useState } from 'react';
import ClassNames from 'classnames';
import Style from './table.module.scss';

export function Header(props){

  // initialise
  let data = [...props.data]
  let colLength = data?.length ? data.length-1 : 0;

  // state
  const [sortDirections, setSortDirections] = useState(new Array(colLength));

  if (!data)
    return false;

  // inject actions
  if (props.actions && props.data[colLength]?.name)
    data.push({ name: 'actions', title: 'Actions', sort: false });

  // sort the columns
  function sort(index, cell){

    if (!props.data[index].sort)
      return false;

    const direction =
      sortDirections[index] === 'asc' ? 'desc' : 'asc';

    // reset sorting on all columns
    let sorted = new Array(colLength)
    sorted[index] = direction;

    // done
    props.callback(cell, direction);
    setSortDirections(sorted)

  }

  return(
    <thead>
      <tr>
        { data.map((cell, index) => {

          // hide
          if (props.hide?.includes(cell.name))
            return false;

          // show
          if (props.show && !props.show.includes(cell.name) && cell.name !== 'actions')
            return false;

          // style
          const css = ClassNames([

            [cell.name],
            cell.sort && Style.sort,
            cell.name === 'actions' && Style.actions,
            cell.sort && Style[sortDirections[index]]

          ])

          return (
            <th
              key={ index }
              className={ css }
              onClick={ () => cell.sort && sort(index, cell.name) }>
              { cell.title }
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
