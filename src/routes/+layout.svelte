<script lang="ts">
  import '../app.css'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<main class="flex flex-col items-center justify-center mx-auto gap-4 mt-8">
  <select
    class="max-w-min bg-gray-200 p-2 rounded-lg border border-gray-500 shadow-sm"
    on:input={(e) => goto(`/${e.target.value}`)}
  >
    {#each data.leagues as league}
      <optgroup label={league.name}>
        {#each league.conferences as conference}
          <option selected={conference === $page.params.conference}
            >{conference}</option
          >
        {/each}
      </optgroup>
    {/each}
  </select>
  <slot />
</main>
