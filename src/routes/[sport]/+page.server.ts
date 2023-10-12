import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import { redirect } from '@sveltejs/kit'
import type { NFLEvent } from '$lib/types'

export async function load({ params, fetch, setHeaders, parent, url }) {
  const { leagues, events } = await parent()
  if (leagues && leagues.length > 0) {
    throw redirect(301, `${params.sport}/Top 25`)
  }

  const weekId = url.searchParams.get('w')
  const weekToFetch = weekId
    ? events.current_season.find((w) => w.id === weekId)
    : events.current_group

  let gamesRes = await fetch(
    `${PUBLIC_SCORE_API_URL}/${
      params.sport
    }/events?id.in=${weekToFetch.event_ids.join(',')}`
  )

  let games: NFLEvent[] = await gamesRes.json()
  setHeaders({
    'Cache-Control': 's-maxage=10',
  })

  return {
    games: games.sort(
      (a, b) =>
        new Date(a.game_date).valueOf() - new Date(b.game_date).valueOf()
    ),
  }
}
