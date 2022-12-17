import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';


export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Author Posts Table – hello from the editor!',
				'author-posts-table'
			) }
		</p>
	);
}
