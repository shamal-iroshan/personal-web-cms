import React from 'react';
import { Grid, Typography } from '@mui/material';
import { styled as materialStyled } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordInputField from './PasswordInputField';
import CustomModal from './CustomModal';
import { StyledForm } from './StyledBasicComponents';
import StyledButton from './StyledButton';

interface ResetOwnPasswordTypes {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

const TitleTypography = materialStyled(Typography)(() => ({
  fontWeight: 700,
  fontSize: 24,
  color: '#25334F',
  marginBottom: 16,
})) as typeof Typography;

interface ResetPasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function ResetPasswordModal(props: ResetPasswordModalProps) {
  const { open, handleClose } = props;

  const handleSubmit = (values: ResetOwnPasswordTypes) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const initialValues: ResetOwnPasswordTypes = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Please enter your current password'),
    newPassword: Yup.string()
      .required('Please enter your new password')
      .trim()
      .min(8, 'Must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain, one uppercase, one lowercase, one number and one special case character',
      )
      .when('oldPassword', {
        is: (val: string) => !!(val && val.length > 7),
        then: Yup.string().notOneOf(
          [Yup.ref('oldPassword')],
          'Please enter new password',
        ),
      }),
    confirmNewPassword: Yup.string()
      .required('Please re-enter your new password')
      .when('newPassword', {
        is: (val: string) => !!(val && val.length > 7),
        then: Yup.string().oneOf(
          [Yup.ref('newPassword')],
          'Both passwords need to be the same',
        ),
      }),
  });

  return (
    <CustomModal open={open} handleClose={handleClose}>
      <TitleTypography>Reset Your Password</TitleTypography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ isValid, dirty, resetForm }) => (
          <StyledForm>
            <Grid container columnSpacing={4} rowSpacing={3}>
              <Grid item xs={12}>
                <PasswordInputField
                  label="Current Password"
                  name="oldPassword"
                  required
                  placeholder="Your current password"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInputField
                  label="New Password"
                  name="newPassword"
                  required
                  placeholder="Your new password"
                  hint="Must be at least 8 characters"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInputField
                  label="Confirm new password"
                  name="confirmNewPassword"
                  required
                  placeholder="Your new password"
                />
              </Grid>
            </Grid>
            <Grid container item gap={2} justifyContent="center" mt={4}>
              <StyledButton
                isError
                buttonText="Cancel"
                onClick={() => {
                  handleClose();
                  resetForm();
                }}
              />
              <StyledButton
                type="submit"
                buttonText="Reset Password"
                disabled={!dirty || !isValid}
                isLoading={false}
              />
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </CustomModal>
  );
}
