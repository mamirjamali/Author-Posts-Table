import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {useSelect} from '@wordpress/data';
import { Spinner, Button } from '@wordpress/components'
import "bootstrap/dist/css/bootstrap.css";
// import Button from '@mui/material/Button';


export default function Edit() {

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
	},[userId]);

	const handelClick = () => {
		console.log('delete');
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
						<Spinner/>
					}
					{
						!isLoading && userPosts?.map(userPost => {
							return (
								<tr>
									<th scope="row">{count++}</th>
									<td>{userPost.title.rendered}</td>
									<td>{userPost.status}</td>
									<td>{userPost.date}</td>
									<td><button onClick={handelClick}
										type="button" className="btn btn-danger btn-sm m-2">Delete</button>
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
