import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import BookCover from '../BookCover';
import ShelfChanger from '../ShelfChanger';
import BookTitle from '../BookTitle';
import BookAuthors from '../BookAuthors';
import Types from '../../utils/types';

const Book = ({ book, onChangeShelf }) => {
  const { title, authors, imageLinks } = book;

  const handleChangeShelf = (newShelf) => {
    onChangeShelf(book, newShelf);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <BookCover image={imageLinks} />
          <ShelfChanger
            shelf={book.shelf}
            onChange={handleChangeShelf}
          />
        </div>
        <BookTitle title={title} />
        { !isEmpty(authors) && <BookAuthors authors={authors} /> }
      </div>
    </li>
  );
};

Book.propTypes = {
  book: Types.book.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Book;
