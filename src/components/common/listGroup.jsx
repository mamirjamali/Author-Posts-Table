
const ListGroup = (props) => {
    const { items, onItemSelect, textProperty, valueProperty, selectedItem} = props;

    return ( 
        <ul class="list-group">

            <li onClick={() => onItemSelect(null)}
                className={
                            !selectedItem ?
                            "list-group-item active" :
                            "list-group-item clickable"
                        }
            >All Categories</li>
            {
                items?.map(item => {
                    return (
                        <li key={item[valueProperty]} onClick={() => onItemSelect(item)}
                            className={
                                item === selectedItem ?
                                "list-group-item active" :
                                "list-group-item clickable"
                            }
                        >{item[textProperty]}</li>
                    )
                })
            }
        </ul>
     );
}
ListGroup.defaultProps = {
    valueProperty: "id",
    textProperty: "name"
}
export default ListGroup;