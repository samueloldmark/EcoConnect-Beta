import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

if (!response.ok) {
  setIsLoading(false);
  setError(json && json.error ? json.error : 'Something went wrong');
  return;
}

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({ type: 'LOGIN', payload: { ...json, _id: json._id } })

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
