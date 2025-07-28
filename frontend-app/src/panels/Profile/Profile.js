import { Panel, Group, Cell, Avatar } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import './Profile.scss';

export const Profile = ({ id, fetchedUser }) => (
	<Panel id={id}>
		<Group>
			{fetchedUser && (
				<Cell
					before={fetchedUser.photo_200 && <Avatar src={fetchedUser.photo_200} />}
					subtitle={fetchedUser.city?.title}
				>
					{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
				</Cell>
			)}
		</Group>
	</Panel>
);

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