const API_BASE_URL =
  'https://bowtie-fe-assignment-api.onrender.com';

const API_KEY = '769e4a7f-0cbc-46a2-b729-4afb20f55c98';

interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const {
    params,
    headers,
    ...requestOptions
  } = options;

  const url = new URL(
    `${API_BASE_URL}${endpoint}`,
  );

  if (params) {
    Object.entries(params).forEach(
      ([key, value]) => {
        url.searchParams.set(key, value);
      },
    );
  }

  const response = await fetch(url.toString(), {
    ...requestOptions,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`,
    );
  }

  return response.json();
}