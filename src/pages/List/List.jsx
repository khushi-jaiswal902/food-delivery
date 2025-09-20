import './List.css';
import { useFood } from '../../context/FoodContext';

const List = ({ url }) => {
  const { foodList, loading, removeFoodItem, fetchFoodList } = useFood();
  console.log('Rendered foodList:', foodList);

  if (loading) {
    return (
      <div className="list add flex-col">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="list add flex-col">
      <div className="list-header">
        <p>All Foods List</p>
        <button onClick={fetchFoodList} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>
      
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {foodList.map((item, index) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price.toFixed(2)}</p>
            <p onClick={() => removeFoodItem(item._id)} className="cursor">
              ❌
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
