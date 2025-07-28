import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, SplitLayout, SplitCol, ScreenSpinner, ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { NavigationTabbar } from './components/NavigationTabbar/NavigationTabbar';
import { Home } from './panels/Home/Home';
import { Stats } from './panels/Stats/Stats';
import { Profile } from './panels/Profile/Profile';
import { Game } from './panels/Game/Game';

export const App = () => {
  const [activePanel, setActivePanel] = useState('main');
  const [showTabbar, setShowTabbar] = useState(true);
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner />);
  const [appearance, setAppearance] = useState('dark');

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();

    bridge.subscribe((e) => {
      if (e.detail.type === 'VKWebAppUpdateConfig') {
        setAppearance(e.detail.data.appearance || 'dark');
      }
    });
  }, []);

  const handlePlay = () => {
    setShowTabbar(false);
    setActivePanel('game');
  };

  const handleGameEnd = () => {
    setShowTabbar(true);
    setActivePanel('main');
  };


  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="main" onPlay={handlePlay} fetchedUser={fetchedUser} appearance={appearance} />
                <Stats id="stats" onGameEnd={handleGameEnd} />
                <Profile id="profile" fetchedUser={fetchedUser} />
                <Game id="game" onEnd={handleGameEnd} />
              </View>
              {showTabbar && (
                <NavigationTabbar activePanel={activePanel} setActivePanel={setActivePanel} />
              )}
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
