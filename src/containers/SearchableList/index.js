import React, { Component } from 'react';

class SearchableList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      lastResponse: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f808799b8f714cc496cdf7bae948e46c&query=${this.state.query}`
    ).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        lastResponse: json
      })
    }).catch((error) => {
      console.error('ERROR', error)
    })
  }

  onChangeInput(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            onChange={this.onChangeInput}
            placeholder='Search for a movie, series and videos'
            style={{
              backgroundColor: '#F3F6F7',
              width: '100%',
              border: 0,
              padding: 20,
              fontSize: 20
            }}/>
        </form>
        {this.renderResults()}
      </div>
    );
  }

  renderResults() {
    const {
      lastResponse
    } = this.state

    if (!lastResponse.results) {
      return (
        <div>No results found</div>
      )
    }

    return lastResponse.results.map((movie) => {
      return (
        <div key={movie.id}>{JSON.stringify(movie.title)}</div>
      )
    })
  }
}

export default SearchableList;
