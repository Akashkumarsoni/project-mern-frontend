import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';
import Product from '../../components/product/Product';
import Loader from '../../components/loader';
import './productListing.css';
import Pagination from '../../components/pagination/Pagination';

const ProductListing = () => {

    const { categoryName } = useParams();

    const url = categoryName
    ? `https://fakestoreapi.com/products/category/${categoryName}`
    : `http://localhost:3000/api/product`;

    const {data: products, error, isLoading} = useFetchData(url, []);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage; // 1*3 =3 -> on click of next page btn 2 -> 2*3 =
    const indexofFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products?.slice(indexofFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products?.length/itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    console.log("error",error)
    return (
        <div className="container">
            {
                isLoading ? (
                    <Loader />
                ): (
                    <>
                        <div className="product-list">
                            {
                                currentProducts && currentProducts.map((product)=>{
                                    return <Product key={product.id} product={product}/>   
                                })
                            }
                        </div>
                        <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate}/>
                    </>
                )
            }
        </div>
    )

}

export default ProductListing;

