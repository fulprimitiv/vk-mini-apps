import { Panel, Group, SimpleCell, Div } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

export const Stats = ({ id }) => {
	const [results, setResults] = useState([]);

	useEffect(() => {
		async function fetchStats() {
			try {
				// Пример получения данных из VK Storage
				const storage = await bridge.send('VKWebAppStorageGet', { keys: ['bestResults'] });
				const bestResults = storage.keys?.[0]?.value
					? JSON.parse(storage.keys[0].value)
					: [];
				setResults(bestResults);
			} catch (e) {
				setResults([]);
			}
		}
		fetchStats();
	}, []);

	return (
		<Panel id={id}>
			<Group>
				<Div>
					<b>Лучшие результаты:</b>
				</Div>
				{results.length === 0 && <Div>Нет данных</Div>}
				{results.map((item, idx) => (
					<SimpleCell key={idx}>
						{item.name}: {item.score}
					</SimpleCell>
				))}
			</Group>
		</Panel>
	);
};

Stats.propTypes = {
	id: PropTypes.string.isRequired,
	onGameEnd: PropTypes.func,
};