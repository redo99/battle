const API_URL = 'http://localhost:8080/api/';

// eslint-disable-next-line import/prefer-default-export
export const sFetch = async endpoint => {
  const url = API_URL + endpoint;
  const headers = new Headers();
  headers.set('Accept', 'application/json');

  const resp = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!resp.ok) {
    console.error(`Error fetching ${url}`);
  }
  const response = await resp.json();
  return response;
};
