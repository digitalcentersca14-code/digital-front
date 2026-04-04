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
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
</Icon>