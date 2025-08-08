import bridge from '@vkontakte/vk-bridge';

export async function saveGameResult(score) {
	const now = new Date();
	const dateStr = now.toLocaleDateString('ru-RU') + ', ' + now.toLocaleTimeString('ru-RU');

	const res = await bridge.send('VKWebAppStorageGet', { keys: ['stats'] });
	let stats = [];

	if (res.keys[0]?.value) {
		try {
			stats = JSON.parse(res.keys[0].value);
		} catch (e) {
			stats = [];
		}
	}

	stats.unshift({ score, date: dateStr });

	const trimmedStats = stats.slice(0, 50);

	await bridge.send('VKWebAppStorageSet', {
		key: 'stats',
		value: JSON.stringify(trimmedStats)
	});
}

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
