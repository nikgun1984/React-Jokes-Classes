import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";
import loading from "./loading.gif";

class JokeList extends React.Component {
	static defaultProps = { numJokesToGet: 10 };
	constructor(props) {
		super(props);
		this.state = { jokes: [] };
		this.getJokes = this.getJoke.bind(this);
	}

	async getJoke() {
		let j = [...this.state.jokes];
		let seenJokes = new Set();
		try {
			while (j.length < this.props.numJokesToGet) {
				let res = await axios.get("https://icanhazdadjoke.com", {
					headers: { Accept: "application/json" },
				});
				let { status, ...jokeObj } = res.data;

				if (!seenJokes.has(jokeObj.id)) {
					seenJokes.add(jokeObj.id);
					j.push({ ...jokeObj, votes: 0 });
				} else {
					console.error("duplicate found!");
				}
			}
			this.setState({ jokes: j });
		} catch (e) {
			console.log(e);
		}
	}

	async componentDidMount() {
		if (this.state.jokes.length === 0) await this.getJokes();
	}

	async componentDidUpdate() {
		if (this.state.jokes.length === 0) await this.getJokes();
	}

	generateNewJokes = () => this.setState({ jokes: [] });

	vote = (id, delta) => {
		this.setState({
			jokes: this.state.jokes.map((j) =>
				j.id === id ? { ...j, votes: j.votes + delta } : j
			),
		});
	};

	render() {
		if (this.state.jokes.length) {
			let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
			return (
				<div className="JokeList">
					<button className="JokeList-getmore" onClick={this.generateNewJokes}>
						Get New Jokes
					</button>

					{sortedJokes.map((j) => (
						<Joke
							text={j.joke}
							key={j.id}
							id={j.id}
							votes={j.votes}
							vote={this.vote}
						/>
					))}
				</div>
			);
		}
		return (
			<div className="JokeList">
				<img src={loading} alt="loading..." />
				{/* <h1>Loading...</h1> */}
			</div>
		);
	}
}

export default JokeList;
