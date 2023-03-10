import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NcaaBBEvent } from '../../lib/types'
import type { PageServerLoad } from './$types'

export let load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
  let res = await fetch(
    `${PUBLIC_SCORE_API_URL}/ncaab/schedule?conference=${params.conference}&utc_offset=-21600`
  )

  if (!res.ok) console.error(await res.text())

  let events = await res.json()
  let gamesRes = await fetch(
    `${PUBLIC_SCORE_API_URL}/ncaab/events?id.in=${events.current_group.event_ids.join(
      ','
    )}`
  )

  let games: NcaaBBEvent[] = await gamesRes.json()

  setHeaders({
    'Cache-Control': 's-maxage=10'
  })

  return {
    games: games.sort(
      (a, b) =>
        new Date(a.game_date).valueOf() - new Date(b.game_date).valueOf()
    )
  }
}
