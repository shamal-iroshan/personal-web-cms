import React, { useEffect } from 'react';
import * as Yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import PageTitle from '../../../common/PageTitle';
import LoadingContainer from '../../../common/LoadingContainer';
import { Config } from '../types';
import { ROUTE_CONFIG } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import { StyledForm } from '../../../common/StyledBasicComponents';
import TextInputField from '../../../common/TextInputField';
import StyledButton from '../../../common/StyledButton';
import CheckBoxField from '../../../common/CheckBoxField';
import AnimatedTextSelection from '../components/AnimatedTextSelection';
import ServicesSelection from '../components/ServicesSelection';
import ProgrammingSkills from '../components/ProgrammingSkills';
import LanguageSkills from '../components/LanguageSkills';
import Education from '../components/Education';
import Work from '../components/Work';
import { useAppDispatch, useAppSelector } from '../../../store/types';
import { configActions, selectConfig } from '../slice/configSlice';
import errorToast from '../../../common/toast/errorToast';
import { selectIdToken } from '../../signIn/slice/signInSlice';

interface LabelProps {
  disabled: boolean;
}

const StyledLabel = styled.p<LabelProps>`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: #25334f;
  margin-bottom: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const StyledLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function AddConfig() {
  const { configId } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = false;
  const navigate = useNavigate();
  const config = useAppSelector(selectConfig);
  const idToken = useAppSelector(selectIdToken);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  useEffect(() => {
    if (configId && idToken) {
      dispatch(configActions.getConfig(configId));
    }
  }, [configId, dispatch, idToken]);

  const initialValues: Config = {
    id: config?.id || '',
    isActive: config?.isActive || false,
    views: config?.views || 0,
    underMaintenance: config?.underMaintenance || false,
    homeTitle: config?.homeTitle || '',
    animatedText: config?.animatedText || [],
    aboutTitle: config?.aboutTitle || '',
    aboutDescription: config?.aboutDescription || '',
    name: config?.name || '',
    dateOfBirth: config?.dateOfBirth || '',
    address: config?.address || '',
    phone: config?.phone || '',
    email: config?.email || '',
    aboutModalDescription: config?.aboutModalDescription || '',
    profileImageURL: config?.profileImageURL || '',
    cvURL: config?.cvURL || '',
    services: config?.services || [],
    programmingSkills: config?.programmingSkills || [],
    languageSkills: config?.languageSkills || [],
    educations: config?.educations || [],
    works: config?.works || [],
  };

  const onSubmit = (values: Config) => {
    if (configId) {
      dispatch(configActions.updateConfig(values));
    } else {
      dispatch(configActions.addConfig(values));
    }
  };

  const validationSchema = Yup.object().shape({
    // website: Yup.string().required('Website is required'),
  });

  const onClickSetActive = () => {
    if (configId) {
      dispatch(configActions.setConfigAsActive(configId));
    } else {
      errorToast('Oops', 'Something went wrong please try again later.');
    }
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <PageTitle
        title="shamaliroshan.com"
        titleIcon={
          <ArrowBackIcon fontSize={isSmallScreen ? 'medium' : 'large'} />
        }
        titleIconAction={() => navigate(ROUTE_CONFIG, { replace: true })}
      />
      <PageWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ dirty, isValid, values, setFieldValue }) => (
            <StyledForm>
              <Grid container columnSpacing={4} rowSpacing={3}>
                <Grid item xs={12} lg={6}>
                  <StyledLabelContainer>
                    <StyledLabel disabled={false}>Website Status</StyledLabel>
                  </StyledLabelContainer>
                  <CheckBoxField
                    text="Under Maintenance"
                    setChecked={() => {
                      setFieldValue(
                        'underMaintenance',
                        !values.underMaintenance,
                      );
                    }}
                    checked={values.underMaintenance}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="homeTitle"
                    label="Home Title"
                    placeholder="Enter home page title here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <AnimatedTextSelection />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="aboutTitle"
                    label="About Title"
                    placeholder="Enter about page title here"
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <StyledLabelContainer>
                    <StyledLabel disabled={false}>
                      About Description
                    </StyledLabel>
                  </StyledLabelContainer>
                  <OutlinedInput
                    sx={{
                      fontWeight: '400',
                      fontSize: '16px',
                      textAlign: 'center',
                      height: 'auto',
                      padding: '12px 20px',
                      borderColor: '#E3E8EF',
                      borderRadius: '12px',

                      'fieldset.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #E3E8EF !important',
                      },
                    }}
                    fullWidth
                    multiline
                    minRows="5"
                    placeholder="Enter description here"
                    value={values.aboutDescription}
                    onChange={(e) =>
                      setFieldValue('aboutDescription', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="profileImageURL"
                    label="Profile Image URL"
                    placeholder="Enter profile image url here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="cvURL"
                    label="CV URL"
                    placeholder="Enter cv url here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="name"
                    label="Name"
                    placeholder="Enter name here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="dateOfBirth"
                    label="Date Of Birth"
                    placeholder="Enter date of birth here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="address"
                    label="Address"
                    placeholder="Enter address here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="phone"
                    label="Phone"
                    placeholder="Enter phone number here"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="email"
                    label="Email"
                    placeholder="Enter email here"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <ServicesSelection />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <StyledLabelContainer>
                    <StyledLabel disabled={false}>
                      About Modal Description
                    </StyledLabel>
                  </StyledLabelContainer>
                  <OutlinedInput
                    sx={{
                      fontWeight: '400',
                      fontSize: '16px',
                      textAlign: 'center',
                      height: 'auto',
                      padding: '12px 20px',
                      borderColor: '#E3E8EF',
                      borderRadius: '12px',

                      'fieldset.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #E3E8EF !important',
                      },
                    }}
                    fullWidth
                    multiline
                    minRows="5"
                    placeholder="Enter description here"
                    value={values.aboutModalDescription}
                    onChange={(e) =>
                      setFieldValue('aboutModalDescription', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <ProgrammingSkills />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <LanguageSkills />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Education />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Work />
                </Grid>
              </Grid>
              <Box
                gap={2}
                mt={4}
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                  },
                })}
              >
                <StyledButton
                  type="button"
                  buttonText="Go Back"
                  outlined
                  onClick={() => navigate(ROUTE_CONFIG, { replace: true })}
                />
                {configId && (
                  <StyledButton
                    type="button"
                    isError
                    buttonText="Set as Active"
                    onClick={onClickSetActive}
                  />
                )}
                <StyledButton
                  type="submit"
                  buttonText="Save"
                  disabled={!dirty || !isValid}
                  isLoading={false}
                />
              </Box>
            </StyledForm>
          )}
        </Formik>
      </PageWrapper>
    </>
  );
}
