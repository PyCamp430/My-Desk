import React, {useState} from "react";
import Calender from "react-calendar";
import "./Calenders.css";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

const Calenders = () => {
    const [caldate, setCaldate] = useState(new Date());

    const handleChange = (e) => {
      setCaldate(e);
    }

    return (
      <div>
        <Calender
          onChange={handleChange}
          value={caldate}
        />
        <p id="cal">Selected date is <b>{moment(caldate).format('MMMM Do YYYY')}</b></p>
      </div>
    );
}

export default Calenders;
