import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss"

registerLocale("uk", uk);

function  MyDatePicker ({ handleSelectDate, values }) {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange =(date) => {
        setSelectedDate(date);
    }

    const filterSunday = (date)=> {
        return date.getDay() !== 0;
    }

    useEffect(() => { 
        if(values?.date) {
        setSelectedDate(values.date)
    }
    }, [values.date])

    return (
            <div className="datepicker_box">
                <DatePicker 
                    className="custom_datepicker"
                    popperClassName="custom-popper"
                    locale="uk"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Виберіть дату..."
                    minDate={new Date()}
                    maxDate={new Date().setDate(new Date().getDate() + 21)}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    onSelect={handleSelectDate}
                    filterDate={filterSunday}
                />
            </div>
        );
    }
export default MyDatePicker;