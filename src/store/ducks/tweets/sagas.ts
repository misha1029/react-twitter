import { call, put, takeLatest } from 'redux-saga/effects';
import { TweetsApi } from '../../../services/api/tweetsApi';
import { LoadingStatus } from '../../types';
import { addTweet, removeTweet, setAddFormState, setTweets, setTweetsLoadingStatus } from './actionCreators';
import { FetchAddTweetActionInterface, RemoveTweetActionInterface, TweetsActionsType } from './contracts/actionTypes';
import { AddFormState } from './contracts/state';

export function* fetchTweetsRequest(): any {
  try {
    
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items));
  } catch (error) {
    yield put(setTweetsLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* fetchAddTweetRequest({ payload}: FetchAddTweetActionInterface): any{
  try {
    const item = yield call(TweetsApi.addTweet, payload);
    yield put(addTweet(item));
  } catch (error) {
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

export function* fetchRemoveTweetRequrest({ payload}: RemoveTweetActionInterface): any{
  try {
    yield call(TweetsApi.removeTweet, payload);
  } catch (error) {
    alert('Error')
  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  yield takeLatest(TweetsActionsType.REMOVE_TWEET, fetchRemoveTweetRequrest);
}

 