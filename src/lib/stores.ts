import { page } from '$app/stores'
import { derived, get } from 'svelte/store'

/**
 * ?w=7
 * ?c=big12
 * ?c=big12&w=7
 */

export function query({ key, value }: { key: string; value: string }) {
  const { subscribe } = derived(page, ($page, set) => {
    const current = new URLSearchParams($page.url.searchParams)
    current.set(key, value)
    set(`?${current.toString()}`)
  })

  return {
    subscribe,
    value() {
      return get(this) as string
    },
  }
}
