import { Panel, Div, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import imgSrc from '../../assets/images/game-over.svg';
import homeIcon from '../../assets/images/home-icon.svg';
import playIcon from '../../assets/images/play-icon.svg';
import './GameOver.scss';

export const GameOver = ({ id, onPlay, onMain }) => {
	return (
		<Panel id={id}>
			<Div className="game-over">
				<img src={imgSrc} alt="Игра окончена" className="game-over__image-wrapper" />

				<div className="game-over__card">
					<h2 className="game-over__card-title">КОНЕЦ ИГРЫ</h2>
					<div className="game-over__card-score">
						<div className="game-over__card-score-label">Счёт</div>
						<div className="game-over__card-score-divider" />
						<div className="game-over__card-score-value">15</div>
						<div className="game-over__card-score-unit">очков</div>
					</div>
				</div>

				<div className="game-over__buttons">
					<Button className="game-over__button" size="l" onClick={onPlay}>
						<span className="game-over__button-content">
							<img src={playIcon} className="game-over__button-icon" />
							<span className="game-over__button-text">Играть</span>
						</span>
					</Button>

					<Button className="game-over__button" size="l" onClick={onMain}>
						<span className="game-over__button-content">
							<img src={homeIcon} className="game-over__button-icon" />
							<span className="game-over__button-text">Домой</span>
						</span>
					</Button>
				</div>
			</Div>
		</Panel>
	);
};

GameOver.propTypes = {
	id: PropTypes.string.isRequired,
	onPlay: PropTypes.func.isRequired,
	onMain: PropTypes.func.isRequired,
};
