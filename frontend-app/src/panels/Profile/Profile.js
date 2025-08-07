import {
	Panel,
	Group,
	Div,
	Avatar,
	Title,
	Header,
	Spacing,
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Profile.scss';

export const Profile = ({ id, fetchedUser }) => {
	return (
		<Panel id={id}>
			<Group>
				<Div className="profile">
					{fetchedUser && (
						<>
							<Avatar
								src={fetchedUser.photo_200}
								size={96}
								className="profile__avatar"
							/>
							<Title level="2" weight="2" className="profile__name">
								{fetchedUser.first_name} {fetchedUser.last_name}
							</Title>
						</>
					)}

					<Spacing size={20} />

					<Group header={<Header mode="secondary">Текущий прогресс</Header>}>
						<div className="profile__stats">
							<div className="profile__stat">
								<span className="profile__stat-value">15</span>
								<span className="profile__stat-label">Решено</span>
							</div>
							<div className="profile__stat">
								<span className="profile__stat-value">92%</span>
								<span className="profile__stat-label">Точность</span>
							</div>
							<div className="profile__stat">
								<span className="profile__stat-value">5</span>
								<span className="profile__stat-label">Серии</span>
							</div>
						</div>
					</Group>
				</Div>
			</Group>
		</Panel>
	);
};

Profile.propTypes = {
	id: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),
};