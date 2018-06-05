import React, { Component } from 'react';
import Header from '../../components/Header';
import Bookshelfs from '../../components/Bookshelfs';
import AddBook from '../../components/AddBook';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import * as BooksAPI from '../../BooksAPI'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      books: [],
    }
  }

  componentDidMount() {
    this.isAlreadyMounted = true;
    this.getAllBooks();
  }

  componentWillUnmount() {
    this.isAlreadyMounted = false;
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        if (this.isAlreadyMounted) {
          this.setState({
            loading: false,
            books,
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
    const { error, loading, books } = this.state;

    if (error) {
      return <Error />;
    } else if (loading) {
      return <Loading />;
    }

    return(
      <div className="list-books">
        <Header />
        <Bookshelfs books={books} />
        <AddBook />
      </div>
    );
  }
}

export default Main;