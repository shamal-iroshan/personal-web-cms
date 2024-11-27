import React, { useEffect } from 'react';
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
import SimpleMDE from 'react-simplemde-editor';
import ReactMarkdown from 'react-markdown';
import { Post } from '../types';
import LoadingContainer from '../../../common/LoadingContainer';
import PageTitle from '../../../common/PageTitle';
import { ROUTE_POST } from '../../../common/routes';
import PageWrapper from '../../../common/PageWrapper';
import { StyledForm } from '../../../common/StyledBasicComponents';
import TextInputField from '../../../common/TextInputField';
import StyledButton from '../../../common/StyledButton';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../store/types';
import { postActions } from '../slice/postSlice';
import 'easymde/dist/easymde.min.css';

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

const MarkdownContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5px;

  & .preview-container {
    width: 50%;
    border-left: 1px solid #e3e8ef;
    padding-left: 5px;
  }

  & .editor-container {
    width: 50%;
  }

  .editor-toolbar.fullscreen {
    z-index: 9999;
  }

  .CodeMirror.cm-s-easymde.CodeMirror-wrap.CodeMirror-fullscreen {
    z-index: 9999;
  }

  .editor-preview-side.editor-preview.editor-preview-active-side {
    z-index: 9999;
  }
`;

export default function AddPost() {
  const { postId } = useParams();

  const addPostIsLoading = useAppSelector(
    (state: RootState) => state.postReducer.addPostIsLoading,
  );
  const updatePostIsLoading = useAppSelector(
    (state: RootState) => state.postReducer.updatePostIsLoading,
  );
  const getPostIsLoading = useAppSelector(
    (state: RootState) => state.postReducer.getPostIsLoading,
  );
  const post = useAppSelector((state: RootState) => state.postReducer.post);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  useEffect(() => {
    if (postId) {
      // eslint-disable-next-line no-console
      console.log('postId', postId);
      dispatch(postActions.getPost(postId));
      // setTempData({
      //   id: '1',
      //   title: 'Arduino code camp',
      //   description:
      //     'Certificate for completing the Arduino code camp held by myhub.lk',
      //   imageUrl:
      //     'https://document.shamaliroshan.com/CODECAMP2106_1625492207866_shamal%20iroshan.jpeg',
      //   link: 'https://document.shamaliroshan.com/CODECAMP2106_1625492207866_shamal%20iroshan.jpeg',
      //   order: 4,
      // });
    }
  }, [dispatch, postId]);

  const initialValues: Post = {
    title: post?.title || '',
    description: post?.description || '',
    content: post?.content || '',
  };

  const onSubmit = (values: Post) => {
    if (postId) {
      dispatch(
        postActions.updatePost({
          ...values,
          id: postId,
        }),
      );
    } else {
      console.log('values', values);
      dispatch(postActions.addPost(values));
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().notRequired(),
    content: Yup.string().required('Content is required'),
  });

  if (addPostIsLoading || updatePostIsLoading || getPostIsLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <PageTitle
        title={post?.title || ''}
        titleIcon={
          <ArrowBackIcon fontSize={isSmallScreen ? 'medium' : 'large'} />
        }
        titleIconAction={() => navigate(ROUTE_POST, { replace: true })}
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
                <Grid item xs={12} lg={12}>
                  <StyledLabelContainer>
                    <StyledLabel disabled={false}>Post Description</StyledLabel>
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
                <Grid item xs={12} lg={12}>
                  <MarkdownContainer>
                    <div className="editor-container">
                      <SimpleMDE
                        value={values.content}
                        onChange={(value) => setFieldValue('content', value)}
                        options={{
                          toolbar: [
                            'bold',
                            'italic',
                            'heading',
                            'heading-smaller',
                            'heading-bigger',
                            '|',
                            'code',
                            'quote',
                            'unordered-list',
                            'ordered-list',
                            'link',
                            'table',
                            'horizontal-rule',
                            '|',
                            'link',
                            'image',
                            '|',
                            'clean-block',
                            '|',
                            'guide',
                          ],
                        }}
                      />
                    </div>
                    <div className="preview-container">
                      <ReactMarkdown>{values.content}</ReactMarkdown>
                    </div>
                  </MarkdownContainer>
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
                  outlined
                  onClick={() => navigate(ROUTE_POST, { replace: true })}
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
