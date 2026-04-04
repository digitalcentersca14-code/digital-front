<script lang="ts">
  import Icon from './Icon.svelte';
  interface Props {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    class?: string;
    absoluteStrokeWidth?: boolean;
    [key: string]: any;
  }
  let { ...props }: Props = $props();
</script>
<Icon {...props}>
  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><polyline points="7 3 7 8 15 8" /><polyline points="17 21 17 13 7 13 7 21" />
</Icon>