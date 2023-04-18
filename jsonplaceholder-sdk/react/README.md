# @jsonplaceholder-sdk/react

## Usage

### useJsonPlaceholderUsers

```bash
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";
```

### users

```tsx
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";

const Main = () => {
  const { users } = useJsonPlaceholderUsers();

  return (
    <table>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.username}</td>
          </tr>
        ))} 
      </tbody>
    </table>
  );
};
```

### error

```tsx
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";

const Main = () => {
  const { error } = useJsonPlaceholderUsers();

  if (error) {
    return (
      <p>Error: {error.message}</p>
    );
  }

  return null;
};
```

### loading

```tsx
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";

const Main = () => {
  const { loading } = useJsonPlaceholderUsers();

  if (loading) {
    return (
      <p>Loading, please wait...</p>
    );
  }

  return null;
};
```

### fetchUsers

```tsx
import { useEffect } from "react";
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";

const Main = () => {
  const { fetchUsers } = useJsonPlaceholderUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return null;
};
```

### abortFetchUsers

```tsx
import { useEffect } from "react";
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";

const Main = () => {
  const { fetchUsers, abortFetchUsers, loading } = useJsonPlaceholderUsers();

  useEffect(() => {
    fetchUsers();

    return () => {
      abortFetchUsers();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading, please wait...</p>
        <button onClick={abortFetchUsers}>Abort</button>
      </div>
    );
  }

  return null;
};
```
