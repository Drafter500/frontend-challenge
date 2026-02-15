<template>
  <div>
    <h2>Gallery</h2>
    <div v-if="pending">Loading…</div>
    <div v-else-if="error">Error loading images: {{ error.message }}</div>
    <div v-else>
      <div
        v-if="Object.keys(sortByUser).length !== 0"
        v-for="(userGallery, index) in Object.values(sortByUser)"
        :key="index"
        data-testid="galery-user-section"
      >
        <hr v-if="index !== 0" />
        <h2>{{ userGallery.name }}</h2>
        <p>Albums: {{ userGallery.albums.length }}</p>
        <p>Posts: {{ userGallery.posts.length }}</p>
        <p>Comments: {{ userGallery.comments.length }}</p>
        <div class="gallery">
          <template v-for="img in userGallery.photos" :key="img.id">
            <img :src="img.picture" :alt="img.title" class="photo" loading="lazy" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  data: images,
  pending,
  error,
} = await useFetch('/api/gallery', { lazy: true });

const users = ref([]);
onMounted(async () => {
  users.value = await fetch('https://jsonplaceholder.typicode.com/users').then(
    (res) => res.json()
  );

  await loadUserStatistics();
});

const sortByUser = computed(() => {
  if (!images.value || !users.value.length) {
    return {};
  }

  const usersMap = new Map(users.value.map((u) => [u.id, u]));

  return images.value.reduce((acc, img) => {
    const user = usersMap.get(img.userId);
    if (!user) {
      return acc;
    }
    if (!acc[img.userId]) {
      acc[img.userId] = {
        name: img.userName,
        photos: [],
        albums: user.albums || [],
        posts: user.posts || [],
        comments: user.comments || [],
      };
    }
    acc[img.userId].photos.push(img);
    return acc;
  }, {});
});

/**
 * Load specific user statistics
 */
async function loadUserStatistics() {
  for (const user of users.value) {
    (user.albums = []), (user.posts = []), (user.comments = []);

    // Fetch user Albums
    $fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
      .then((albums) => user.albums.push(...albums));

    // Fetch user Posts
    $fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
      .then((posts) => user.posts.push(...posts));

    // Fetch user Comments
    $fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/comments`)
      .then((comments) => user.comments.push(...comments));
  }
}

if (error.value) {
  console.error('Failed to load images:', error.value);
}

// Suggestions to improve performance:
// 1. Use imp lazy loading (done)
// 2. Enable parallel requests execution (already removed await)
// Wrap in the loop in Promise.all for better structure.
// 3. This component does too much in regards to data aggregation and
// transformation. It belongs to BFF. The component should ideally call
// one fetch (could be done during SSR phase) that returns ready to display
// data. Thus less requests made from frontend, less CPU spent on transformation
// 4. Related to previous point: do not transfer not used data, in this page we
// only show the posts, comments, albums count, we do not need to transfer the
// full objects. Less payload sent, better performance.
// 5. Overall page structure looks weird, too much content. Maybe we can split
// the page by users, or show only first 5-8 images per user and the rest could
// be loaded in demand ("load more photos" button).
// 6. Got rid of users.value.find inside images.value.reduce. Is was like
// double loop, on large dataset could be slow. I consider it as a minor
// improvement
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1svw;
}
.img-gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.photo {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
