<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="text-3xl flex flex-col gap-2">
  <span>{data.game.away_team.name}</span>
  <span>{data.game.home_team.name}</span>
</div>
