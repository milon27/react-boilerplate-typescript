import Main from '../../layouts/dashboard/Main'
import ProtectedPage from '../../layouts/ProtectedPage';


const Home = () => {


    return (
        <ProtectedPage>
            <Main title="Home Page">
                <h1>Home....</h1>
            </Main>
        </ProtectedPage>
    )
}

export default Home
