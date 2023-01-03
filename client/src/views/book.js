import { Fragment, useEffect, useState, useContext } from 'react';
import { Animate, useAPI, Button, Card, ViewContext } from 'components/lib';
const { v4: uuidv4 } = require('uuid');

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

      if (Object.keys(res).length) {

        context.notification.show('Book added to your collection', 'success', true);
        const state = [...books];

        state.push({
          id: uuidv4(),
          title: res.title.value,
          author: res.author.value,
          year: res.author.value,
        });

        setBooks(state)
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
    <div className='border-1 border-gray-900 p-6 rounded-xl bg-white drop-shadow-md'>
      <Animate>

        <Button className="mb-5 w-full" text="Add Book" action={addBook} />
        <div className='flex flex-wrap p-2'>
          {books?.length ? books.map(item => {
            return <Card className='drop-shadow-lg cursor-pointer hover:scale-105 w-4/12' key={item.id} title={`${item.title}, ${item.year}`}>{item.author} <Button style={{ backgroundColor: "red" }} text="Delete" small action={() => deleteBook(item)} /></Card>
          }) : <p className='text-2xl'>No items to display</p>}
        </div>
      </Animate>

    </div>

  );
}
