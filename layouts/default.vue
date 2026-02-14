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
    gap: 1rem;

    @media (width < 960px) {
      grid-template-columns: 1fr 3fr;

      :nth-child(3) {
        grid-column: span 2;
      }
    }

    @media (width < 720px) {
      grid-template-columns: 1fr;

      :nth-child(3) {
        grid-column: span 1;
      }
    }
  }

</style>
