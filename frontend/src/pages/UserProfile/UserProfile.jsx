import "./UserProfile.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../user/UserContext";
import follow from "../../images/Follow.svg";
import feeds from "../../images/Feeds.svg";
import arrowleft from "../../images/ArrowLeft.svg";
import moremenu from "../../images/MoreMenu.svg";
import edit from "../../images/Edit.svg";
import plus from "../../images/Plus.svg";
import { Link, useNavigate } from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn";

const UserProfile = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser } = useContext(UserContext);
  const nav = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      setLoggedUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
    <InfoBar />
      {loggedUser ? (
        <>
          <section className="user-profile-section">
            <article className="user-profile-top">
              <div className="user-profile-header-left">
              <BackBtn/>
              <h2>{loggedUser.nickname}</h2>
              </div>

              <div className="user-profile-top-buttons">
                <Link to="/upload">
                <img src={plus} alt="plus-icon" />
                </Link>
                <Link to="edit">
                  <img src={edit} alt="edit-icon" />
                </Link>
                <img src={moremenu} alt="moremenu-icon" />
              </div>
            </article>
            <img
              src={loggedUser.image.url}
              alt=""
              className="user-profile-image"
            />
            <h2>{loggedUser.name}</h2>
            <h4>{loggedUser.profession}</h4>
            <p>{loggedUser.description}</p>
            <a href={loggedUser.domain}>{loggedUser.domain}</a>
            <article className="user-profile-numbers">
              <div className="user-profile-numbers-block">
                <h2>{loggedUser.posts.length}</h2>
                <p>Posts</p>
              </div>
              <div className="small-vertical-line"></div>
              <div className="user-profile-numbers-block">
                <h2>{loggedUser.amountOfFollowers}</h2>
                <p>Followers</p>
              </div>
              <div className="small-vertical-line"></div>
              <div className="user-profile-numbers-block">
                <h2>{loggedUser.amountOfFollowing}</h2>
                <p>Following</p>
              </div>
            </article>
            <button className="follow-btn">
              <img src={follow} alt="follow-icon" />
              Follow
            </button>
            <div className="horizontal-line"></div>
            <article className="user-profile-bottom">
              <div className="user-profile-bottom-buttons">
                <div className="feeds-btn">
                  <img src={feeds} alt="feeds-icon" />
                  <h5>Feeds</h5>
                </div>
              </div>
              <div className="user-profile-bottom-gallery">
                {loggedUser.posts?.map((item, index) => (
                  <img
                    src={item.image.url}
                    alt=""
                    key={index}
                    className="post-image" onClick={() => nav(`/home/${item._id}`)}
                  />
                ))}
              </div>
            </article>
          </section>
        </>
      ) : (
        <h2>Lädt</h2>
      )}
    </>
  );
};

export default UserProfile;
