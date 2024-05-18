import Navbar from "../navbar/Navbar";
import './header.css';

const Header = ({ categories, isLoading}) => {
    return (
        <>
          <header className="header">
            <Navbar categories= {["Home","electronics", "men's clothing", "women's clothing", "jewellery"]} isLoading={false}/>
          </header> 
        </>
    )
}

export default Header;

