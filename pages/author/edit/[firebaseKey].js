import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAuthor } from '../../../api/authorData';
import AuthorForm from '../../../components/forms/AuthorForm';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState({});
  // router is a hook that grabs an object
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;
  // i neamed this file [firebaseKey].js so that's why it's called that

  // TODO: make a call to the API to get the authors data
  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (
    <div> <AuthorForm obj={editItem} /> </div>
  );
}
