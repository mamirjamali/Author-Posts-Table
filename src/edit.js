import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components'
import { decodeEntities } from '@wordpress/html-entities';
import "bootstrap/dist/css/bootstrap.css";
import Pagination from './components/pagination';
import { paginate } from './utils/paginate'
import ListGroup  from './components/listGroup';
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
	let countRow = 1;

	//Paginate
	const filtered = selectedCat ? allPosts.filter(post => post.categories.includes(selectedCat.id)) : allPosts
	
	const userPosts = paginate(filtered, currentPage, pageItems);
	const countPosts = filtered?.length;

	//Handlers
	const handelClick = id => {
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
					<p>You have { countPosts } posts</p>
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Row</th>
								<th scope="col">Title</th>
								<th scope="col">Status</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>
							{
								isLoading &&
								<>
									<td></td>
									<td></td>
									<td><Spinner/></td>
									<td></td>
									<td></td>
								</>
							}
							{
								countPosts === 0 &&
									<p class="lead">
									{ __('There are no posts for you to retrive.', 'apt-block')}
									</p>
							}
							{
								!isLoading && userPosts?.map(userPost => {
									
									return (
										<tr key={userPost.id}>
											<th scope="row">{countRow++}</th>
											<td>{decodeEntities(userPost.title.rendered)}</td>
											<td>{userPost.status}</td>
											<td>{userPost.date}</td>
											<td>
												<button id={`apt-btn-${userPost.id}`} onClick={() =>
												{
													const but = document.getElementById(`apt-btn-${userPost.id}`)
													but.setAttribute('disabled', true)
													but.innerHTML = 'Deleting...'
													handelClick(userPost.id)
												}
											}
												type="button" className="btn btn-danger btn-sm m-2"
												>
													Delete
											</button>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
			
					<Pagination currentPage={currentPage} allItems={countPosts} pageSize={pageItems} onPageChange={handelPageChange} />
		   </div>
		</div>
	 </div>
	);
}
