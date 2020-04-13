import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";
import MoviePagination from "./MoviePagination"

// UI = fn(state, props)
// App = new React.Component()

class App extends React.Component {

  state = {
    movies: [],
    moviesWillWatch: [],
    sort_by: "popularity.desc",
    page: 1,
    total_pages: 0
  };

  getMovies = () => {
    fetch(`${ API_URL }/discover/movie?api_key=${ API_KEY_3 }&sort_by=${ this.state.sort_by }&page=${ this.state.page }`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
      this.setState({
        movies: data.results,
        total_pages: data.total_pages
      })
    })
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("didUpdate");
    // console.log("prev", prevProps, prevState);
    // console.log("this", this.props, this.state);
    if (prevState.sort_by !== this.state.sort_by) {
      //console.log("call api")
      this.getMovies()
      this.setState({
        page: 1
      });
    }
  }

  deleteMovie = movie => {
    //console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    //console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value,
    })
  }

  forwardButton = () => {
    this.setState({
      page: this.state.page + 1
    });
    setTimeout(() => {
      this.getMovies();
    }, 0);
  };

  backButton = () => {
    this.setState({
      page: this.state.page - 1
    });
    setTimeout(() => {
      this.getMovies();
    }, 0);
  }

  render() {
    //console.log("render", this.state.sort_by)
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row">
              <div className="col-12 mb-4">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-4">
                <MoviePagination
                  page={this.state.page}
                  total_pages={this.state.total_pages}
                  forwardButton={this.forwardButton}
                  backButton={this.backButton}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <div className="sticky-top">
              <h4>Will Watch: {this.state.moviesWillWatch.length} {this.state.moviesWillWatch.length < 2 ? 'movie' : 'movies'}</h4>
              <ul className="list-group">
                {this.state.moviesWillWatch.map(movie => (
                  <li key={movie.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <span>{movie.title}</span>
                      <span>{movie.vote_average}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
