import axios from 'axios';
import { Tweet, TweetsState } from '../../store/ducks/tweets/contracts/state';

export const TweetsApi = {
  fetchTweets(): Promise<TweetsState['items']> {
    return axios.get('http://localhost:3000/items').then(({ data }) => data);
  },
  fetchTweetData(id: string): Promise<Tweet[]> {
    return axios.get('/items?_id=' + id).then(({ data }) => data);
  },
};
