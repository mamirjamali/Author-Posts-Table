// import "bootstrap/dist/css/bootstrap.css";
import _ from 'lodash';
import PropType from 'prop-types'

const Pagination = props => {
    const { allItems, pageSize, onPageChange, currentPage } = props;
    console.log(currentPage)
    const pagesCount = Math.ceil(allItems / pageSize);
    if (pagesCount === 1 || isNaN(pagesCount)) return null;
    const pages = _.range(1, pagesCount + 1);
    
    return (
            <nav aria-label="...">
            <ul class="pagination pagination-sm">
                {
                    pages.map(page => {
                        return (
                            <li key={page} className={page == currentPage ? "page-item active" : "page-item"}>
                                <span className="page-link" onClick={() => onPageChange(page)}>{ page }</span>
                            </li>
                        )
                    })
                }
                    
                </ul>
            </nav>
      );
}
 
export default Pagination;
