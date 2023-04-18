<template>
  <h1>Users</h1>
  <div v-if="loading">
    <h2>Loading, please wait...</h2>
    <button @click="abortFetchUsers">Abort</button>
  </div>
  <div v-else-if="error">
    <h2>Error</h2>
    <p>Error: {{ error.message }}</p>
    <button @click="fetchUsers">Retry</button>
  </div>
  <div v-else>
    <button @click="fetchUsers">Refresh</button>
    <table>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useJsonPlaceholderUsers } from "@jsonplaceholder-sdk/vue";

const { users, fetchUsers, abortFetchUsers, error, loading } = useJsonPlaceholderUsers();

onMounted(fetchUsers);
</script>
