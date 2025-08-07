import { Panel, Div, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { Icon24Replay } from '@vkontakte/icons';
import './Statistics.scss';

const mockStats = [
	{ score: 35, date: 'Сегодня, 13:45' },
	{ score: 28, date: 'Вчера, 19:22' },
	{ score: 40, date: '03.08.2025, 15:30' },
	{ score: 22, date: '02.08.2025, 11:15' },
	{ score: 50, date: '01.08.2025, 20:00' },
	{ score: 30, date: '31.07.2025, 14:10' },
	{ score: 45, date: '30.07.2025, 16:25' },
	{ score: 38, date: '29.07.2025, 18:05' },
	{ score: 27, date: '28.07.2025, 12:30' },
	{ score: 33, date: '27.07.2025, 17:55' },
];

export const Statistics = ({ id, onReplay }) => {
	const sortedStats = [...mockStats].sort((a, b) => b.score - a.score);

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
