<script lang="ts">
  import { page } from '$app/stores'
</script>

<main class="flex flex-col items-center justify-center gap-2">
  <h1 class="text-4xl">Oh no!</h1>
  <p>Something went wrong.</p>
  <details class="font-mono">
    <summary>Developer details</summary>
    <pre>{JSON.stringify($page.error, null, 2)}</pre>
  </details>
</main>
