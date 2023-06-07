import React, { useState, useEffect } from "react";
import { getYear, getMonth, getDate } from "date-fns";
import axios from "axios";
import moment from 'moment';
import Select from "react-select";
import "./timepicker.scss"

function DateTimeTransforming(timeString) {

    var date = new Date(timeString);
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    return (formattedTime);
}


function MyTimePicker({ handleSelectTime, values }) {

    const [busyHoursDate, setBusyHoursData] = useState([])

    useEffect(() => {
        const fetchHoursData = async (barberId, date) => {
            try {
                const response = await axios.get(`https://localhost:5001/api/v1/bookings/busy/${barberId}?Date=${date}`);
                console.log(response.data.data);
                const transformedData = response.data.data.map(time => ({
                    time: DateTimeTransforming(time.time),
                }));
                setBusyHoursData(transformedData);
            } catch (error) {
                console.error('Error fetching busy hours:', error);
            }
        };

        fetchHoursData(values.barber.id, moment(values.date).format('YYYY-MM-DD'));
    }, [values.date]);

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
        return (
            getYear(selectedDate) === getYear(today) &&
            getMonth(selectedDate) === getMonth(today) &&
            getDate(selectedDate) === getDate(today)
        );
    };
   const bookedHours = busyHoursDate.map(booking => booking.time);

   const thresholdTime = new Date();

    const availableHours = hours.filter(hour => {
        if (isDateToday(values?.date)) {
            const hourTime = new Date();
            const [hourValue, minuteValue] = hour.value.split(':');
            hourTime.setHours(hourValue);
            hourTime.setMinutes(minuteValue);
            return !bookedHours.includes(hour.value) && hourTime > thresholdTime;
        } else {
            return !bookedHours.includes(hour.value);
        }
    });

    const [selectedHour, setSelectedHour] = useState(null);

    const handleHourChange = (selectedOption) => {
        setSelectedHour(selectedOption);
        handleSelectTime(selectedOption.value);
    };

    useEffect(() => {
        if (values?.time) {
            const option = {
                value: values.time, label: values.time
            }
            setSelectedHour(option)
        }
    }, [values.time])

    const customNoOptionsMessage = () => "Немає доступних годин";

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