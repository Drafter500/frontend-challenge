<template>
  <AwesomeSection>
    <details>
      <summary title="Click to view the challenge description">
        <strong>
          <a href="https://github.com/reteach/frontend-challenge/tree/main"
            >README</a
          >
        </strong>
      </summary>
      <ChallengeDescription />
    </details>

    <div class="avatar-wrapper">
      <img
        class="avatar"
        src="/img.png"
        alt="User avatar"
      />
    </div>
  </AwesomeSection>
  <UsersList />
</template>

<style scoped>
  .avatar-wrapper {
    width: 100%;
  }

  .avatar {
    max-width: 100%;
    max-height: 300px;
  }
</style>
<script setup lang="ts">
</script>
