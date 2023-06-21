import './Navbar1.css';
import logo from '../../assets/logo.png'

export default function Navbar()
{
    return(
            <nav className='Container'>
                
                <div className='navicon'>

                <img src={logo} alt="logo" className='logo'/>
               <span className='title'>
                    Social-Group
               </span>

                <span>

                </span>
                </div>
                
               
            </nav>
    )
}