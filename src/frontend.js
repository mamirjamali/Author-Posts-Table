import { render, useState, useEffect } from '@wordpress/element'
import apiFetch from "@wordpress/api-fetch"
import { toast, ToastContainer } from 'react-toastify';
import _  from 'lodash';
import SearchBox from './components/common/searchBox';
import ListGroup from './components/common/listGroup';
import PostsTable from './components/postsTable';
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate';


function AuthorPostTable (props){
        const [searchQuery, setSearchQuery] = useState("")
        const [selectedCat, setSelectedCat] = useState(null)
        const [catsObj, setCatsObj] = useState([])
        const [loaded, setLoaded] = useState(false)
        const [sortColumn, setSortColumn] = useState({ column: "title.rendered", order: "asc" })
        const [currentPage, setCurrentPage] = useState(1)
        const { allPosts, pageItems } = props
        
        //Loop through posts to get categorises id
        const catIds = []
        allPosts?.forEach(post => {
                post.categories.forEach(category => {
                        catIds.push(category)
                })
        })

        //Loop through Categories id to get cat Name
        const catsID = [...new Set(catIds)] // remove duplicate values
        const getObj = []
        catsID.map( (id, index) => {// Get each category object to prepare for ListGroup component
                 apiFetch({
                        path: `wp/v2/categories/${id}`,
                        method: 'GET',
                        // parse: false,
                }).then((res) => {
                        getObj[index] = ({ id: res.id, name: res.name }) 
                        if(getObj.length >= catsID.length) setLoaded(true)
                }).catch((err) => {
                        alert("Unexpected error happend")
                });
        })

        //Update Categories object for List Group component
        useEffect(() => {
                setCatsObj(getObj)
        }, [])  

	//Paginate & Sort
	let filtered = allPosts
	if (searchQuery) {
		filtered = allPosts?.filter(post =>
			post.title.rendered.toLowerCase().startsWith(searchQuery.toLowerCase()))
	}
	else if (selectedCat){
		filtered = allPosts?.filter(post => post.categories.includes(selectedCat.id))
        }

        const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]) 
	const userPosts = paginate(sorted, currentPage, pageItems);
	const countPosts = sorted ? sorted.length :
		<div class="spinner-border text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>;
        
        //Handlers
        const handleSearch = query => {
                setSearchQuery(query)
                setCurrentPage(1)
                setSelectedCat(null)
        }

        const handleCatSelect = (item) => {
		setSelectedCat(item)
        }
        const handleSort = sortColumn => {
		setSortColumn(sortColumn)
        } 
        const handlePageChange = page => {
		setCurrentPage(page)
        }
        const handleDelete =  async item => {
                apiFetch({
                        path: `wp/v2/posts/${item.id}`,
                        method: 'Delete',
                        parse: false
                }).then((res) => {
                        toast.success("Item deleted successfuly");
                }).catch((err) => {
                        if (400 <= err.status < 500) {
                                toast.error("Please refresh the page")
                                return
                        }
                        else toast.error("Unexpected error happend")
                })
        }
        
        //Render
        return (
                <div class="row">
                        <div class="col-3">
                                {
                                loaded &&  
                                <ListGroup
                                        items={catsObj}
                                        selectedItem={selectedCat}
                                        onItemSelect={handleCatSelect}
                                />
                                }
                        </div>
                        <div class="col">
                                <ToastContainer position="bottom-right" />

                                <SearchBox
                                        value={searchQuery}
                                        onChange={handleSearch}
                                />
                                <PostsTable
                                        items={userPosts}
                                        itemsCount={countPosts}
                                        itemsLoaded={loaded}
                                        sortColumn={sortColumn}
                                        onSort={handleSort}
                                        onDeleteItem={handleDelete}
                                />
                                <Pagination
                                        currentPage={currentPage}
                                        allItems={countPosts}
                                        pageSize={pageItems}
                                        onPageChange={handlePageChange}
                                />
                        </div>
                        
                </div>
          );
}
 
 
document.addEventListener('DOMContentLoaded', async()=>{
    const block = document.querySelector('#apt-author-posts')
    const userID = parseInt(block.dataset.userId)
    const pageItems = parseInt(block.dataset.pageItems)
        
    console.log(pageItems)
        
    const response = await apiFetch({
                path: `wp/v2/posts?author=${userID}`,
                method: 'GET',
    })
    render(
            <AuthorPostTable userID={userID} allPosts={response} pageItems={pageItems} />,
        block
    )
})