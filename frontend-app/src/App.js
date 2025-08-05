import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, SplitLayout, SplitCol, ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { NavigationTabbar } from './components/NavigationTabbar/NavigationTabbar';
import { Home } from './panels/Home/Home';
import { Stats } from './panels/Stats/Stats';
import { Profile } from './panels/Profile/Profile';
import { Game } from './panels/Game/Game';
import { GameOver } from './panels/GameOver/GameOver';

export const App = () => {
  const [activePanel, setActivePanel] = useState('main');
  const [showTabbar, setShowTabbar] = useState(true);
  const [fetchedUser, setUser] = useState();
  const [appearance, setAppearance] = useState('dark');

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
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
    setShowTabbar(false);
    setActivePanel('gameover');
  };

  const handleGoToMain = () => {
    setShowTabbar(true);
    setActivePanel('main');
  };


  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="main" onPlay={handlePlay} appearance={appearance} />
                <Stats id="stats" />
                <Profile id="profile" fetchedUser={fetchedUser} />
                <Game id="game" onEnd={handleGameEnd} appearance={appearance} />
                <GameOver id="gameover" onPlay={handlePlay} onMain={handleGoToMain} />
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
