import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleBook } from '../../../api/bookData';
import BookForm from '../../../components/forms/BookForm';

export default function EditBook() {
  const [editItem, setEditItem] = useState({});
  // router is a hook that grabs an object
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;
  // i neamed this file [firebaseKey].js so that's why it's called that

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleBook(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<BookForm obj={editItem} />);
}
