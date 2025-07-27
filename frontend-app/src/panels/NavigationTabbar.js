import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28StatisticsOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import PropTypes from 'prop-types';
import '../assets/styles/blocks/_navigation-tabbar.scss';

export const NavigationTabbar = ({ activePanel, setActivePanel }) => {
	const isMobile = window.innerWidth <= 480;
	const tabbarClass = isMobile ? '' : 'navigation-tabbar';

	return (
		<Tabbar className={tabbarClass}>
			<TabbarItem
				selected={activePanel === 'main'}
				onClick={() => setActivePanel('main')}
				label="Главная"
			>
				<Icon28HomeOutline />
			</TabbarItem>
			<TabbarItem
				selected={activePanel === 'stats'}
				onClick={() => setActivePanel('stats')}
				label="Статистика"
			>
				<Icon28StatisticsOutline />
			</TabbarItem>
			<TabbarItem
				selected={activePanel === 'profile'}
				onClick={() => setActivePanel('profile')}
				label="Профиль"
			>
				<Icon28UserCircleOutline />
			</TabbarItem>
		</Tabbar>
	);
};

NavigationTabbar.propTypes = {
	activePanel: PropTypes.string.isRequired,
	setActivePanel: PropTypes.func.isRequired,
};