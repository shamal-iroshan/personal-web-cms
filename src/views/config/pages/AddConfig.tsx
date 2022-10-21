import React, { useEffect, useState } from 'react';
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
  const [tempData, setTempData] = useState<Config>();
  const isLoading = false;
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  useEffect(() => {
    if (configId) {
      setTempData({
        id: '123343',
        website: 'f',
        views: 0,
        underMaintenance: true,
        homeTitle: 'fdf',
        animatedText: ['fdf'],
        aboutTitle: 'fdf',
        aboutDescription: '1111',
        name: '11111',
        dateOfBirth: '1111',
        address: 'dfd',
        phone: 'dd',
        email: 'dfd',
        aboutModalDescription: 'fgf',
        services: ['fdf'],
        programmingSkills: [
          {
            name: 'dfdf',
            value: 0,
          },
        ],
        languageSkills: [
          {
            name: 'dfdfdfd',
            value: 0,
          },
        ],
      });
    }
  }, [configId]);

  const initialValues: Config = {
    id: tempData?.id || '',
    website: tempData?.website || '',
    views: tempData?.views || 0,
    underMaintenance: tempData?.underMaintenance || false,
    homeTitle: tempData?.homeTitle || '',
    animatedText: tempData?.animatedText || [],
    aboutTitle: tempData?.aboutTitle || '',
    aboutDescription: tempData?.aboutDescription || '',
    name: tempData?.name || '',
    dateOfBirth: tempData?.dateOfBirth || '',
    address: tempData?.address || '',
    phone: tempData?.phone || '',
    email: tempData?.email || '',
    aboutModalDescription: tempData?.aboutModalDescription || '',
    services: tempData?.services || [],
    programmingSkills: tempData?.programmingSkills || [],
    languageSkills: tempData?.languageSkills || [],
  };

  const onSubmit = (values: Config) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    website: Yup.string().required('Website is required'),
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <PageTitle
        title={tempData?.website || ''}
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
                  <TextInputField
                    name="website"
                    label="Website"
                    placeholder="Enter website here"
                    required
                    markAsRequired
                  />
                </Grid>
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
                    name="views"
                    label="Views"
                    placeholder="Enter views here"
                    type="number"
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
              </Grid>
              <Box
                gap={2}
                mt={4}
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
              >
                <StyledButton
                  buttonText="Go Back"
                  onClick={() => navigate(ROUTE_CONFIG, { replace: true })}
                />
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
