/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { getDoc, doc } from 'firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types';
import errorToast from '../../../common/toast/errorToast';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

interface Content {
  content: string;
}

async function callApi(postId: string) {
  const docSnap = await getDoc(doc(db, FirebaseCollections.POSTS, postId));

  if (docSnap.exists()) {
    const post = docSnap.data();
    const authorRef = post.author;
    const categoryRef = post.category;
    const contentRef = post.content;

    const authorSnap = await getDoc(authorRef);
    const categorySnap = await getDoc(categoryRef);
    const contentSnap = await getDoc(contentRef);

    const authorId = authorSnap.id;
    const categoryId = categorySnap.id;

    const content = contentSnap.data() as Content;

    return {
      ...post,
      author: authorId,
      category: categoryId,
      content: content.content,
    };
  }
  return null;
}

export default function* callGetPostSaga({ payload }: PayloadAction<string>) {
  try {
    const post: Post = yield call(callApi, payload);
    yield put(postActions.getPostSuccess(post));
  } catch (error) {
    console.error('callGetPostSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.getPostError('error'));
  }
}
