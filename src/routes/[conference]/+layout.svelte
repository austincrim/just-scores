<script lang="ts">
  import { page } from '$app/stores'
  import type { LayoutData } from './$types'

  export let data: LayoutData

  let allConferences = data.leagues.flatMap((l) => l.conferences)
  let categories = allConferences.splice(0, 2)
</script>

<div class="flex gap-16 relative">
  {#each [categories, allConferences] as filter, i}
    <div class="flex flex-col gap-3 py-4 h-36 overflow-y-auto">
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

<style>
  .selected {
    font-weight: theme('fontWeight.bold');
  }
</style>
