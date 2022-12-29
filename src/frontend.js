import { render, useState, useEffect } from '@wordpress/element'
import apiFetch from "@wordpress/api-fetch"
import SearchBox from './components/common/searchBox';
import ListGroup from './components/common/listGroup';


function AuthorPostTable (props){
        const [searchQuery, setSearchQuery] = useState("")
        const [selectedCat, setSelectedCat] = useState(null)
        const [catsObj, setCatsObj] = useState([])
        
        const catIds = []
		props.allPosts?.forEach(post => {
			post.categories.forEach(category => {
				catIds.push(category)
			})
                })
        const catsID = [...new Set(catIds)] // remove duplicate values
        const getObj = catsID.map(async (id, index) => {
                const cat = await apiFetch({
                        path: `wp/v2/categories/${id}`,
                        method: 'GET',
                })
                return getObj[index] = cat
        })  

        useEffect(() => {
                setCatsObj(getObj)
        }, [])     
        
        // console.log(catsObj)
        const handleSearch = query => {
		setSearchQuery(query)
        }

        const handleCatSelect = (item) => {
		setSelectedCat({
			selectedCat: item,
			// currentPage: 1,
			// searchQuery: ""
		})
	}
        return (
                <div class="row">
                    <div class="col-3">
                        <ListGroup items={catsObj} selectedItem={selectedCat}
			     onItemSelect={handleCatSelect} />
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