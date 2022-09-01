import { IFileUploadApiResponse, FILE_UPLOAD_API_URL } from '../';
import { environment } from '@muzzy/shared/environments';

export const fileUpload = (file: File): Promise<IFileUploadApiResponse> => {
  return fetch(environment.api.hostport + FILE_UPLOAD_API_URL, {
    // Your POST endpoint
    method: 'POST',
    body: file, // This is your file object
  })
    .then(
      (response) => response.json() // if the response is a JSON object
    )
    .catch(
      (error) => console.log(error) // Handle the error response object
    );
};
