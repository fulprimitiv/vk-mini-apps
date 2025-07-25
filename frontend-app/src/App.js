import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, SplitLayout, SplitCol, ScreenSpinner, ConfigProvider } from '@vkontakte/vkui';
import { NavigationTabbar } from './panels/NavigationTabbar';
import { Main } from './panels/Main';
import { Stats } from './panels/Stats';
import { Profile } from './panels/Profile';

export const App = () => {
  const [activePanel, setActivePanel] = useState('main');
  const [showTabbar, setShowTabbar] = useState(true);
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner />);
  const [appearance, setAppearance] = useState('light');

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();

    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        setAppearance(e.detail.data.appearance || 'light');
      }
    });
  }, []);

  const handlePlay = () => setShowTabbar(false);
  const handleGameEnd = () => setShowTabbar(true);

  return (
    <ConfigProvider appearance={appearance}>
      <SplitLayout popout={popout}>
        <SplitCol>
          <View activePanel={activePanel}>
            <Main id="main" onPlay={handlePlay} fetchedUser={fetchedUser} appearance={appearance} />
            <Stats id="stats" onGameEnd={handleGameEnd} />
            <Stats id="stats" onGameEnd={handleGameEnd} />
            <Profile id="profile" fetchedUser={fetchedUser} />
          </View>
          {showTabbar && (
            <NavigationTabbar activePanel={activePanel} setActivePanel={setActivePanel} />
          )}
        </SplitCol>
      </SplitLayout>
    </ConfigProvider>
  );
};