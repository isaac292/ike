
import { useSelector } from 'react-redux';
import styles from '../../styles/styles'
import EventCard from "./EventCard";

const Events = () => {
  const {allEvents,isLoading} = useSelector((state) => state.events);  
   
  return (
    <div>
     {
      !isLoading && (
        <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
      <h1
    data-aos="fade-up"
    data-aos-duration="500"
    data-aos-once="true"
    className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-900 to-black text-transparent bg-clip-text"
    style={{ fontSize: "30px" }}>Popular Events</h1>
      </div>

      <div className="w-full grid">
         {
          allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )
         }
         <h4>{
           allEvents?.length === 0 && (
            'No Events!'
           )
          }

         </h4>
      </div>
     
    </div>
      )
     }
  </div>
  )
}

export default Events