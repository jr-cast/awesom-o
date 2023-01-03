import { Fragment, useEffect, useState, useContext } from 'react';
import { Animate, useAPI, Button, Card, ViewContext } from 'components/lib';

export function Book(props) {
  const context = useContext(ViewContext);
  const [books, setBooks] = useState([]);
  const list = useAPI('/api/book');

  useEffect(() => {
    if (list?.data?.length)
      setBooks(list.data)
  }, [list.data]);

  const userForm = {
    title: {
      label: 'Book Title',
      type: 'text',
      require: true,
      errorMessage: 'Please enter a title'
    },
    author: {
      label: 'Author',
      type: 'text',
      require: true,
      errorMessage: 'Please enter an author'
    },
    year: {
      label: 'Year (YYYY)',
      type: 'text',
      require: false,
    }
  };

  const addBook = () => {
    context.modal.show({
      title: "Add Book",
      form: userForm,
      buttonText: "Add Book",
      url: "/api/book",
      method: "POST",
    }, (res) => {
      if (res.length) {
        console.log(res);
        context.notification.show('Book added to your collection', 'success', true);
        const state = [...books];

        state.push({
          title: res.title.value,
          author: res.author.value,
          year: res.author.value,
        });
      }
    });
  }

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
      <Animate>

        <Button className="mb-5" text="Add Book" action={addBook} />

        {books?.length ? books.map(item => {
          return <Card className="w-1/2" key={item.id} title={`${item.title}, ${item.year}`}>{item.author} <Button text="Delete" small /></Card>
        }) : <p className='text-2xl'>No items to display</p>}
      </Animate>

    </Fragment>

  );
}
