import React, { useEffect, useState } from 'react';
import { faveAuthors } from '../../api/authorData';
import AuthorCard from '../../components/AuthorCard';
import { useAuth } from '../../utils/context/authContext';

export default function FavoriteAuthors() {
  const { user } = useAuth();
  const [authors, setAuthors] = useState([]);

  const getAllFaveAuthors = () => {
    faveAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAllFaveAuthors();
  }, []);

  return (
    <div>{authors.map((author) => <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllFaveAuthors} />)}
    </div>
  );
}
