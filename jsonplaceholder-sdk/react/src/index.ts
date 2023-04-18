import { useState, useCallback } from "react";
import { z } from "zod";

export interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const usersSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string()
    })
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string()
  })
}));

export const useJsonPlaceholderUsers = () => {
  const [users, setUsers] = useState<Array<JsonPlaceholderUser>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());

  const abortFetchusers = useCallback(() => {
    abortController.abort();
  }, [abortController]);

  const fetchUsers = useCallback(() => {
    const fetchUsersAbortController = new AbortController();

    setError(null);
    setLoading(true);
    setAbortController(fetchUsersAbortController);

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: fetchUsersAbortController.signal
    }).then(response => {
      if (!response.ok) {
        throw new Error("Bad response from the server");
      }

      return response.json()
    }).then(json => {
      const users = usersSchema.parse(json);
      setUsers(users);
    }).catch(error => {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(String(error)));
      }
    }).finally(() => {
      setLoading(false);
    })
  }, []);

  return {
    users,
    error,
    loading,
    fetchUsers,
    abortFetchusers,
  };
};
