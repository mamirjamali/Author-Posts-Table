import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Circle, Button } from "@wordpress/components";
import "bootstrap/dist/css/bootstrap.css";
// import Button from '@mui/material/Button';

import './editor.scss';


export default function Edit() {
	function handelClick() {
		console.log("yes");
	}
	return (
		<div {...useBlockProps()}>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Ti</th>
						<th scope="col">First</th>
						<th scope="col">Last</th>
						<th scope="col">Handle</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td><button onClick={handelClick}
							type="button" className="btn btn-danger btn-sm">Delete</button>
						</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td><button type="button" className="btn btn-danger btn-sm">Delete</button></td>
					</tr>
				</tbody>
	        </table>			
		</div>
	);
}
