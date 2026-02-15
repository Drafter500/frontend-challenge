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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  main {
    /* not 60% to accommodate for gap */
    flex-basis: 55%;
    flex-grow: 1;
  }

</style>
