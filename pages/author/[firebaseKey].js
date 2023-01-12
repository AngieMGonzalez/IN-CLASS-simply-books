/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';

// we dont pass any props to ViewBook
export default function ViewAuthor() {
  // const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();
  console.warn('router object', router);

  // TODO: grab firebaseKey from url query is a key within the router obj - {firebaseKey} is taco
  const { firebaseKey } = router.query;
  // we are deconstructing, we are saying get the firebaseKey w/in the query

  // TODO: make call to API layer to get the data
  // useEffect(() => {
  //   viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  // }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div> View Author {firebaseKey} </div>
    </div>
  );
}
