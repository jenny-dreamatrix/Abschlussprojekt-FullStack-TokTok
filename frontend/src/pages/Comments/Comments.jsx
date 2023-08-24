import InfoBar from "../../components/InfoBar/InfoBar";
import { useEffect, useState, useContext } from "react";
import "./Comments.css";
import { useParams } from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn";
import { RefreshContext } from "../../user/RefreshContext";
import axios from "axios";
import UserInfoBar from "../../components/UserInfoBar/UserInfoBar";
import Message from "../../images/Message.svg";
import messagelight from "../../images/message-light.svg";
import CommentInput from "../../components/CommentInput/CommentInput";
import CommentList from "../../components/CommentList/CommentList";
import LikesPosts from "../../components/Likes/LikesPosts";
import CommentsNumber from "../../components/CommentsNumber/CommentsNumber";
import { ThemeContext } from "../../user/ThemeContext";

const Comments = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const params = useParams();
  const [postData, setPostData] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/post/${params.id}`);
      setPostData(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <div
        className={theme ? "nav-fixed-wrapper-dark" : "nav-fixed-wrapper-light"}
      >
      {/* <InfoBar /> */}
      <div className="nav-fixed-wrapper">
        <div className="comments-header">
          <div className="comments-header-left">
            <BackBtn />
            <h2>Comments</h2>
          </div>
          {theme ? (
            <img src={messagelight} alt="Message" className="share-img" />
          ) : (
            <img src={Message} alt="Message" className="share-img" />
          )}
        </div>
      </div>

      {postData ? (
        <>
          <section className="post-detail-section">
            <UserInfoBar post={postData} />
            <article className="post-detail-article">
              {postData.caption && (
                <>
                  <p className="caption">{postData.caption.split("#")[0]}</p>
                  {postData.caption.includes("#") && (
                    <p className="hashtags">
                      {postData.caption
                        .split("#")
                        .slice(1)
                        .map((tag, index) => (
                          <span key={index}>#{tag}</span>
                        ))}
                    </p>
                  )}
                </>
              )}
              <p className="profession">{postData.time}</p>
              <figure className="post-detail-likes-and-comments">
                <LikesPosts amountOfLikes={postData.amountOfLikes} postId={params.id} />
                <CommentsNumber post={postData} postId={params.id} />
              </figure>
            </article>
          </section>
          <CommentList postData={postData} />
          <CommentInput postId={params.id} />
        </>
      ) : (
        <p></p>
      )}
      </div>
    </>
  );
};

export default Comments;
