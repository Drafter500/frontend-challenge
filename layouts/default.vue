<template>
  <AwesomeHeader />
  <div class="wrapper">
    <AwesomeNavbar />
    <main>
      <slot />
    </main>
    <AwesomeSidebar />
  </div>
  <AwesomeFooter />
</template>

<style scoped>
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    column-gap: 1rem;
  }
</style>
