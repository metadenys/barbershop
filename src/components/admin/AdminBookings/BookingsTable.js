import './bookings_table.scss';
import "react-datepicker/dist/react-datepicker.css";
import { useMemo, useState, useEffect, useRef } from 'react';
import { useTable } from "react-table";
import { registerLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import uk from "date-fns/locale/uk";
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';

registerLocale("uk", uk);

function formatDateToUkrainian(dateString) {
    const formattedDate = dayjs(dateString).locale('uk').format('DD/MM/YYYY HH:mm');
    return formattedDate;
}

function formatStatus(status) {
    let statusTitle = ""
    if (status === 0) {
        return statusTitle = 'Не підтверджено'
    } else if (status === 1) {
        return statusTitle = 'Підтверджено'
    } else if (status === 2) {
        return statusTitle = 'Скасовано'
    }
    return 'error';
}

const useOutsideClick = (ref, callback, ...additionalRefs) => {
    const handleClick = e => {
        if (ref.current &&
            !ref.current.contains(e.target) &&
            !additionalRefs.some(ref => ref.current && ref.current.contains(e.target))) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};
/*
const testDataBookings = [
    {
        id: "12315",
        barberName: "Denys",
        serviceName: "ServiceName1",
        date: "26/05/2023",
        time: "18:00",
        totalPrice: 100,
        client: {
            "name": "TEST NAME1",
            "phone": "0930000000"
        },
        status: "confirmed",
    },
    {
        id: "23535",
        barberName: "Arthur",
        serviceName: "ServiceName2",
        date: "26/05/2023",
        time: "18:00",
        totalPrice: 100,
        client: {
            "name": "TEST NAME2",
            "phone": "0930000001"
        },
        status: "unconfirmed"
    },
    {
        id: "15634",
        barberName: "Arthur",
        serviceName: "ServiceName2",
        date: "26/05/2023",
        time: "18:00",
        totalPrice: 100,
        client: {
            "name": "TEST NAME2",
            "phone": "0930000001"
        },
        status: "cancelled"
    },
    {
        id: "15634",
        barberName: "Arthur",
        serviceName: "ServiceName2",
        date: "26/05/2023",
        time: "18:00",
        totalPrice: 100,
        client: {
            "name": "TEST NAME2",
            "phone": "0930000001"
        },
        status: "cancelled"
    }
]
*/
function BookingTableRow({ row, onClickEvent, buttonsRef }) {

    function isStatus(value) {
        if (value === "Підтверджено" || value === "Не підтверджено" || value === "Скасовано") {
            return true
        } else {
            return false;
        }
    }

    function classFormatting(value) {
        if (value === "Підтверджено"){
            return "confirmed"
        } else if (value === "Не підтверджено") {
            return "unconfirmed";
        } else if(value === "Скасовано") {
            return "cancelled"
        }
    }

    const [isActive, setActive] = useState(false)

    const rowRef = useRef()

    const handleClickOutside = () => {
        setActive(false)
    }

    useOutsideClick(rowRef, handleClickOutside, buttonsRef)

    const handleClick = () => {
        setActive(true)
        onClickEvent(row.values)
    }

    return (
        <tr ref={rowRef} {...row.getRowProps()} onClick={handleClick} className={isActive ? "table_row_active" : "table_row"}>
            {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className={isStatus(cell.value) ? `status_${classFormatting(cell.value)}` : undefined}>
                    {cell.column.id === "id" ? row.index + 1 : cell.render("Cell")}
                </td>
            ))}
        </tr>
    );
}
function BookingsTable() {

    const [bookingsData, setBookingsData] = useState([]);

    useEffect(() => {
        const fetchBookingsData = async () => {
            try {
                const response = await axios.get('https://localhost:5001/api/v1/bookings'); //URL
                const transformedData = response.data.data.map(booking => ({
                    id: booking.id,
                    barberName: booking.barber.firstName,
                    serviceName: booking.service.title,
                    dateTime: formatDateToUkrainian(booking.time),
                    totalPrice: booking.totalPrice + "UAH",
                    clientName: booking.client.name,
                    clientPhone: booking.client.phoneNumber,
                    status: formatStatus(booking.status),
                }));
                console.log(transformedData);
                setBookingsData(transformedData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookingsData();
    }, []);

    const bookingsTableData = useMemo(() => bookingsData, [bookingsData])

    const columns = useMemo(() => [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Барбер",
            accessor: "barberName"
        },
        {
            Header: "Послуга",
            accessor: "serviceName"
        },
        {
            Header: "Дата",
            accessor: "dateTime"
        },
        {
            Header: "Ціна",
            accessor: "totalPrice"
        },
        {
            Header: "Ім'я клієнта",
            accessor: "clientName"
        },
        {
            Header: "Телефон клієнта",
            accessor: "clientPhone"
        },
        {
            Header: "Статус",
            accessor: "status"
        }
    ], [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: bookingsTableData });

    const [selectedBookingId, setSelectedBookingId] = useState()
    const [selectedBookingStatus, setSelectedBookingStatus] = useState()

    const [buttonStyleCancel, setButtonStyleCancel] = useState({ display: 'none' });
    const [buttonStyleConfirm, setButtonStyleConfirm] = useState({ display: 'none' });

    useEffect(() => {
        if (selectedBookingId && selectedBookingStatus === "Підтверджено") {
            setButtonStyleCancel({ display: 'block' })
            setButtonStyleConfirm({ display: 'none' })
        } else if (selectedBookingId && selectedBookingStatus === "Не підтверджено") {
            setButtonStyleCancel({ display: 'block' })
            setButtonStyleConfirm({ display: 'block' })
        } else {
            setButtonStyleCancel({ display: 'none' })
            setButtonStyleConfirm({ display: 'none' })
        }
    }, [selectedBookingId, selectedBookingStatus]);

    function onClickEvent(values) {
        if (values.status !== "Скасовано") {
            setSelectedBookingId(values.id)
            setSelectedBookingStatus(values.status)
            console.log(values.id)
        } else {
            setSelectedBookingId(null)
        }
    }



    const tableRef = useRef()
    const buttonsRef = useRef()

    const handleClickOutside = () => {
        setSelectedBookingId(null)
    }

    useOutsideClick(tableRef, handleClickOutside, buttonsRef)

    //Date picker and buttons functions
    const [selectedDate, setSelectedDate] = useState(new Date());

    function onClickRefresh() {
        console.log('Refresh data')
    }
    function onClickConfirm() {
        console.log({ status: 1, id: selectedBookingId })
        onClickRefresh()
    }

    function onClickCancel() {
        console.log({ status: 2, id: selectedBookingId })
        onClickRefresh()
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onClickRefresh();
    }

    const filterSunday = (date) => {
        return date.getDay() !== 0;
    }

    return (
        <div className='admin_bookings_table'>
            <div className='bookings_table_container'>
                <table {...getTableProps()} className='bookings_table' id='bookings_table' ref={tableRef}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className='tbody_styles'>
                        {rows?.map((row) => {
                            prepareRow(row)
                            return <BookingTableRow row={row} onClickEvent={onClickEvent} setSelectedBookingId={setSelectedBookingId} buttonsRef={buttonsRef} />
                        })}
                    </tbody>
                </table>
            </div>
            <div className='table_buttons_container' ref={buttonsRef}>
                <div className="datepicker_box_admin">
                    <DatePicker
                        className="custom_datepicker_admin"
                        popperClassName="custom-popper"
                        locale="uk"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Виберіть дату..."
                        selected={selectedDate}
                        onChange={handleDateChange}
                        filterDate={filterSunday}
                    />
                </div>
                <button className='table_button' onClick={onClickRefresh}>Оновити</button>
                <button className='table_button_confirm' style={buttonStyleConfirm} onClick={onClickConfirm}>Підтвердити</button>
                <button className='table_button_cancel' style={buttonStyleCancel} onClick={onClickCancel}>Скасувати</button>
            </div>
        </div>
    );
}

export default BookingsTable;