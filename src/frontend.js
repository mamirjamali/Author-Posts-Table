import React, {useState} from 'react';
import { render } from '@wordpress/element'
import apiFetch from "@wordpress/api-fetch"
import SearchBox from './components/common/searchBox';
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css"
import ListGroup from './components/common/listGroup';


function AuthorPostTable (props){
        const [searchQuery, setSearchQuery] = useState("")
        const catIds = []
		props.allPosts?.forEach(post => {
			post.categories.forEach(category => {
				catIds.push(category)
			})
                })
        console.log(searchQuery)
        const handleSearch = query => setSearchQuery(query)

        return (
                <div>
                    <div class="col-3">

                   </div>
                   <div class="col">
                        <SearchBox value={searchQuery} onChange={handleSearch} />
                   </div>
                </div>
          );
}
 
 
document.addEventListener('DOMContentLoaded', async()=>{
    const block = document.querySelector('#apt-author-posts')
    const userID = parseInt(block.dataset.userId)
        
    const response = await apiFetch({
                path: `wp/v2/posts?author=${userID}`,
                method: 'GET',
    })
        
    render(
            <AuthorPostTable userID={userID} allPosts={response}/>,
        block
    )
})