import { Tabbar, TabbarItem, useAdaptivityConditionalRender } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28StatisticsOutline, Icon28UserCircleOutline } from '@vkontakte/icons';
import PropTypes from 'prop-types';

export const NavigationTabbar = ({ activePanel, setActivePanel }) => {
	const { sizeX } = useAdaptivityConditionalRender();

	const tabbarStyle =
		sizeX.compact
			? {
				borderTopLeftRadius: 26,
				borderTopRightRadius: 26,
				left: '20%',
				width: 'calc(100% - 40%)',
			}
			: {
				borderTopLeftRadius: 26,
				borderTopRightRadius: 26,
			};

	return (
		<Tabbar style={tabbarStyle}>
			<TabbarItem
				selected={activePanel === 'main'}
				onClick={() => setActivePanel('main')}
				text="Главная"
				aria-label="Главная"
			>
				<Icon28HomeOutline />
			</TabbarItem>
			<TabbarItem
				selected={activePanel === 'stats'}
				onClick={() => setActivePanel('stats')}
				text="Статистика"
				aria-label="Статистика"
			>
				<Icon28StatisticsOutline />
			</TabbarItem>
			<TabbarItem
				selected={activePanel === 'profile'}
				onClick={() => setActivePanel('profile')}
				text="Профиль"
				aria-label="Профиль"
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