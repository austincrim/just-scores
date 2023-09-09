<script lang="ts">
  import type { NFLEvent, NcaaBBEvent, NcaaFBEvent, Team } from '$lib/types'

  export let team: Team
  export let game: NcaaFBEvent | NcaaBBEvent | NFLEvent
  export let type: 'home' | 'away'

  const score = game.box_score?.score[type].score
  const ranking = game[`${type}_ranking`]
</script>

<div class="flex items-center justify-between gap-1">
  <div class="flex items-center gap-1">
    <img src={team.logos.large} alt="{team.full_name} logo" class="w-6 h-6" />
    {#if ranking}
      <span class="text-xs font-bold">{ranking}</span>
    {/if}
    <span>{team.name}</span>
  </div>

  {#if score}
    <span class="font-bold">{score}</span>
  {:else if game.status !== 'pre_game'}
    <span class="font-bold">0</span>
  {/if}
</div>
