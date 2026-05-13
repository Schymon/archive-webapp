import { Config } from '@/types/config';
import sampleConfig from '../../data/content.json';

export async function fetchConfig(): Promise<Config> {
  const configUrl = import.meta.env.VITE_CONFIG_URL || '/content.json';

  try {
    const response = await fetch(`${configUrl}?t=${Date.now()}`, {
      cache: 'no-store'
    });

    if (response.ok) {
      return response.json();
    }
  } catch {
    // Fall through to sampleConfig
  }

  return sampleConfig;
}
