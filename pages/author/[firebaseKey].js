/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

// we dont pass any props to ViewBook
export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  console.warn('router object', router);
  console.warn('authorDetails', authorDetails);

  const forOnUpdateOfAuthors = () => {
    // eslint-disable-next-line no-use-before-define
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
    console.warn('setAuthorDetails', setAuthorDetails);
  };

  // TODO: grab firebaseKey from url query is a key within the router obj - {firebaseKey} is taco
  const { firebaseKey } = router.query;
  // we are deconstructing, we are saying get the firebaseKey w/in the query

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={authorDetails.image} alt={authorDetails.first_name} style={{ height: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {authorDetails.first_name} {authorDetails.last_name}
            {authorDetails.favorite ? ' 🤍' : ''}
          </h5>
          Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
          <hr />
        </div>
      </div>
      <hr />
      <h3>These are the books {authorDetails.first_name} {authorDetails.last_name} wrote:</h3>
      <div className="d-flex flex-column">
        {authorDetails.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={forOnUpdateOfAuthors} />
        ))}
      </div>
    </>
  );
}
