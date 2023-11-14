<script lang="ts">
  import { beforeNavigate, invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
  import FootballScore from './FootballScore.svelte'
  import type { NFLEvent, NcaaFBEvent } from '$lib/types'

  export let data

  function isFootballEvent(
    game: typeof data.game
  ): game is NcaaFBEvent | NFLEvent {
    return game.api_uri.includes('nfl') || game.api_uri.includes('ncaaf')
  }

  let invalidating: undefined | Promise<void>
  onMount(() => {
    let interval: number | undefined
    interval = setInterval(() => {
      invalidating = invalidateAll()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  })

  beforeNavigate(async () => {
    if (invalidating) await invalidating
  })
</script>

{#snippet teamLine(line)}
  <div class="flex items-center justify-between">
    <span class="flex items-center justify-between gap-2 font-bold">
      <img
        src={line.team.logos.small}
        alt="{line.team.name} logo"
        class="object-cover w-12 h-12"
      />
      {#if line.ranking}
        <span class="text-sm">{line.ranking}</span>
      {/if}
      <span
        class:text-amber-700={isFootballEvent(data.game) &&
          data.game.box_score.team_in_possession.name ===
            line.team.name}
        class="text-2xl">{line.team.name}
      </span>
    </span>
    {#if data.game.status !== 'pre_game'}
      <span class="tabular-nums">
        {line.score}
      </span>
    {/if}
  </div>
{/snippet}

<main class="px-4 mx-auto mt-14">
  <div class="flex items-center gap-12 text-xl">
    <div class="flex flex-col w-full gap-8">
      {@render teamLine({team: data.game.away_team, score: data.game.box_score.score.away.score, ranking: data.game.away_ranking})}
      {@render teamLine({team: data.game.home_team, score: data.game.box_score.score.home.score, ranking: data.game.home_ranking})}
    </div>
    <div class="text-center">
      {#if data.game.box_score}
        <span class="font-mono">
          {data.game.box_score.progress.string}
        </span>
      {:else}
        <div class="flex flex-col items-center gap-1">
          <span class="whitespace-nowrap">
            {new Date(data.game.game_date).toLocaleTimeString(undefined, {
              timeStyle: 'short',
            })}
          </span>
        </div>
      {/if}
      {#if data.game.tv_listings_by_country_code?.us}
        <span class="text-base text-center">
          {data.game.tv_listings_by_country_code.us[0].long_name}
        </span>
      {/if}
    </div>
  </div>
  <section>
    {#if isFootballEvent(data.game)}
      <FootballScore game={data.game} />
    {/if}
  </section>
</main>
