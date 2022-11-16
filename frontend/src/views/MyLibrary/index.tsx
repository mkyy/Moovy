import axios from 'axios';
import { useEffect } from 'react';

const MyLibrary = () => {
  const MoovyApi = axios.create({
    baseURL: process.env.REACT_APP_MOOVY_API
  });

  useEffect(() => {
    MoovyApi.get('api/movies').then((snapshot) => {
      console.log(snapshot.data);
    });
  }, []);

  return <p>hello world</p>;
};
export default MyLibrary;
