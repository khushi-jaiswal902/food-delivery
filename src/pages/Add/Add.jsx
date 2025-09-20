import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useFood } from '../../context/FoodContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Add = ({url}) => {

   
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addFoodItem } = useFood();
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        // Validation
        if (!data.name.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!data.description.trim()) {
            toast.error("Product description is required");
            return;
        }
        if (!data.price || data.price <= 0) {
            toast.error("Valid price is required");
            return;
        }
        if (!image) {
            toast.error("Product image is required");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append("name",data.name)
            formData.append("description",data.description)
            formData.append("price",Number(data.price))
            formData.append('category',data.category)
            formData.append("image",image)
            
            const success = await addFoodItem(formData);
            if (success) {
                setData({
                    name:"",
                    description:"",
                    price:"",
                    category:"Salad"
                })
                setImage(false)
                
                toast.success("Food item added successfully!");
                // Show success message and redirect to list after a short delay
                setTimeout(() => {
                    navigate('/list');
                }, 1500);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("An error occurred while adding the food item");
        } finally {
            setIsSubmitting(false);
        }
    }
    

    
  return (
    <div className='add'>
        <form className='flex-col'onSubmit={onSubmitHandler}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className='add-product-name flex-col'>
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' required/>
            </div>
            <div className='add-product-description flex-col'>
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name='category' required>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className='add-price flex-col'>
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$20' required/>
                </div>
            </div>
            <button type='submit' className='add-btn' disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'ADD'}
            </button>
        </form>
      
    </div>
  )
}

export default Add
