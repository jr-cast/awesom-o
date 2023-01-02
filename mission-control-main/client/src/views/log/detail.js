/***
*
*   LOG/DETAIL
*   View the details of an application log.
*
**********/

import React, { useState, useEffect } from 'react';
import { Card, Form, useAPI, useLocation } from 'components/lib';

export function LogDetail(props){

  const location = useLocation();
  const path = location?.pathname?.split('/');

  const [form, setForm] = useState(null);
  const log = useAPI(`/api/log/${path[2]}`)

  useEffect(() => {
    if (log.data?.length){

      const f = {};

      Object.keys(log.data[0]).forEach(key => {
        f[key] = {
          label: key,
          value: log.data[0][key],
          type: key === 'body' ? 'textarea' : 'text',
        }
      });

      setForm(f);
      
    }
  }, [log.data])

  return (
    <Card loading={ log.loading }>
      
      { form &&
        <Form data={ form } />}

    </Card>
  );
}