import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NcaaBBEvent } from '../../../lib/types'
import type { PageServerLoad } from './$types'

export let load: PageServerLoad = async ({ params, fetch }) => {
  let res = await fetch(`${PUBLIC_SCORE_API_URL}/ncaab/events/${params.id}`)

  if (!res.ok) console.error(await res.text())

  let game: NcaaBBEvent = await res.json()

  return {
    game
  }
}
