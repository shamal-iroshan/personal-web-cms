/* eslint-disable import/no-cycle */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import errorToast from '../../../common/toast/errorToast';
import successToast from '../../../common/toast/successToast';
import { Post } from '../types';
import { postActions } from '../slice/postSlice';
import { db } from '../../../config/firebase';
import { FirebaseCollections } from '../../../utils/constants';

async function callApi(data: Post) {
  const { id, category, author, content, ...postData } = data;

  let newContentRef;
  let categoryRef;
  let authorRef;

  // Fetch the existing post to check if content reference exists
  const postRef = doc(db, FirebaseCollections.POSTS, id || '');
  const postSnapshot = await getDoc(postRef);

  if (!postSnapshot.exists()) {
    throw new Error('Post not found');
  }

  const existingPostData = postSnapshot.data();

  // Update content document if content is provided
  if (content) {
    // Check if the post already has a content reference
    const contentRef = existingPostData.content;

    if (contentRef) {
      // Update the existing content document
      const contentDocRef = doc(
        db,
        FirebaseCollections.POST_CONTENTS,
        contentRef.id,
      );
      await updateDoc(contentDocRef, { content });
    } else {
      // If no content reference exists, create a new content document
      newContentRef = await addDoc(
        collection(db, FirebaseCollections.POST_CONTENTS),
        { content },
      );
    }
  }

  // Update category and author references if they are provided
  if (category) {
    categoryRef = doc(db, FirebaseCollections.CATEGORIES, category);
  }

  if (author) {
    authorRef = doc(db, FirebaseCollections.AUTHORS, author);
  }

  // Update the post document
  await updateDoc(postRef, {
    ...postData,
    content: newContentRef || existingPostData.content,
    category: categoryRef || existingPostData.category,
    author: authorRef || existingPostData.author,
  });
}

export default function* callUpdatePostSaga({ payload }: PayloadAction<Post>) {
  try {
    yield call(callApi, payload);
    successToast('Success', 'You have successfully updated.');
    yield put(postActions.updatePostSuccess());
    yield put(postActions.getPost(payload.id || ''));
  } catch (error) {
    console.error('callUpdatePostSaga', error);
    errorToast('Oops', 'Something went wrong please try again later.');
    yield put(postActions.updatePostError('error'));
  }
}
