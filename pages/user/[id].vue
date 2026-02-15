<template>
  <AwesomeArticle>
    <h1>User Todo's</h1>
    <div class="filter-group">
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

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <h4>{{ todo.title }}</h4>
        <p>Status: {{ todo.completed ? 'Completed' : 'Pending' }}</p>
      </li>
    </ul>
  </AwesomeArticle>
</template>

<script setup>
const route = useRoute();

const completenessFilterOptions = [
  {label: 'All', value: null},
  {label: 'Completed', value: true},
  {label: 'Pending', value: false}
];

const completenessFilter = useState('completenessStatus', () => null);

const { data: todos } = useFetch(() => `/users/${route.params.id}/todos`, {
  baseURL: 'https://jsonplaceholder.typicode.com',
  query: computed(() => ({
    completed: completenessFilter.value ?? undefined,
  })),
});
</script>
