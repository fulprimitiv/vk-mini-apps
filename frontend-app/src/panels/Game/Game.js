import { Panel, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Game.scss';
import { TimerCircle } from '../../components/TimerCircle/TimerCircle';

export const Game = ({ id, onEnd, appearance }) => {
	const isLight = appearance === 'light';

	const exampleTask = '121 - 30 = ?';
	const answers = [91, 81, 100, 99];
	const colorIndex = {
		0: 'blue',
		1: 'red',
		2: 'orange',
		3: 'green',
	};

	return (
		<Panel id={id}>
			<div className="game">
				<TimerCircle duration={4} onComplete={onEnd} appearance={appearance} />
				<h2 className={`game__title game__title--${isLight ? 'light' : 'dark'}`}>Посчитай:</h2>
				<div className={`game__task game__task--${isLight ? 'light' : 'dark'}`}>{exampleTask}</div>
				<div className="game__answers">
					{answers.map((ans, index) => (
						<Button
							key={index}
							className={`game__answer game__answer--${colorIndex[index]}`}
							size="l"
							onClick={onEnd}>
							<span className={'game__answer-text'}>{ans}</span>
						</Button>
					))}
				</div>
			</div>
		</Panel>
	);
};

Game.propTypes = {
	id: PropTypes.string.isRequired,
	onEnd: PropTypes.func.isRequired,
	appearance: PropTypes.string.isRequired,
};
