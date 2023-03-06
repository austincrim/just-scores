<script lang="ts">
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'

  export let data: LayoutData

  let allConferences = data.leagues.flatMap((l) => l.conferences)
  let categories = allConferences.splice(0, 2)
</script>

<div class="w-full flex flex-col items-center md:flex-row md:items-start">
  <div class="flex gap-16 relative px-12">
    {#each [categories, allConferences] as filter, i}
      <div
        class="flex flex-col gap-3 py-4 h-48 md:h-[70vh] overflow-y-auto px-3 rounded-md"
        class:border={i === 1}
        class:shadow-sm={i === 1}
      >
        {#each filter as conference}
          <a
            data-sveltekit-preload-data
            class:selected={$page.params.conference === conference}
            href="/{conference.trim()}"
          >
            {conference}
          </a>
        {/each}
      </div>
      {#if i === 1}
        <div class="h-4 absolute -top-2 right-0 w-1/2 bg-gray-50 blur-sm" />
        <div class="h-4 absolute -bottom-2 right-0 w-1/2 bg-gray-50 blur-sm" />
      {/if}
    {/each}
  </div>
  <slot />
</div>

<style>
  .selected {
    font-weight: theme('fontWeight.bold');
  }
</style>
