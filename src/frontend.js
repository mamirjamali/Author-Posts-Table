import { render, useState, useEffect } from '@wordpress/element'
import apiFetch from "@wordpress/api-fetch"
import SearchBox from './components/common/searchBox';
import ListGroup from './components/common/listGroup';


function AuthorPostTable (props){
        const [searchQuery, setSearchQuery] = useState("")
        const [selectedCat, setSelectedCat] = useState()
        const [catsObj, setCatsObj] = useState([])
        const [resolved, setResolved] = useState(false)
        
        const catIds = []
        props.allPosts?.forEach(post => {
                post.categories.forEach(category => {
                        catIds.push(category)
                })
        })
        const catsID = [...new Set(catIds)] // remove duplicate values
        const getObj = []
        catsID.map(async (id, index) => {// Get each category object to prepare for ListGroup component
                await apiFetch({
                        path: `wp/v2/categories/${id}`,
                        method: 'GET',
                        // parse: false,
                }).then((res) => {
                        getObj[index] = ({ id: res.id, name: res.name }) 
                        if(index >= catsID.length-1) setResolved(true)
                }).catch((err) => {
                        console.error(`We got an error: ${err.message}`);
                      });
                
        })

        
        useEffect(() => {
                setCatsObj(getObj)
        }, [])  
        
        console.log(catsObj.length, catsID.length)
        const handleSearch = query => {
		setSearchQuery(query)
        }

        const handleCatSelect = (item) => {
		setSelectedCat(item)
	}
        return (
                <div class="row">
                        <div class="col-3">
                                {
                                resolved &&  
                                <ListGroup items={catsObj} selectedItem={selectedCat}
                                        onItemSelect={handleCatSelect} />
                                }
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