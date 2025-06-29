import { useParams, Link } from "react-router";
import { useAuth } from "../store/Auth";
const details = () => {
  const { services } = useAuth();
  let params = useParams();
  const serviceItem = services.find((service) => service._id === params.id);
  const {_id,title,description,category,status,upvotesCount} = serviceItem;

  const [serviceItem,setServicesItem] = useState(null);
  const [comments,setcomments] = useState([]);
  const [editingCommentId,setEditingCommentId] = useState(null);
  const [editingContent,setEditingContent] = useState("");
  const userId =
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Category:{category}</p>
      <p>Status: {status}</p>
      <p>Upvotes : {upvotesCount}</p>
      <Link to="/service" className="btn-primary">
          Back To Services
      </Link>
    </div>
  );
};

export default details;
