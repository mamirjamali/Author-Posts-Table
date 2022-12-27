import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';

registerBlockType(metadata.name, {
	src: {
		icon: 'smiley'
	},
	edit: Edit
} );
