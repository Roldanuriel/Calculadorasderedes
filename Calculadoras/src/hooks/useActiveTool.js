import { computed, ref } from 'vue';

const tools = [
  { id: 'ip', label: 'Calculadora IPs' },
  { id: 'binary', label: 'Conversor Universal' },
  { id: 'subnet', label: 'Guia Subneteo' },
  { id: 'scientific', label: 'Calculadora Cientifica' }
];

export function useActiveTool(defaultTool = 'ip') {
  const activeTool = ref(defaultTool);

  const activeLabel = computed(() => tools.find((tool) => tool.id === activeTool.value)?.label ?? 'Calculadoras');

  return {
    tools,
    activeTool,
    activeLabel,
    setActiveTool: (toolId) => {
      if (tools.some((tool) => tool.id === toolId)) {
        activeTool.value = toolId;
      }
    }
  };
}
