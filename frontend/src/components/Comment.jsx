const Comment = ({ comment, userId, onEdit, onDelete, onReply }) => {
  const isOwner = comment.userId === userId;

  return (
    <div className={`bg-(--bg-primary) p-2 ml-${comment.depth + 4}`}>
      <p>{comment.content}</p>
      <p>
        By {comment.userId} at
        {new Date(comment.createdAt).toLocaleDateString()}
      </p>
      {isOwner && (
        <div className="">
          <button
            onClick={() => onEdit(comment._id, comment.content)}
            className=""
          >
            Edit
          </button>
          <button onClick={() => onDelete(comment._id)} className="">
            Delete
          </button>
        </div>
      )}
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment
            key={reply._id}
            comment={reply}
            userId={userId}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
          />
        ))}
    </div>
  );
};

export default Comment;
