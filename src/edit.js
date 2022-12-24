import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import _, { filter } from 'lodash';
import "bootstrap/dist/css/bootstrap.css";
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate'
import ListGroup from './components/common/listGroup';
import PostsTable from './components/postsTable';
import SearchBox from './components/common/searchBox';
import './main.css'
// import Button from '@mui/material/Button';


export default function Edit({ attributes, setAttributes }) {

	//Attributes Destructuring
	const { pageItems, currentPage, selectedCat, sortColumn, searchQuery } = attributes;

	//Data Retrive
	const userId = useSelect(select => {
		return select('core').getCurrentUser().id
	});

        //Get Author Posts
		const { allPosts, isLoading } = useSelect(select => {
			const { getEntityRecords, isResolving } = select('core');
			const queryArgs = [
				'postType', 
				'post',
				{
				author: userId
				}
			]
			return{
				allPosts : getEntityRecords(...queryArgs),
				isLoading: isResolving('getEntityRecords', queryArgs)
			}
		}, [userId]);

	   //Get Author Posts Categories
		const catIds = []
		allPosts?.forEach(post => {
			post.categories.forEach(category => {
				catIds.push(category)
			})
		})

		const { catsObj } = useSelect(select => {
			const { getEntityRecords } = select('core');
			const queryArgs = [
				'taxonomy', 
				'category',
				{
					include: catIds //Will automatically remove duplicate values
				}
			]
			return{
				catsObj : getEntityRecords(...queryArgs),
			}
		}, [catIds]);
	
	//Paginate & Sort
	let filtered = allPosts
	console.log(filtered)
	if (searchQuery) {
		
		filtered = allPosts?.filter(post =>
			
			post.title.raw.toLowerCase().startsWith(searchQuery.toLowerCase()))
	}
	else if (selectedCat){
		filtered = allPosts?.filter(post => post.categories.includes(selectedCat.id))
	}

	const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]) 

	const userPosts = paginate(sorted, currentPage, pageItems);
	
	const countPosts = sorted ? sorted.length : <i class="fas fa-spinner fa-pulse"></i>;

	//Handlers
	const handleDelete = id => {
		wp.data.dispatch('core').deleteEntityRecord('postType', 'post', id);
	}

	const handlePageChange = page => {
		setAttributes({
			currentPage: page
		})
	}

	const handleCatSelect = (item) => {
		setAttributes({
			selectedCat: item,
			currentPage: 1,
			searchQuery: ""
		})
	}

	const handleSort = sortColumn => {
		setAttributes({sortColumn})
	} 

	const handleSearch = query => {
		setAttributes({
			selectedCat: null,
			searchQuery: query,
			currentPage: 1
		})
	}
	//Render
	return (
		<div {...useBlockProps()}>
			<div class="row">
				<div class="col-3">
					<ListGroup items={catsObj} selectedItem={selectedCat}
						onItemSelect={handleCatSelect} />
				</div>

				<div class="col">
					{
						allPosts && !isLoading && 
						<p>You have {countPosts} posts</p>
					}
					<SearchBox value={searchQuery} onChange={handleSearch} />
					<PostsTable items={userPosts} itemsCount={countPosts}
						onDeleteItem={handleDelete} itemsNotLoaded={isLoading}
						sortColumn={sortColumn} onSort={handleSort}/>
					
					<Pagination currentPage={currentPage} allItems={countPosts}
						pageSize={pageItems} onPageChange={handlePageChange}/>
		   </div>
		</div>
	 </div>
	);
}
