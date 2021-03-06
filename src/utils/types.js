import { oneOf, shape, arrayOf, string } from 'prop-types';
import constants from './constants';

const shelfID = oneOf(Object.keys(constants.SHELVES));
const shelfTitle = oneOf(Object.values(constants.SHELVES));

const book = shape({
  title: string.isRequired,
  authors: arrayOf(string),
  imageLinks: shape({
    smallThumbnail: string.isRequired,
    thumbnail: string.isRequired,
  }),
});

const shelves = shape({
  none: string.isRequired,
  read: string.isRequired,
  wantToRead: string.isRequired,
  currentlyReading: string.isRequired,
});

export default {
  book,
  shelfID,
  shelfTitle,
  shelves,
};
