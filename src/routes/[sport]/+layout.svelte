<script lang="ts">
  import { page } from '$app/stores'

  export let data

  let allConferences = data.leagues.flatMap((l) => l.conferences)
  let categories = allConferences.splice(0, 2)
</script>

<nav class="flex items-center justify-center gap-4 px-4">
  <a href="/ncaaf">NCAA Football</a>
  <a href="/ncaab">NCAA Basketball</a>
</nav>
<div class="flex flex-col items-center w-full gap-12 mt-8">
  <div class="space-x-4">
    {#each categories as category}
      <a
        class="whitespace-nowrap snap-start"
        href="/{$page.params.sport}/{category.trim()}"
      >
        {category}
      </a>
    {/each}
  </div>
  <div
    class="relative flex w-screen py-4 overflow-x-auto snap-x snap-mandatory"
  >
    {#each allConferences as conference}
      <a
        class="z-0 px-8 whitespace-nowrap snap-start"
        class:selected={$page.params.conference === conference}
        href="/{$page.params.sport}/{conference.trim()}"
      >
        {conference}
      </a>
    {/each}
  </div>
</div>
<slot />

<style>
  .selected {
    font-weight: theme('fontWeight.bold');
  }
</style>
