import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteAuthorBooks } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  console.warn('authorObj', authorObj);
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate());
      // deleteBook((book.author_id) if book.author_id === authorObj.firebaseKey)
      // merged api call situation
    }
  };
  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={authorObj.image} alt={authorObj.first_name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{authorObj.first_name}</Card.Title>
          <Card.Title>{authorObj.last_name}</Card.Title>
          <p className="card-text bold">{ authorObj.favorite && <span>Fave Auth<br /></span> } {authorObj.email}</p>
          {/* DYNAMIC LINK TO VIEW THE AUTHOR DETAILS  */}
          <Link href={`/author/${authorObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">View Details</Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE Author DETAILS this route knows wut compnt to render */}
          <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
// .propTypes = about to define the proptypes, only append to components
// PropTypes. is when youre defining an actual proptype
AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
