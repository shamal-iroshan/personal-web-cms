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
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import supersub from 'remark-supersub';
import remarkTextr from 'remark-textr';
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
import { selectIdToken } from '../../signIn/slice/signInSlice';
import SelectField from '../../../common/SelectField';
import AddCategoryModal from '../../../common/AddCategoryModal';
import AddAuthorModal from '../../../common/AddAuthorModal';
import CheckBoxField from '../../../common/CheckBoxField';

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

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] =
    React.useState(false);
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = React.useState(false);

  const categories = useAppSelector(
    (state: RootState) => state.postReducer.allCategories,
  );
  const authors = useAppSelector(
    (state: RootState) => state.postReducer.allAuthors,
  );
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
  const idToken = useAppSelector(selectIdToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  // Transform ASCII characters to HTML entities
  const asciiTransformer = (input: string) => {
    const ellipsisReplaced: string = input.replace(/\.\.\./g, '…');
    const emDashReplaced: string = ellipsisReplaced.replace(/---/g, '—');
    const curlyQuotesReplaced: string = emDashReplaced.replace(
      /"([^"]*)"/g,
      '“$1”',
    );
    return curlyQuotesReplaced;
  };

  useEffect(() => {
    dispatch(postActions.getAllCategories());
    dispatch(postActions.getAllAuthors());
  }, [dispatch]);

  useEffect(() => {
    if (postId && idToken) {
      dispatch(postActions.getPost(postId));
    }
  }, [dispatch, idToken, postId]);

  const processCategories = categories.map((category) => ({
    value: category.id || '',
    label: category.name,
  }));

  const processAuthors = authors.map((author) => ({
    value: author.id || '',
    label: author.name,
  }));

  const initialValues: Post = {
    title: post?.title || '',
    published: post?.published || false,
    description: post?.description || '',
    content: post?.content || '',
    category: post?.category || '',
    image: post?.image || '',
    readTime: post?.readTime || '',
    date: post?.date || '',
    slug: post?.slug || '',
    author: post?.author || '',
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
      dispatch(postActions.addPost(values));
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    published: Yup.boolean().required('Published is required'),
    description: Yup.string().notRequired(),
    content: Yup.string().required('Content is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string().required('Image is required'),
    readTime: Yup.string().required('Read time is required'),
    date: Yup.string().required('Date is required'),
    slug: Yup.string().required('Slug is required'),
    author: Yup.string().required('Author is required'),
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
                <Grid item xs={12} lg={6}>
                  <StyledLabelContainer>
                    <StyledLabel disabled={false}>Published</StyledLabel>
                  </StyledLabelContainer>
                  <CheckBoxField
                    text="Published"
                    setChecked={() => {
                      setFieldValue('published', !values.published);
                    }}
                    checked={values.published}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container alignItems="end" columnSpacing={2}>
                    <Grid item xs={12} lg={6}>
                      <SelectField
                        name="category"
                        label="Category"
                        placeholder="Select category here"
                        options={processCategories}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledButton
                        buttonText="Add category"
                        outlined
                        onClick={() => setIsAddCategoryModalOpen(true)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="image"
                    label="Image Link"
                    placeholder="Enter image link here"
                    required
                    markAsRequired
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="readTime"
                    label="Read time"
                    placeholder="Enter read time here"
                    required
                    markAsRequired
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid item xs={12} lg={6}>
                    <TextInputField
                      name="date"
                      label="Date"
                      placeholder="Select date here"
                      required
                      markAsRequired
                      type="date"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Grid container alignItems="end" columnSpacing={2}>
                    <Grid item xs={12} lg={6}>
                      <SelectField
                        name="author"
                        label="Author"
                        placeholder="Select author here"
                        options={processAuthors}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledButton
                        buttonText="Add author"
                        outlined
                        onClick={() => setIsAddAuthorModalOpen(true)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextInputField
                    name="slug"
                    label="Slug"
                    placeholder="Enter slug here"
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
                      <ReactMarkdown
                        remarkPlugins={[
                          [remarkGfm, { singleTilde: false }],
                          remarkMath,
                          supersub,
                          [remarkTextr, { plugins: [asciiTransformer] }],
                        ]}
                        rehypePlugins={[
                          rehypeKatex,
                          rehypeRaw,
                          rehypeHighlight,
                        ]}
                      >
                        {values.content}
                      </ReactMarkdown>
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

      <AddCategoryModal
        open={isAddCategoryModalOpen}
        handleClose={() => setIsAddCategoryModalOpen(false)}
      />

      <AddAuthorModal
        open={isAddAuthorModalOpen}
        handleClose={() => setIsAddAuthorModalOpen(false)}
      />
    </>
  );
}
