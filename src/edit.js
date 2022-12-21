import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import "bootstrap/dist/css/bootstrap.css";
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate'
import ListGroup from './components/common/listGroup';
import PostsTable from './components/postsTable';
// import Button from '@mui/material/Button';


export default function Edit({ attributes, setAttributes }) {

	const { pageItems, currentPage, selectedCat } = attributes;

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

	//Paginate
	const filtered = selectedCat ? allPosts.filter(post => post.categories.includes(selectedCat.id)) : allPosts
	
	const userPosts = paginate(filtered, currentPage, pageItems);
	const countPosts = filtered ? filtered.length : "...";

	//Handlers
	const handelDelete = id => {
		wp.data.dispatch('core').deleteEntityRecord('postType', 'post', id);
	}

	const handelPageChange = page => {
		setAttributes({
			currentPage: page
		})
	}

	const handleCatSelect = (item) => {
		setAttributes({
			selectedCat: item,
			currentPage: 1
		})
	}
	//Render
	return (
		<div {...useBlockProps()}>
			<div class="row">
				<div class="col-3">
					<ListGroup items={catsObj} selectedItem={ selectedCat} onItemSelect={handleCatSelect} />
				</div>
				<div class="col">
					<p>You have {countPosts} posts</p>
					
					<PostsTable items={userPosts} itemsCount={countPosts} onDeleteItem={handelDelete} itemsLoaded={ isLoading } />
					<Pagination currentPage={currentPage} allItems={countPosts} pageSize={pageItems} onPageChange={handelPageChange} />
		   </div>
		</div>
	 </div>
	);
}
