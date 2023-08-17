import './UserInfoComments.css'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import MoreMenu from '../../images/MoreMenu.png'
import { RefreshContext } from '../../user/RefreshContext'

const UserInfoComments = (props) => {
    const {refresh, setRefresh} = useContext(RefreshContext)
    const [userData, setUserData] = useState()
    const userId = props.user

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/user/${userId}`)
            setUserData(data)
        }
        fetchData()
    },[refresh])

    return ( 
        <>
            { userData ? (
                <figure className='user-info-bar'>
                <div className='user-info-left'>
                <img className="profile-avatar" src={userData[0].image.url} alt="profile-avatar" />
                <div className='user-info-text'>
                    <h4>{userData[0].name}</h4>
                    <p className='profession'>{userData[0].profession}</p>
                </div>
                </div>
                <img className="more-menu" src={MoreMenu} alt="MoreMenu" />
            </figure>
            ) : (
                <p>Lädt..</p>
            )}
        </>
     );
}
 
export default UserInfoComments;