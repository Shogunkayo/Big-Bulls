import bullBtn from '../assets/whitebull.png'
import Form from "./form";

const Navbar = () => {

    let colors = ['#94C595', '#393E41']
    return (
        <div className="nav-container">
            <div>
                <img src={bullBtn} alt="bull"/>
            </div>
            <div className='nav-form'>
                <Form colors={colors}></Form>
            </div>
        </div>
    );
}
 
export default Navbar;