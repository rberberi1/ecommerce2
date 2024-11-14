import {  useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCart } from '../context/CartContext';

const ProductForm = ({  }) => {
  const {id}=useParams();
  const { register, handleSubmit, setValue, reset } = useForm();
  const {getProductDetails, addProduct, editProduct}=useCart()
  const navigate=useNavigate();

  const productToEdit=getProductDetails(id);

  useEffect(() => {
    console.log(productToEdit)
    if (productToEdit) {
      setValue('title', productToEdit.title);
      setValue('price', productToEdit.price);
      setValue('description', productToEdit.description);
    }
  },[]);

  const onSubmit = (data) => {
    if (productToEdit) {
      editProduct({ ...productToEdit, ...data, price:parseFloat(data.price) });
      navigate(`/products/${id}`)
    } else {
      addProduct({...data, price:parseFloat(data.price)} );
      navigate('/')
    }
    reset();
  };
  if (!productToEdit && id) {
    return <p>Product not found.</p>; 
  }

  return (
    <Card style={{maxWidth: '60%', alignItems:'center', display:'flex', justifyContent:'center', margin:'auto'}}>
      <CardContent sx={{mt:3, mb:3}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register('title')} label="Product Name" fullWidth margin="normal" />
          <TextField {...register('price')} label="Price" fullWidth margin="normal" type="number"/>
          <TextField {...register('description')} label="Description" fullWidth margin="normal" multiline rows={4} />
          <Button type="submit" variant="contained" color="primary">
            {productToEdit ? 'Edit Product' : 'Add Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
