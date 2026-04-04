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
  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
</Icon>