import { useState, useRef, useEffect } from "react";

function App() {
	const [balance, setBalance] = useState(() => {
		const storedBalance = localStorage.getItem("balance");
		return storedBalance ? Number(storedBalance) : 0;
	});

	const [transactions, setTransactions] = useState(() => {
		const storedTransactions = localStorage.getItem("transactions");
		return storedTransactions ? JSON.parse(storedTransactions) : [];
	});
	const [item, setItem] = useState("");
	const [amount, setAmount] = useState("");
	const addBtnRef = useRef(null);

	const handleClick = () => {
		if (item.length !== 0 && amount.length !== 0) {
			const newBalance = balance + Number(amount);
			const newTransactions = [...transactions, { item, amount }];
			setBalance(newBalance);
			setTransactions(newTransactions);
			setItem("");
			setAmount("");
			localStorage.setItem("balance", newBalance);
			localStorage.setItem("transactions", JSON.stringify(newTransactions));
		} else {
			setItem("");
			setAmount("");
		}
	};

	const handleDelete = (item, amount) => {
		const newBalance = balance - amount;
		const newTransactions = transactions.filter(
			(transaction) => transaction.item !== item
		);
		setBalance(newBalance);
		setTransactions(newTransactions);
		localStorage.setItem("balance", newBalance);
		localStorage.setItem("transactions", JSON.stringify(newTransactions));
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			addBtnRef.current.click();
		}
	};

	useEffect(() => {
		localStorage.setItem("balance", balance);
		localStorage.setItem("transactions", JSON.stringify(transactions));
	}, [balance, transactions]);

	return (
		<>
			<h1>Expense Tracker</h1>
			<h2>Balance: {balance}$</h2>

			<ul>
				{transactions.map((transaction, index) => (
					<li key={index}>
						{index + 1}-<span>{transaction.item}:</span>
						<span>{transaction.amount}$ </span>
						<button
							className="delete"
							onClick={() => handleDelete(transaction.item, transaction.amount)}
						>
							Delete
						</button>
					</li>
				))}
			</ul>

			<div className="expense-container">
				<input
					type="text"
					placeholder="What did you buy?"
					value={item}
					onKeyPress={handleKeyPress}
					onChange={(e) => setItem(e.target.value)}
				/>
				<input
					type="number"
					placeholder="How much did you spend?"
					value={amount}
					onKeyPress={handleKeyPress}
					onChange={(e) => setAmount(parseFloat(e.target.value))}
				/>
				<button ref={addBtnRef} onClick={handleClick}>
					Add
				</button>
			</div>
		</>
	);
}

export default App;
