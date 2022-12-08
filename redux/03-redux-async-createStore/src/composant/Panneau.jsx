import { useSelector } from 'react-redux';

const Panneau = () => { 
    const users = useSelector((state) => state.userReducer) ;

    return <>
        <div className="card">
            <header className="card-header d-flex align-items-center">
                <img src="https://thispersondoesnotexist.com/image" className="card-img-top rounded-circle w-25 me-2" alt="thispersondoesnotexist"/>
                <h3 className="card-title fs-5 mb-0">{ users.length > 0 && users[0].nom}</h3>
                <p className="ms-auto badge bg-success mb-0">{users.length > 0 && users[0].like}</p>
            </header>
        </div>
    </>
}

export default Panneau ;