<script lang="ts">
  import { page } from '$app/stores'

  export let data

  let allConferences =
    data.leagues && data.leagues.flatMap((l) => l.conferences)
  let categories = allConferences && allConferences.splice(0, 2)
</script>

{#if allConferences && categories}
  <div class="flex flex-col items-center w-full gap-4 mt-8">
    <div class="space-x-4">
      {#each categories as category}
        <a
          class="whitespace-nowrap snap-start"
          class:selected={$page.params.conference === category}
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
          class="z-0 px-4 whitespace-nowrap snap-start"
          class:selected={$page.params.conference === conference}
          href="/{$page.params.sport}/{conference.trim()}"
        >
          {conference}
        </a>
      {/each}
    </div>
  </div>
{/if}

<slot />

<style>
  .selected {
    font-weight: theme('fontWeight.bold');
  }
</style>
