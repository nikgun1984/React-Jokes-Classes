import React from "react";
import "./Joke.css";

class Joke extends React.Component {
	render() {
		return (
			<div className="Joke">
				<div className="Joke-votearea">
					<button onClick={() => this.props.vote(this.props.id, +1)}>
						<i className="fas fa-thumbs-up" />
					</button>

					<button onClick={() => this.props.vote(this.props.id, -1)}>
						<i className="fas fa-thumbs-down" />
					</button>

					{this.props.votes}
				</div>
				<div className="Joke-votearea">
					<div className="Joke-text">{this.props.text}</div>
					<button onClick={() => this.props.reset(this.props.id)}>reset</button>
					<button onClick={() => this.props.lock(this.props.id)}>lock</button>
				</div>
			</div>
		);
	}
}

export default Joke;
