import { redirect } from '@sveltejs/kit'

export let load = () => {
  throw redirect(307, '/top%2025')
}
