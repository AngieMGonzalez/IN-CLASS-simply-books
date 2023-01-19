import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAuthor, updateAuthor } from '../../api/authorData';

// these have to match the name "" in the form input
const initialState = {
  email: '',
  first_name: '',
  last_name: '',
  image: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  // handle form first, formInput is for everything on the form
  const [formInput, setFormInput] = useState(initialState); // initial stat is an object so you dont need curly brackets around it
  // router w/ next.js
  const router = useRouter();
  const { user } = useAuth();
  // useAuth is the custom hook we have cause were getting authors by uid

  // useffect happens after thec ompono renders; ie form
  // it is going to mount and unmount components
  // react is a single page application; before we had multiple separate pages
  // its just one page, regardless of the fact that we have pages
  // it mounts and unmounts component - thats wat useeffect does
  // after the seceond render it mounts

  // use state is storing the stae of the data; storing the state of data
  // use state is only for state management of data
  // traking and mging the state of data
  useEffect(() => {
    // because we are not editing the object in the form
    // this is a form for updating and creating a new author!
    // we prepoulate our form with value={formInput.title} which is the state were tracking
    // but when we update were passing obj there, if
    // we will setFormInput to obj
    // if i get an obj that has a firebasekey, fill in that form with the obj's info
    // this is for UPDATE
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);
  // dependcy array, whatever u put in in the depencdy were telling it that it needs to run useEffect again
  // we need to run the useEffect again when the user changes
  // if its empty [] were telling it to run always, just run once on load

  // onChange={handleChange} grabs the previous stage and update it; we need onChange to type
  // all inport forms need it; it needs to know what to do to track changes in the input
  // name has to come after prevState!
  const handleChange = (e) => {
    // console.warn('handleChange');
    const { name, value } = e.target;
    // console.warn('name, value', name, value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // we want to prevent the default behaviour - it will re-render form empty on DOM which we dont want
  // we want to push the data up to our database
  // router has a method called push that takes it to a new page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // formINput is the payload for update Author
      updateAuthor(formInput)
        .then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(() => {
        router.push('/authors');
      });
    }
  };
  console.warn('AuthorForm obj.firebaseKey', obj.firebaseKey);
  // we push router.push - the root is '/' index.js

  // we call bootstrap with Form and FloatingLabel and Form.Control
  // dynamically created h2
  // https://react-bootstrap.github.io/forms/overview/
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* EMAIL INPUT Form.Control is an input tag */}
      <FloatingLabel label="Author Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter an email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel label="Author Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FIRST_NAME INPUT  */}
      <FloatingLabel label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST_NAME INPUT  */}
      <FloatingLabel label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* FAVORITE: A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};

export default AuthorForm;
