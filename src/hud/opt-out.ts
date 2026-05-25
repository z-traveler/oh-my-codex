const DISABLED_VALUES = new Set(['0', 'false', 'no', 'off', 'disabled']);
const ENABLED_DISABLE_VALUES = new Set(['1', 'true', 'yes', 'on', 'enabled']);

function normalizedEnvValue(value: string | undefined): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

export function isHudDisabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const hudValue = normalizedEnvValue(env.OMX_HUD);
  if (DISABLED_VALUES.has(hudValue)) return true;

  const disableHudValue = normalizedEnvValue(env.OMX_DISABLE_HUD);
  if (ENABLED_DISABLE_VALUES.has(disableHudValue)) return true;
  if (ENABLED_DISABLE_VALUES.has(hudValue)) return false;
  if (DISABLED_VALUES.has(disableHudValue)) return false;

  return true;
}
