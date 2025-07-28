import { Panel } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Game.scss';

export const Game = ({ id, onEnd }) => {
	return (
		<Panel id={id}>
			<div style={{ padding: 20 }}>
				<h2>Игра началась!</h2>
				<button onClick={onEnd}>Закончить игру</button>
			</div>
		</Panel>
	);
};

Game.propTypes = {
	id: PropTypes.string.isRequired,
	onEnd: PropTypes.func.isRequired,
};
