import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password requires at least 6 characters')
    .required('Password is required'),
  name: Yup.string().required('Name is required'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />

        <button type="submit">Sign Up</button>
        <Link to="/">I already have an account</Link>
      </Form>
    </>
  );
}
