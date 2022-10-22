import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik } from 'formik';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { Portfolio } from '../types';
import LoadingContainer from '../../../common/LoadingContainer';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_PORTFOLIO } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import { StyledForm } from '../../../common/StyledBasicComponents';
import TextInputField from '../../../common/TextInputField';
import StyledButton from '../../../common/StyledButton';

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

export default function AddPortfolio() {
  const { portfolioId } = useParams();
  const [tempData, setTempData] = useState<Portfolio>();
  const isLoading = false;
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  useEffect(() => {
    if (portfolioId) {
      setTempData({
        id: '1',
        title: 'Arduino code camp',
        description:
          'Certificate for completing the Arduino code camp held by myhub.lk',
        imageUrl:
          'https://document.shamaliroshan.com/CODECAMP2106_1625492207866_shamal%20iroshan.jpeg',
        link: 'https://document.shamaliroshan.com/CODECAMP2106_1625492207866_shamal%20iroshan.jpeg',
        order: 4,
      });
    }
  }, [portfolioId]);

  const initialValues: Portfolio = {
    id: tempData?.id || '',
    title: tempData?.title || '',
    description: tempData?.description || '',
    imageUrl: tempData?.imageUrl || '',
    link: tempData?.link || '',
    order: tempData?.order || 0,
  };

  const onSubmit = (values: Portfolio) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    imageUrl: Yup.string().required('Image is required'),
    link: Yup.string().required('Link is required'),
    order: Yup.number().min(1).required('Order is required'),
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <PageTitle
        title={tempData?.title || ''}
        titleIcon={
          <ArrowBackIcon fontSize={isSmallScreen ? 'medium' : 'large'} />
        }
        titleIconAction={() => navigate(ROUTE_PORTFOLIO, { replace: true })}
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
                    name="title"
                    label="Title"
                    placeholder="Enter title here"
                    required
                    markAsRequired
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="link"
                    label="Link"
                    placeholder="Enter link here"
                    required
                    markAsRequired
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="imageUrl"
                    label="Image URL"
                    placeholder="Enter image URL here"
                    required
                    markAsRequired
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  {values.imageUrl && (
                    <img
                      width={200}
                      height={100}
                      src={values.imageUrl}
                      alt="portfolio"
                    />
                  )}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="order"
                    label="Order"
                    placeholder="Enter order here"
                    type="number"
                    required
                    markAsRequired
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <StyledLabelContainer>
                    <StyledLabel disabled={false}>
                      Portfolio Description
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
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue('description', e.target.value)
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
                  onClick={() => navigate(ROUTE_PORTFOLIO, { replace: true })}
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
