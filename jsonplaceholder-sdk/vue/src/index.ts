import { ref } from "vue";
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
  const users = ref<Array<JsonPlaceholderUser>>([]);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const abortController = ref(new AbortController());

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    abortController.value = new AbortController();

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        signal: abortController.value.signal
      });
      const json = await response.json();
      const validatedUsers = usersSchema.parse(json);
      users.value = validatedUsers;
    } catch (issue) {
      if (issue instanceof Error) {
        error.value = issue;
      } else {
        error.value = new Error(String(issue));
      }
    } finally {
      loading.value = false;
    }
  };

  const abortFetchUsers = () => {
    abortController.value.abort();
  };

  return {
    users,
    error,
    loading,
    fetchUsers,
    abortFetchUsers
  };
}
