const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const generateAnswers = (correct) => {
	const answers = new Set();
	answers.add(correct);

	while (answers.size < 4) {
		const fake = correct + Math.floor(Math.random() * 20) - 10;
		if (fake !== correct && fake >= 0) answers.add(fake);
	}

	return shuffleArray([...answers]);
};

