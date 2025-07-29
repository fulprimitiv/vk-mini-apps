import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './TimerCircle.scss';

export const TimerCircle = ({ duration, onComplete, appearance }) => {
	const isLight = appearance === 'light';
	const [timeLeft, setTimeLeft] = useState(duration);
	const radius = 29;
	const stroke = 9;
	const circumference = 2 * Math.PI * radius;

	const intervalRef = useRef();

	useEffect(() => {
		const start = Date.now();
		intervalRef.current = setInterval(() => {
			const delta = (Date.now() - start) / 1000;
			const remaining = Math.max(duration - delta, 0);
			setTimeLeft(remaining);

			if (remaining <= 0) {
				clearInterval(intervalRef.current);
				onComplete?.();
			}
		}, 100);

		return () => clearInterval(intervalRef.current);
	}, [duration, onComplete]);

	const progress = (timeLeft / duration) * circumference;

	return (
		<div className="timer-circle">
			<svg width="68" height="68" viewBox="0 0 68 68">
				<circle
					cx="34"
					cy="34"
					r={radius}
					stroke="#8B8B8B"
					strokeWidth={stroke}
					opacity="0.1"
					fill="none"
				/>

				<circle
					cx="34"
					cy="34"
					r={radius}
					stroke="#0060FF"
					strokeWidth={stroke}
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={circumference + progress}
					strokeLinecap="round"
					transform="rotate(-90 34 34)"
					style={{ transition: 'stroke-dashoffset 0.1s linear' }}
				/>
			</svg>

			<div className={`timer-circle__text timer-circle__text--${isLight ? 'light' : 'dark'}`}>{timeLeft.toFixed(1)}</div>
		</div>
	);
};

TimerCircle.propTypes = {
	duration: PropTypes.number.isRequired,
	onComplete: PropTypes.func.isRequired,
	appearance: PropTypes.string.isRequired
};
