<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<select
  class="max-w-min p-2 rounded-lg border border-gray-600 shadow-sm"
  on:input={(e) => goto(`/${e.target.value}`)}
>
  {#each data.leagues as league}
    <optgroup label={league.name}>
      {#each league.conferences as conference}
        <option selected={conference === $page.params.conference}>
          {conference}
        </option>
      {/each}
    </optgroup>
  {/each}
</select>
<slot />
