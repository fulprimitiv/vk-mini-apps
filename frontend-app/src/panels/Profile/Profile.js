import { Panel, Div, Button, Avatar, Card, Title } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import {
	Icon28CrownOutline,
	Icon28GameOutline,
	Icon28GraphOutline,
} from '@vkontakte/icons';
import { Icon28ShareOutline, Icon28RepeatOutline } from '@vkontakte/icons';


import './Profile.scss';

export const Profile = ({
	id,
	fetchedUser,
	bestScore,
	totalGames,
	avgScore,
}) => {
	return (
		<Panel id={id}>
			<Div className="profile">
				<div className="profile__header">
					<Avatar
						size={96}
						src={fetchedUser?.photo_200}
						className="profile__avatar"
					/>
					<h2 className="profile__name">
						{fetchedUser?.first_name} {fetchedUser?.last_name}
					</h2>
				</div>

				<div className="profile__stats-grid">
					<Card mode="shadow" className="profile__stat-card">
						<Icon28CrownOutline className="profile__stat-icon gold" />
						<Title level="2" weight="2">{bestScore}</Title>
						<span className="profile__stat-label">Лучший результат</span>
					</Card>

					<Card mode="shadow" className="profile__stat-card">
						<Icon28GameOutline className="profile__stat-icon blue" />
						<Title level="2" weight="2">{totalGames}</Title>
						<span className="profile__stat-label">Всего игр</span>
					</Card>

					<Card mode="shadow" className="profile__stat-card">
						<Icon28GraphOutline className="profile__stat-icon green" />
						<Title level="2" weight="2">{avgScore}</Title>
						<span className="profile__stat-label">Средний счёт</span>
					</Card>
				</div>

				<div className="profile__actions">
					<Button
						size="l"
						mode="primary"
						stretched
						before={<Icon28ShareOutline />}
					>
						Поделиться
					</Button>

					<Button
						size="l"
						mode="secondary"
						stretched
						before={<Icon28RepeatOutline />}
					>
						Сбросить
					</Button>
				</div>
			</Div>
		</Panel>
	);
};

Profile.propTypes = {
	id: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		photo_200: PropTypes.string,
	}),
	bestScore: PropTypes.number.isRequired,
	totalGames: PropTypes.number.isRequired,
	avgScore: PropTypes.number.isRequired,
	onShare: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
};
