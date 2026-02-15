<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <div class="controls-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search todo..."
        class="search-input"
      />

      <div>
        Status:
        <label v-for="option in completenessFilterOptions" :key="option.value">
          <input
            type="radio"
            name="todoFilter"
            :value="option.value"
            v-model="completenessFilter"
          />
          {{ option.label }}
        </label>
      </div>
    </div>

    <div v-if="pending" class="loading">Loading...</div>

    <ul v-else>
      <li v-for="todo in todos" :key="todo.id">
        <h4>{{ todo.title }}</h4>
        <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
      </li>
    </ul>

    <p v-if="!pending && todos?.length === 0">
      No results found.
    </p>
  </AwesomeArticle>
</template>

<script setup>
const route = useRoute();

const completenessFilterOptions = [
  {label: 'All', value: null},
  {label: 'Completed', value: true},
  {label: 'Pending', value: false}
];

const completenessFilter = useState('completenessStatus', () => true);
// TODO: Way to improve: add search debounce
const searchQuery = ref('');

const { data: todos, pending } = useFetch(() => `/users/${route.params.id}/todos`, {
  baseURL: 'https://jsonplaceholder.typicode.com',
  query: computed(() => ({
    completed: completenessFilter.value ?? undefined,
    q: searchQuery.value,
  })),
});
</script>

<style scoped>
  .controls-bar {
    display: flex;
    justify-content: space-between;
  }

  .loading {
    margin-top: 1rem;
  }
</style>
