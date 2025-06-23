import { useAuth } from "../store/Auth";
import {useEffect} from 'react';
const Service = () => {
  const { services } = useAuth();
      return (
      <section>
        <div className="container">
          <h1 className="text-2xl">{services.length} Services</h1>
        </div>
        <div className="container grid grid-cols-3">
          {services.map((service) => {
          return  <div className="card border-2 m-4 p-4" key={service._id}>
              <h1>{service.title}</h1>
              <p>{service.description}</p>
              <p>{service.category}</p>
              <p>{service.status}</p>
              <p>{service.upvoteCount}</p>
            </div>;
          })}
        </div>
      </section>
    );
};

export default Service;
