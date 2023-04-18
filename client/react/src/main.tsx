import { Fragment, useEffect } from "react";
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/react";

export const Main = () => {
  const { users, loading, error, abortFetchusers, fetchUsers } = useJsonPlaceholderUsers();

  useEffect(() => {
    fetchUsers();

    return () => {
      abortFetchusers();
    };
  }, []);

  if (loading) {
    return (
      <Fragment>
        <h1>App</h1>
        <p>Loading...</p>
        <button onClick={abortFetchusers}>Abort</button>
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <h1>App</h1>
        <p>Error: {error.message}</p>
        <button onClick={fetchUsers}>Retry</button>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1>App</h1>
      <button onClick={fetchUsers}>Refresh</button>
      <table>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
