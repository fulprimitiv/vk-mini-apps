import { Panel, Div, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { Icon24Replay } from '@vkontakte/icons';
import { useEffect, useState } from 'react';
import { loadStats } from '../../utils/storage';
import './Statistics.scss';

export const Statistics = ({ id, onReplay }) => {
	const [stats, setStats] = useState(null);
	useEffect(() => {
		async function fetchStats() {
			const loadedStats = await loadStats();
			setStats(loadedStats);
		}
		fetchStats();
	}, []);

	if (stats === null) {
		return (
			<Panel id={id}>
				<Div className="statistics" style={{ textAlign: 'center', paddingTop: 50 }}>
					<h2 className="statistics__title">Загрузка...</h2>
				</Div>
			</Panel>
		);
	}

	if (stats.length === 0) {
		return (
			<Panel id={id}>
				<Div className="statistics" style={{ textAlign: 'center', paddingTop: 50 }}>
					<h2 className="statistics__title">Твоя статистика</h2>
					<p>Статистика пока пуста. Сыграй парочку игр, чтобы увидеть результаты.</p>
					<Button size="l" mode="primary" onClick={onReplay}>Начать игру</Button>
				</Div>
			</Panel>
		);
	}

	const sortedStats = [...stats].sort((a, b) => b.score - a.score);

	return (
		<Panel id={id}>
			<Div className="statistics">
				<h2 className="statistics__title">Твоя статистика</h2>
				<div className="statistics__list">
					{sortedStats.map((game, index) => (
						<div key={index} className="statistics__card">
							<div className="statistics__card-left">
								<div className="statistics__badge">{index + 1}</div>
								<div className="statistics__score">
									{game.score} {getPointsLabel(game.score)}
								</div>
							</div>
							<div className="statistics__card-right">
								<div className="statistics__date">{game.date}</div>
								<Button size="s" mode="secondary" before={<Icon24Replay />} onClick={onReplay}>
									Повторить
								</Button>
							</div>
						</div>
					))}
				</div>
			</Div>
		</Panel>
	);
};

Statistics.propTypes = {
	id: PropTypes.string.isRequired,
	onReplay: PropTypes.func.isRequired,
};

const getPointsLabel = (score) => {
	const lastDigit = score % 10;
	const lastTwoDigits = score % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'очков';
	if (lastDigit === 1) return 'очко';
	if (lastDigit >= 2 && lastDigit <= 4) return 'очка';
	return 'очков';
};
