// import './Home.css'
import {useNavigate} from 'react-router-dom'



function Home(){
    const navigate = useNavigate();
    const goToform = () =>{
        navigate("/PCCForm")
    }
    const goTostatus = () => {
        navigate("/PCCStatus")
    }
    const adminLogin = () => {
        navigate("/Admin")
    }
    const report = () => {
        navigate('/report')
    }
    return <>
        <div>
            <button onClick={goToform}>Start New Application</button>
            <button onClick={goTostatus}>Review your status</button>
            <button onClick={adminLogin} >Admin login</button>
            <button onClick={report}>Report a crime</button>
        </div>
    </>
}
export default Home 