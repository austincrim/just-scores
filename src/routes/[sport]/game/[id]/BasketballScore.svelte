<script lang="ts">
  import type { NcaaBBEvent, NcaaBBEventStats } from '$lib/types'
  type Props = {
    game: NcaaBBEvent
    stats: NcaaBBEventStats
  }
  let { game, stats } = $props<Props>()
</script>

<pre>
  <!-- {JSON.stringify({ game, stats }, null, 2)} -->
</pre>
{#if game.box_score.last_play}
  <section>
    <h2 class="text-lg">Last Play</h2>
    <p>
      {game.box_score.last_play.description} (<time>
        {game.box_score.last_play.progress.clock}
      </time>)
    </p>
  </section>
{/if}
