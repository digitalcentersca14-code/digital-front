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
  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
</Icon>