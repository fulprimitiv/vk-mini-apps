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
  const [stats, setStats] = useState([]);

  const totalGames = stats.length;
  const bestScore = totalGames ? Math.max(...stats.map(s => s.score)) : 0;
  const avgScore = totalGames
    ? (stats.reduce((acc, cur) => acc + cur.score, 0) / totalGames)
    : 0;

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);

      try {
        const storage = await bridge.send("VKWebAppStorageGet", { keys: ["stats"] });
        if (storage.keys.length > 0) {
          const savedStats = JSON.parse(storage.keys[0].value);
          if (Array.isArray(savedStats)) {
            setStats(savedStats);
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке статистики:", error);
      }
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

  const handleGameEnd = async (finalScore) => {
    setScore(finalScore);
    setShowTabbar(false);
    setActivePanel('gameover');

    const now = new Date();
    const dateStr = now.toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const newStats = [...stats, { score: finalScore, date: dateStr }];

    setStats(newStats);

    try {
      await bridge.send("VKWebAppStorageSet", {
        key: "stats",
        value: JSON.stringify(newStats)
      });
    } catch (error) {
      console.error("Ошибка при сохранении статистики:", error);
    }
  };

  const handleGoToMain = () => {
    setShowTabbar(true);
    setActivePanel('main');
  };

  // Важно! Событие станет доступно пользователям после того, как ваше приложение пройдёт модерацию. 
  // https://dev.vk.com/ru/bridge/VKWebAppShare
  const handleShare = () => {
    bridge.send('VKWebAppShare', {
      link: 'https://vk.com/app53960088',
      text: `Я набрал ${score} ${getPointsLabel(score)} в этой крутой игре! Попробуй и ты!`
    });
  };

  const getPointsLabel = (score) => {
    const lastDigit = score % 10;
    const lastTwoDigits = score % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'очков';
    if (lastDigit === 1) return 'очко';
    if (lastDigit >= 2 && lastDigit <= 4) return 'очка';
    return 'очков';
  };

  const handleReset = async () => {
    setStats([]);
    setScore(0);

    try {
      await bridge.send("VKWebAppStorageSet", {
        key: "stats",
        value: JSON.stringify([])
      });
    } catch (error) {
      console.error("Ошибка при очистке хранилища:", error);
    }
  };

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id="main" onPlay={handlePlay} appearance={appearance} />
                <Statistics id="stats" stats={stats} onReplay={handlePlay} />
                <Profile
                  id="profile"
                  fetchedUser={fetchedUser}
                  bestScore={bestScore}
                  totalGames={totalGames}
                  avgScore={avgScore}
                  onShare={handleShare}
                  onReset={handleReset}
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
