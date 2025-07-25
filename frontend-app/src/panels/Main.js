import { Panel, Button } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import imgSrc from '../assets/images/searching - looking.svg';

export const Main = ({ id, onPlay, appearance }) => {
	const isLight = appearance === 'light';

	return (
		<Panel id={id}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 8,
					marginTop: 30,
					marginBottom: 0,
				}}
			>
				<span
					style={{
						color: isLight ? '#191D63' : '#FFF',
						fontFamily: '"Alumni Sans SC", sans-serif',
						fontSize: 50,
						fontStyle: 'normal',
						fontWeight: 700,
						lineHeight: '70px',
					}}
				>
					Добро пожаловать в
				</span>
				<span
					style={{
						color: '#1C5FFF',
						fontFamily: '"Alumni Sans SC", sans-serif',
						fontSize: 50,
						fontStyle: 'normal',
						fontWeight: 700,
						lineHeight: '70px',
					}}
				>
					Math Rush!
				</span>
			</div>
			<div
				style={{
					color: isLight ? '#191D63' : '#F0F0F0',
					fontFamily: '"Alumni Sans SC", sans-serif',
					fontSize: 20,
					fontStyle: 'normal',
					fontWeight: 400,
					lineHeight: '20px',
					textAlign: 'center',
				}}
			>
				Проверь свою скорость и ловкость в цифрах!
			</div>
			<img
				src={imgSrc}
				alt="Иллюстрация"
				style={{
					width: 376,
					height: 376,
					marginBottom: 16,
					display: 'block',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
			/>

			<Button size="1" onClick={onPlay}>
				Играть
			</Button>

		</Panel>
	);
};

Main.propTypes = {
	id: PropTypes.string.isRequired,
	onPlay: PropTypes.func.isRequired,
	appearance: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
	}),
};