import bridge from '@vkontakte/vk-bridge';

export async function loadStats() {
	const res = await bridge.send('VKWebAppStorageGet', { keys: ['stats'] });
	if (res.keys[0]?.value) {
		try {
			return JSON.parse(res.keys[0].value);
		} catch {
			return [];
		}
	}
	return [];
}
