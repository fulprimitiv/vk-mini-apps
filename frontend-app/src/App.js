import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import { View, SplitLayout, SplitCol, ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { NavigationTabbar } from './components/NavigationTabbar/NavigationTabbar';
import { Home } from './panels/Home/Home';
import { Statistics } from './panels/Statistics/Statistics';
import { Profile } from './panels/Profile/Profile';
import { Game } from './panels/Game/Game';
import { GameOver } from './panels/GameOver/GameOver';

export const App = () => {
  const [activePanel, setActivePanel] = useState('main');
  const [showTabbar, setShowTabbar] = useState(true);
  const [fetchedUser, setUser] = useState();
  const [appearance, setAppearance] = useState('dark');

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

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

  const handleGameEnd = (finalScore) => {
    setScore(finalScore);

    setTotalGames((prev) => prev + 1);
    if (finalScore > bestScore) setBestScore(finalScore);
    setAvgScore((prev) => ((prev * totalGames) + finalScore) / (totalGames + 1));

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
                <Statistics id="stats" onReplay={handlePlay} stats={[]} />
                <Profile
                  id="profile"
                  fetchedUser={fetchedUser}
                  bestScore={bestScore}
                  totalGames={totalGames}
                  avgScore={avgScore.toFixed(1)}
                />
                <Game id="game" onEnd={handleGameEnd} appearance={appearance} />
                <GameOver id="gameover" onPlay={handlePlay} onMain={handleGoToMain} score={score} />
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
