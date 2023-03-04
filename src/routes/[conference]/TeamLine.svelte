<script lang="ts">
  import type { Team } from '$lib/types'

  export let team: Team & { ranking: number; score: number }
</script>

<div class="flex justify-between items-center gap-1">
  <div class="flex items-center gap-1">
    <img src={team.logos.large} alt="{team.full_name} logo" class="h-6 w-6" />
    {#if team.ranking}
      <span class="text-xs font-bold">{team.ranking}</span>
    {/if}
    <span>{team.name}</span>
  </div>

  {#if team.score}
    <span class="font-bold">{team.score}</span>
  {/if}
</div>
