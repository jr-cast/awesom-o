import { Fragment, useState, useContext, useEffect } from 'react';
import { Table, TitleRow, useAPI, ViewContext, Button, Card } from 'components/lib';

export function BooksInfo(props) {
  const context = useContext(ViewContext);
  const [books, setBooks] = useState([]);
  const list = useAPI('/api/book');

  useEffect(() => {
    if (list?.data?.length)
      setBooks(list.data)
  }, [list.data]);

  const deleteBook = (data, callback) => {
    context.modal.show({
      title: "Delete Book",
      form: {},
      buttonText: "Delete Book",
      text: `Are you sure you want to delete ${data.title}`,
      url: `/api/book/${data.id}`,
      method: "DELETE",
      destructive: true,
    }, () => {
      context.notification.show(data.title + ' was deleted', 'success', true);
      callback();
    })
  }

  return (
    <Fragment>
      <h1 className='text-3xl font-bold mb-5'>Books Information</h1>
      <Card>
        <Table
          search
          className='restrict-width'
          data={books}
          loading={list.loading}
          show={['title', 'author', 'year', 'created_at', 'updated_at']}
          actions={{
            delete: deleteBook,
          }}
        />
      </Card>
    </Fragment >
  );
}
