import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const options = {
  totalItems: 0,
  visiblePages: 4,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const refs = {
  paginationList: document.querySelector('#tui-pagination-container'),
};

const pagination = new Pagination(refs.paginationList, options);

export default pagination;
