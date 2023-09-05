<script lang="ts">
  import { page } from '$app/stores'

  export let data

  let allConferences = data.leagues.flatMap((l) => l.conferences)
  let categories = allConferences.splice(0, 2)
</script>

<div class="w-full flex flex-col items-center gap-16">
  <div class="flex flex-col items-center w-full gap-12">
    {#each [categories, allConferences] as filter, i}
      <div
        class="flex flex-col relative gap-3 overflow-y-auto px-3 rounded-md"
        class:border={i === 1}
        class:shadow-sm={i === 1}
        class:h-48={i === 1}
      >
        {#each filter as conference}
          <a
            class:selected={$page.params.conference === conference}
            href="/{$page.params.sport}/{conference.trim()}"
          >
            {conference}
          </a>
        {/each}
      </div>
    {/each}
  </div>
  <slot />
</div>

<style>
  .selected {
    font-weight: theme('fontWeight.bold');
  }
</style>
