import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid';
import { StyledForm } from '../../../common/StyledBasicComponents';
import { SignInPayload } from '../types';
import TextInputField from '../../../common/TextInputField';
import PasswordInputField from '../../../common/PasswordInputField';
import StyledButton from '../../../common/StyledButton';

const HeaderText = styled.h1`
  font-weight: 800;
  font-size: 30px;
  color: #25334f;
  padding-bottom: 24px;
`;

export default function SignIn() {
  const handleSubmit = (values: SignInPayload) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const initialValues: SignInPayload = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <>
      <HeaderText>Sign In</HeaderText>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => (
          <StyledForm>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
                <TextInputField
                  label="Email"
                  name="email"
                  required
                  placeholder="Enter email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInputField
                  label="Password"
                  name="password"
                  required
                  placeholder="Enter password"
                />
              </Grid>
            </Grid>
            <Grid container mt={4} mb={6} justifyContent="flex-end">
              <StyledButton
                type="submit"
                fullWidth
                buttonText="Sign In"
                disabled={!dirty || !isValid}
                isLoading={false}
              />
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </>
  );
}
