/***
*
*   PAGINATE
*   Pagination control to split results into multple pages
*   Returns a new offset
*
*   PROPS
*   total: the total number of results
*   limit: the number of results per page
*   offset: the current position 
*
**********/

import React, { useState, useEffect } from 'react';
import { Button } from 'components/lib';
import Style from './paginate.module.scss';

export function Paginate(props){
  
  const totalPages = (props.total / props.limit).toFixed(0);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    if (props.total)
      setTotal(props.total);

  }, [props.total])

  function prev(){
    if (page > 0){

      setPage(page-1)
      props.onChange((page-1) * props.limit)

    }
  }

  function next(){
    if (page < (totalPages-1)){

      setPage(page+1)
      props.onChange((page+1) * props.limit)

    }
  }

  const start = parseInt(props.offset+1); // add one so it doesn't start at 0
  const end = parseInt(props.offset) + parseInt(props.limit);

  return (
    <section className={ Style.paginate }>

      <Button 
        icon='chevron-left' 
        size={ 20 } 
        iconColor={ page > 0 || props.loading ? 'purple' : 'grey' }
        action={ prev }
       />

       <span className={ Style.counter }>

         { (props.offset || props.limit) ? 
          `showing ${start} - ${end > total ? total : end} of ${total} ` : 'No Results' }
          
       </span>
     
       <Button 
        icon='chevron-right' 
        size={ 20 } 
        iconColor={ page < (totalPages-1) || props.loading ? 'purple' : 'grey' }
        action={ next }
       />

   </section>
  )
}

