import { Panel, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import imgSrc from '../../assets/images/welcome-illustration.svg';
import './Home.scss';

export const Home = ({ id, onPlay, appearance }) => {
	const isLight = appearance === 'light';
	const isMobile = window.innerWidth <= 480;

	return (
		<Panel id={id}>
			<div className="home">
				<div className="home__title">
					<span className={`home__title-text home__title-text${isMobile ? '--small' : ''} home__title-text--${isLight ? 'light' : 'dark'}`}>
						Добро пожаловать в
					</span>
					<span className={`home__title-text home__title-text${isMobile ? '--small' : ''} home__title-text--accent`}>
						Math Rush!
					</span>
				</div>
				<div className={`home__subtitle home__subtitle--${isLight ? 'light' : 'dark'}`}>
					Проверь свою скорость и ловкость в цифрах!
				</div>
				<img src={imgSrc} alt="Иллюстрация" className="home__image" />

				<Button
					className={`home__button home__button--${isLight ? 'light' : 'dark'}`}
					onClick={onPlay}>
					<span className={`home__button-text home__button-text--${isLight ? 'light' : 'dark'}`}>ИГРАТЬ</span>
				</Button>
			</div>
		</Panel>

	);
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	onPlay: PropTypes.func.isRequired,
	appearance: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
	}),
};