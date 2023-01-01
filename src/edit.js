import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import _  from 'lodash';
import {ToastContainer, toast} from "react-toastify"
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate'
import ListGroup from './components/common/listGroup';
import PostsTable from './components/postsTable';
import SearchBox from './components/common/searchBox';
import './main.css'


export default function Edit({ attributes, setAttributes }) {

	//Attributes Destructuring
	const { pageItems, currentPage, selectedCat,
		   sortColumn, searchQuery, isLoading, allPosts } = attributes;

	//Data Retrive
	const userId = useSelect(select => {
		return select('core').getCurrentUser().id
	});

        //Get Author Posts
		const { postsQuery, loaded } = useSelect(select => {
			const { getEntityRecords, hasFinishedResolution } = select('core');
			const queryArgs = [
				'postType', 
				'post',
				{
				author: userId
				}
			]
			return{
				postsQuery : getEntityRecords(...queryArgs),
				loaded: hasFinishedResolution('getEntityRecords', queryArgs)
			}
		}, [userId]);
	
		if(postsQuery && loaded) setAttributes({ allPosts: postsQuery, isLoading: loaded})
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
	if (searchQuery) {
		filtered = allPosts?.filter(post =>
			post.title.raw.toLowerCase().startsWith(searchQuery.toLowerCase()))
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
	const handleDelete = async item => {
		const success = await wp.data.dispatch('core').deleteEntityRecord('postType', 'post', item.id);
		const lastError = await wp.data.select('core').getLastEntityDeleteError('postType', 'post', item.id);
		if (success) {
			toast.success("Item deleted successfuly");
		}
		else {
			const error = lastError &&
				lastError.data &&
				lastError.data.status >= 400 &&
				lastError.data.status < 500
			if (error) {
				toast.error("Please refresh the page")
				return
			}
			toast.error("Unexpected error happend")
        }
		
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
				<ToastContainer position="bottom-right"/>
					{
						// isLoading && 
						<p>You have {countPosts} posts</p>
					}
					<SearchBox value={searchQuery} onChange={handleSearch} />
					<PostsTable items={userPosts} itemsCount={countPosts}
						onDeleteItem={handleDelete} itemsLoaded={isLoading}
						sortColumn={sortColumn} onSort={handleSort}/>
					
					<Pagination currentPage={currentPage} allItems={countPosts}
						pageSize={pageItems} onPageChange={handlePageChange}/>
		   </div>
		</div>
	 </div>
	);
}
