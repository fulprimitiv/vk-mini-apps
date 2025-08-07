import { Panel, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { TimerCircle } from '../../components/TimerCircle/TimerCircle';
import { useGameLogic } from '../../utils/useGameLogic';
import './Game.scss';

export const Game = ({ id, onEnd, appearance }) => {
	const isLight = appearance === 'light';

	const colorIndex = {
		0: 'blue',
		1: 'red',
		2: 'orange',
		3: 'green',
	};

	const {
		example,
		answers,
		isAnswered,
		timeStopped,
		handleAnswerClick,
		stopGame,
	} = useGameLogic((finalScore) => {
		onEnd(finalScore);
	});

	const getButtonClass = (ans) => {
		if (!isAnswered) return '';
		if (ans === example.answer) return 'game__answer--correct';
		return 'game__answer--wrong';
	};


	return (
		<Panel id={id}>
			<div className="game">
				<TimerCircle
					duration={4}
					onComplete={() => {
						if (!isAnswered) stopGame();
					}}
					appearance={appearance}
					stopped={timeStopped}
				/>
				<h2 className={`game__title game__title--${isLight ? 'light' : 'dark'}`}>Посчитай:</h2>
				<div className={`game__task game__task--${isLight ? 'light' : 'dark'}`}>
					{example.question}
				</div>
				<div className="game__answers">
					{answers.map((ans, index) => (
						<Button
							key={index}
							className={`game__answer game__answer--${colorIndex[index]} ${getButtonClass(ans)}`}
							size="l"
							onClick={() => handleAnswerClick(ans)}
							disabled={false}
							style={isAnswered ? { pointerEvents: 'none' } : {}}
						>
							<span className="game__answer-text">{ans}</span>
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
