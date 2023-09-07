<script lang="ts">
  export let type: 'word' | 'initial' = 'word'

  const text = type === 'word' ? 'Just Scores' : 'JS'
</script>

<div class="relative font-offbit">
  <span
    aria-hidden="true"
    class="absolute font-bold whitespace-nowrap font-offbit text-emerald-400"
    class:top-1={type === 'word'}
    class:left-1={type === 'word'}
    class:top-[2px]={type === 'initial'}
    class:left-[2px]={type === 'initial'}
  >
    {text}
  </span>
  <span class="relative font-bold whitespace-nowrap text-emerald-800">
    {text}
  </span>
</div>
