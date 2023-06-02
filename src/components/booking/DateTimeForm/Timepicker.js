import React, { useState, useEffect } from "react";
import { getYear, getMonth, getDate } from "date-fns";
import moment from 'moment';
import Select from "react-select";
import "./timepicker.scss"

function MyTimePicker({ handleSelectTime, values }) {

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            boxShadow: 'none',
            fontSize: '20px',
            borderRadius: '50px',
            padding: '6px 10px 5px 25px',
            borderColor: 'gray',
            '&:hover': {
                boxShadow: '0px 0px 10px 2px rgba(100, 100, 100, 0.7)',
            }

        }),
        dropdownIndicator: (styles) => {
            return {
                ...styles,
                color: 'lightgray'
            };
        },
        option: (styles, { isFocused, isSelected, state }) => {
            let backgroundColor = 'white';
            let color = 'black'
            if (isSelected) {
                backgroundColor = '#000';
                color = 'white'
            } else if (isFocused) {
                backgroundColor = 'lightgray';
            }
            if (state === 'active') {
                backgroundColor = 'gray';
            }
            return {
                ...styles,
                fontSize: '20px',
                backgroundColor,
                color,
                '&:active': {
                    backgroundColor: 'rgb(210,210,210)'
                }
            };
        },
    }

    const bookings = [
        { id: '1', barberId: '1', date: '01/06/2023', time: '15:00' },
        { id: '2', barberId: '2', date: '01/06/2023', time: '16:00' },
        { id: '3', barberId: '1', date: '01/06/2023', time: '17:00' },
        { id: '4', barberId: '3', date: '01/06/2023', time: '12:00' },
        { id: '5', barberId: '3', date: '01/06/2023', time: '15:00' },
        { id: '6', barberId: '2', date: '02/06/2023', time: '17:00' },
        { id: '7', barberId: '1', date: '02/06/2023', time: '10:00' },
        { id: '8', barberId: '2', date: '03/06/2023', time: '11:00' },
        { id: '9', barberId: '1', date: '03/06/2023', time: '18:00' },
        { id: '10', barberId: '1', date: '03/06/2023', time: '19:00' },
    ];

    const hours = [
        { value: "10:00", label: "10:00" },
        { value: "11:00", label: "11:00" },
        { value: "12:00", label: "12:00" },
        { value: "14:00", label: "14:00" },
        { value: "15:00", label: "15:00" },
        { value: "16:00", label: "16:00" },
        { value: "17:00", label: "17:00" },
        { value: "18:00", label: "18:00" },
        { value: "19:00", label: "19:00" },
        { value: "20:00", label: "20:00" }
    ];

    const isDateToday = (selectedDate) => {
        const today = new Date();
        moment.defaultFormat='DD/MM/YYYY';
        selectedDate = Date.parse(moment(values.date, moment.defaultFormat).toDate())
        return (
          getYear(selectedDate) === getYear(today) &&
          getMonth(selectedDate) === getMonth(today) &&
          getDate(selectedDate) === getDate(today)
        );
      };

    const filteredBookings = bookings.filter(booking => {
        const isDateValid = booking.date === values.date;  
        const isBarberMatch = booking.barberId === values.barber.id;
        return isDateValid && isBarberMatch;
    });
    
    const bookedHours = filteredBookings.map(booking => booking.time);
    // const availableHours = hours.filter(hour => !bookedHours.includes(hour.value));

    const thresholdTime = new Date();

    const availableHours = hours.filter(hour => {
        if (isDateToday(values?.date)){
        const hourTime = new Date();
        const [hourValue, minuteValue] = hour.value.split(':');
        hourTime.setHours(hourValue);
        hourTime.setMinutes(minuteValue);
        return !bookedHours.includes(hour.value) && hourTime > thresholdTime;
        } else {
            return !bookedHours.includes(hour.value);
        }
      });



    const [selectedHour, setSelectedHour] = useState("");

    const handleHourChange = (selectedOption) => {
        setSelectedHour(selectedOption);
        handleSelectTime(selectedOption.value);
    };

    useEffect (() => {
        if(values?.time){
            const option = {
                value: values.time, label: values.time
            }
            setSelectedHour(option)
        }
    }, [values.time])

    const customNoOptionsMessage = () => "Немає доступних годин";

    return (
        <div className="timepicker_box">
            <Select
                options={availableHours}
                onChange={handleHourChange}
                value={selectedHour}
                placeholder="Виберіть годину..."
                noOptionsMessage={customNoOptionsMessage}
                styles={colourStyles} isSearchable={false}
                isDisabled={values.date ? false : true}

            />
        </div>
    );
}
export default MyTimePicker;