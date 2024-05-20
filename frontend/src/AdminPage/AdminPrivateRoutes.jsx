import {Navigate, Outlet } from 'react-router-dom'
import axios from "axios"
import { useEffect,useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



const PrivateRoutes = () => {

    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const [Authenticated, setAuthenticated] = useState(false);
    useEffect(() => {

        axios.get(`/api/CheckingAuth`).then(res=> {
            if(res.status === 200)
            {
                setAuthenticated(true);
            }
            setloading(false);

        });

        return () => {
            axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
                if(err.response.status === 401)
                {
                    swal("Unauthorized",err.response.data.message,"warning");
                    navigate('/connexion');
                }
                else if(err.response.status === 403)
                {
                    swal("Unauthorized",err.response.data.message,"warning");
                    navigate('/connexion');
                }
                else
                {
                    swal("Unauthorized",err.response.data.message,"warning");
                    navigate('/connexion');
                }
                return Promise.reject(err);
            });   
                    };
    }, []);


  

    if(loading)
    {
        return <h1>Loading...</h1>
    } 
    
    

    return (
        Authenticated ? <Outlet/> : <Navigate to='/connexion'/>
    )
    }
export default PrivateRoutes