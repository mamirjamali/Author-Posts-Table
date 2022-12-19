import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {useSelect, useDispatch} from '@wordpress/data';
import { Spinner, Button } from '@wordpress/components'
import { decodeEntities } from '@wordpress/html-entities';
import "bootstrap/dist/css/bootstrap.css";
// import Button from '@mui/material/Button';


export default function Edit({ attributes, setAttributes }) {
	const { isDeleting } = attributes;
	const userId = useSelect(select => {
		return select('core').getCurrentUser().id
	})

	const { userPosts, isLoading } = useSelect(select => {
		const { getEntityRecords, isResolving } = select('core');
		const queryArgs = [
			'postType', 
			'post',
			{
			author: userId
		    }
		]
		return{
			userPosts : getEntityRecords(...queryArgs),
			isLoading: isResolving('getEntityRecords', queryArgs)
		  }
	}, [userId]);
	
	const handelClick = id => {
		wp.data.dispatch('core').deleteEntityRecord('postType', 'post', id);
	}
	let count = 1;

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
						userPosts?.length === 0 &&
							<p class="lead">
							   There is no post for you to retrive.
							</p>
					}
					{
						!isLoading && userPosts?.map(userPost => {
							
							return (
								<tr key={userPost.id}>
									<th scope="row">{count++}</th>
									<td>{decodeEntities(userPost.title.rendered)}</td>
									<td>{userPost.status}</td>
									<td>{userPost.date}</td>
									<td>
										<button onClick={() =>
										{
											setAttributes({isDeleting:true})
											handelClick(userPost.id)
										}
									}
										type="button" className="btn btn-danger btn-sm m-2"
										disabled={isDeleting}
										>
										{isDeleting ? (
												<>
												 Deleting...
												</>
										) : 'Delete'
										}
									</button>
									</td>
								</tr>
								
							)
						})
					}

				</tbody>
	        </table>			
		</div>
	);
}
