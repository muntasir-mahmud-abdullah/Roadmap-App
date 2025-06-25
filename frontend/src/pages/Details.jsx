import { useParams } from "react-router";
import { useAuth } from "../store/Auth";
const details = () => {
  const { services } = useAuth();
  let params = useParams();
  console.log(params.id);
  console.log(services);
  const serviceItem = services.find((service) => service._id === params.id);
  const {_id,title,description,category,status,upvotesCount} = serviceItem;
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default details;
