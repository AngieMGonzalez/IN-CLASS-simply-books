import React, { useEffect, useState } from 'react';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';
import { useAuth } from '../utils/context/authContext';
// we import the individual funcs we need so we dont have towtie React.useState
export default function ShowAuthors() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();
  // now we have this state of authors

  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAuthors(user.uid).then(setAuthors);
  }, []);
  // }, [authors]); sometimes tho it will just re-run and re-run; dependency array
  // infinite loop
  // when specific data changes needs side effects, we put something in here []
  // when u want a specific component to render thing
  // without the , [] dont run again until theyres a new component

  // down here u dont have to go and get the authors, we already set the state of the authors up there
  // before we had to go get the data every single time
  // we can get it once and say okay pass the array of authors here. and map thru and pass a single component
  // we want to try to limit api calls - haveing to getall sorts of data can make app slow
  // so we store data in app
  return (
    <div>
      {authors.map((author) => (
        <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />
      ))}
    </div>
  );
}
