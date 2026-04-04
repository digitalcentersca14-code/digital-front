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
  <path d="M12 22v-9" /><path d="M15.17 6.07A2 2 0 0 0 15.2 5.96a2 2 0 0 0-2.61-2.09A2 2 0 0 0 3 9.42a2 2 0 0 0-1 1.73v5.08a2 2 0 0 0 1 1.73l9 5.15a2 2 0 0 0 2 0l9-5.15a2 2 0 0 0 1-1.73v-5.08a2 2 0 0 0-1-1.73l-6.17-3.53" /><path d="M12 13 3 8.35" /><path d="m12 13 9-4.65" /><path d="m15 10.5 4-2.1" /><path d="m6 4.5 9 5.1" /><path d="M12 22l9-5.15V9" />
</Icon>