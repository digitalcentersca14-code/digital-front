<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    class?: string;
    absoluteStrokeWidth?: boolean;
    children?: Snippet;
    [key: string]: any;
  }

  let { 
    size = 24, 
    color = 'currentColor', 
    strokeWidth = 2, 
    class: className = '',
    absoluteStrokeWidth = false,
    children,
    ...rest
  }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  {...rest}
>
  {@render children?.()}
</svg>
