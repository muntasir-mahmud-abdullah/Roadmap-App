import { useState } from "react";
import { Link, useParams } from "react-router";
import Comment from "../components/Comment.jsx";
import CommentForm from "../components/CommentForm.jsx";
import { useAuth } from "../store/Auth";
const details = () => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const { services, user, API, token, userId } = useAuth();
  let params = useParams();
  const serviceItem = services.find((service) => service._id === params.id);
  const { _id, title, description, category, status, upvotesCount } =
    serviceItem;

  console.log(_id);
  const handleCommentPosted = async () => {
    const commentsResponse = await fetch(
      `${API}/api/auth/service/${_id}/comments`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await commentsResponse.json();
    setComments(data);
    console.log(data);
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleDelete = async (commentId) => {
    try {
      let response = await fetch(`${API}/api/auth/commensts/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      handleCommentPosted();
    } catch (error) {
      console.log("Error deleting comment: ", error);
    }
  };

  const handleReply = (parentCommentId) => {
    setEditingCommentId(parentCommentId);
    setEditingContent("");
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Category:{category}</p>
      <p>Status: {status}</p>
      <p>Upvotes : {upvotesCount}</p>
      <div className="">
        <h2>Comments</h2>
        <CommentForm
          serviceId={_id}
          parentCommentId={editingCommentId}
          onCommentPosted={handleCommentPosted}
          initialContent={editingContent}
          isEditing={!!editingCommentId}
          commentId={editingCommentId}
        />
        {comments.map((comment) => (
          <Comment
            key={comments._id}
            comment={comment}
            userId={userId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReply={handleReply}
          />
        ))}
      </div>
      <Link to="/service" className="btn-primary">
        Back To Services
      </Link>
    </div>
  );
};

export default details;
