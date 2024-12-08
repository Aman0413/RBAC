import axios from 'axios';
import toast from 'react-hot-toast';

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    const errorMessage = error.response?.data.message || 'Something went wrong';
    toast.error(errorMessage);
    console.error('Axios Error:', error.response?.data);
  } else {
    // Handle non-Axios errors
    toast.error('An unexpected error occurred');
    console.error('Unexpected Error:', error);
  }
};
