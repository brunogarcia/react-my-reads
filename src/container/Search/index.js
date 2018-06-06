import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash.isempty';
import SearchResults from '../../components/SearchResults';
import Error from '../../components/Error';
import constants from '../../utils/constants';
import * as BooksAPI from '../../BooksAPI';

const { MAIN } = constants.APP.PATH;
const MIN_LENGTH_SEARCH = 5;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loading: false,
      error: false,
      books: [],
    };

    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleChangeShelf = this.handleChangeShelf.bind(this);
  }

  componentDidMount() {
    this.isAlreadyMounted = true;
  }

  componentWillUnmount() {
    this.isAlreadyMounted = false;
  }

  handleChangeSearch(e) {
    const { value } = e.target;
    this.setState({
      query: value,
    }, this.checkMinLength);
  }

  handleChangeShelf(book, shelf) {
    console.log(book, shelf);
  }

  checkMinLength() {
    const { query } = this.state;

    if (query.length < MIN_LENGTH_SEARCH) {
      this.setState({
        books: [],
      });
    }

    if (query.length >= MIN_LENGTH_SEARCH) {
      this.searchBooks(query);
    }
  }

  searchBooks(query) {
    BooksAPI.search(query)
      .then((books) => {
        if (this.isAlreadyMounted) {
          this.setState({
            books,
            loading: false,
          });
        }
      }).catch(() => {
        if (this.isAlreadyMounted) {
          this.setState({
            error: true,
          });
        }
      });
  }

  render() {
    const {
      error,
      loading,
      query,
      books,
    } = this.state;

    if (error) {
      return <Error />;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={MAIN} className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={this.handleChangeSearch}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {
          !isEmpty(books) &&
          <SearchResults
            books={books}
            onChangeShelf={this.handleChangeShelf}
          />
        }
      </div>
    );
  }
}

export default Search;
