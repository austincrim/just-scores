<script lang="ts">
  import type { NFLEvent, NcaaFBEvent } from '$lib/types'

  export let game: NFLEvent | NcaaFBEvent

  function getDownOrdinal(number: number) {
    switch (number) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      case 4:
        return 'th'
    }
  }
</script>

{#if game.status === 'in_progress' && game.box_score.down}
  <p class="mt-4 font-bold font-offbit">
    {game.box_score.down}{getDownOrdinal(game.box_score.down)} and {game
      .box_score.distance} from {game.box_score.ball_on}
  </p>
{/if}
{#if game.box_score?.last_play?.details}
  <div class="mt-12 text-sm">
    <h2 class="text-lg">Last Play</h2>
    <p class="mt-2">
      {game.box_score?.last_play.details}
    </p>
  </div>
{/if}
<div class="flex flex-col gap-6 mt-12 text-xs">
  {#if game.box_score?.scoring_summary}
    <h2 class="text-xl">Scoring Summary</h2>
    {#each game.box_score?.scoring_summary as summary}
      {@const logo = summary.scorer.teams[0].logos.small}
      <span
        class="relative flex items-center gap-2 pl-2"
        style="--team-color: #{summary.scorer?.teams[0].colour_1}"
      >
        <img
          class="absolute object-cover w-8 h-8 -left-1 -bottom-3"
          src={logo}
          alt="{summary.team} logo"
        />
        {#if summary.scorer?.headshots?.original}
          <img
            class="object-cover w-12 h-12 border-4 border-[var(--team-color)] rounded-full"
            src={summary.scorer?.headshots?.small}
            alt="scorer name"
          />
        {:else}
          <div />
        {/if}
        <p>{summary.summary_text}</p>
      </span>
    {/each}
  {/if}
</div>
