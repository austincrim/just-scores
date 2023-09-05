import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NcaaBBEvent, NcaaBBEventStats } from '$lib/types'

export async function load({ params, fetch }) {
  let res = await fetch(`${PUBLIC_SCORE_API_URL}/ncaab/events/${params.id}`)

  if (!res.ok) console.error(await res.text())
  let game: NcaaBBEvent = await res.json()

  let statsRes = await fetch(`${PUBLIC_SCORE_API_URL}${game.box_score.api_uri}`)
  if (!statsRes.ok) console.error(await statsRes.text())
  let stats: NcaaBBEventStats = await statsRes.json()

  return {
    game,
    stats,
  }
}
