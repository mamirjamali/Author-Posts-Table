import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {useSelect, useDispatch} from '@wordpress/data';
import { Spinner, Button } from '@wordpress/components'
import { decodeEntities } from '@wordpress/html-entities';
import "bootstrap/dist/css/bootstrap.css";
import Pagination from './components/pagination';
import { paginate } from './utils/paginate'
// import Button from '@mui/material/Button';


export default function Edit({ attributes, setAttributes }) {
	const { pageItems, currentPage } = attributes;

	//Data Retrive
	const userId = useSelect(select => {
		return select('core').getCurrentUser().id
	})

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

	let countRow = 1;
	const countPosts = allPosts?.length;

	//Paginate
	const userPosts = paginate(allPosts, currentPage, pageItems);
	
	//Handlers
	const handelClick = id => {
		wp.data.dispatch('core').deleteEntityRecord('postType', 'post', id);
	}

	const handelPageChange = page => {
		setAttributes({
			currentPage: page
		})
	}

	//Render
	return (
		<div {...useBlockProps()}>
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
					<Pagination currentPage={currentPage} allItems={countPosts} pageSize={pageItems} onPageChange={ handelPageChange } />
				</tbody>
			</table>
		</div>
	);
}
