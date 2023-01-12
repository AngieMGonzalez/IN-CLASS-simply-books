import React from 'react';
import { useRouter } from 'next/router';

export default function EditAuthor() {
  // const [editAuthor, setEditAuthor] = useState({});
  // router is a hook that grabs an object
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;
  // i neamed this file [firebaseKey].js so that's why it's called that

  // TODO: make a call to the API to get the book data
  // useEffect(() => {
  //   getSingleAuthor(firebaseKey).then(setEditAuthor);
  // }, [firebaseKey]);

  // TODO: pass object to form
  return (<div> Edit Author {firebaseKey} </div>);
}
