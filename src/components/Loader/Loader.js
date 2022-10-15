import { Puff } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';



export const Loader = () => {
    return (
        <Puff
        height="80"
        width="80"
        radisu={1}
        color="grey"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass="Loader"
        visible={true}
        
        />
    )
}


