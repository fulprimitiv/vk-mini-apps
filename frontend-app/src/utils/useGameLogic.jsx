import { generateExample } from './generateExample';
import { generateAnswers } from './generateAnswers';
import { useRef, useState } from 'react';

export const useGameLogic = (onEnd) => {
	const [example, setExample] = useState(generateExample());
	const [answers, setAnswers] = useState(generateAnswers(example.answer));
	const [isAnswered, setIsAnswered] = useState(false);
	const [timeStopped, setTimeStopped] = useState(false);
	const [score, setScore] = useState(0);
	const timerRef = useRef(null);

	const resetRound = () => {
		const next = generateExample();
		setExample(next);
		setAnswers(generateAnswers(next.answer));
		setIsAnswered(false);
		setTimeStopped(false);
	};

	const handleAnswerClick = (value) => {
		if (isAnswered) return;
		setIsAnswered(true);
		setTimeStopped(true);
		clearTimeout(timerRef.current);

		if (value === example.answer) {
			setScore((prev) => prev + 1);
			timerRef.current = setTimeout(() => resetRound(), 800);
		} else {
			timerRef.current = setTimeout(() => onEnd(score), 800);
		}
	};

	const stopGame = () => {
		setIsAnswered(true);
		setTimeStopped(true);
		setTimeout(() => onEnd(score), 800);
	};

	return {
		example,
		answers,
		isAnswered,
		timeStopped,
		handleAnswerClick,
		stopGame,
		score,
	};
};
