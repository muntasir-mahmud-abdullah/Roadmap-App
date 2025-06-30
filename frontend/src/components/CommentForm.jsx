import { useState } from "react";
import { useAuth } from "../store/Auth";
const CommentForm = ({
  serviceId,
  parentCommentId,
  onCommentPosted,
  initialContent = "",
  isEditing = false,
  commentId,
}) => {
  const { API, token } = useAuth();
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      setError("Content is required");
      return;
    }

    if (!token) {
      setError("Please log in to comment");
      return;
    }

    try {
      if (isEditing) {
        const response = await fetch(`${API}/api/auth/comments/${commentId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });
      } else {
        const response = await fetch(
          `${API}/api/auth/service/${serviceId}/comment`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, parentCommentId }),
          }
        );
      }
      setContent("");
      setError("");
      onCommentPosted();
    } catch (error) {
      setError(error.response?.data?.message || "Error submitting comment");
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={300}
        placeholder={isEditing ? "Edit your comment..." : "Post a comment..."}
        className=""
      />
      <button onClick={handleSubmit} className="">
        {isEditing ? "Update" : "Submit"}
      </button>
    </div>
  );
};

export default CommentForm;
