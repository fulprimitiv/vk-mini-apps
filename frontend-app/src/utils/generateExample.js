export const generateExample = () => {
	const operators = ['+', '-', '*', '/'];
	const operator = operators[Math.floor(Math.random() * operators.length)];

	let a, b, question, answer;

	switch (operator) {
		case '+':
			a = Math.floor(Math.random() * 50) + 10;
			b = Math.floor(Math.random() * 50) + 10;
			answer = a + b;
			question = `${a} + ${b} = ?`;
			break;
		case '-':
			a = Math.floor(Math.random() * 50) + 10;
			b = Math.floor(Math.random() * a); // чтобы не было отрицательных
			answer = a - b;
			question = `${a} - ${b} = ?`;
			break;
		case '*':
			a = Math.floor(Math.random() * 10) + 2;
			b = Math.floor(Math.random() * 10) + 2;
			answer = a * b;
			question = `${a} × ${b} = ?`;
			break;
		case '/':
			b = Math.floor(Math.random() * 9) + 2;
			answer = Math.floor(Math.random() * 10) + 2;
			a = b * answer; // чтобы деление было целым
			question = `${a} ÷ ${b} = ?`;
			break;
	}

	return { question, answer };
};
