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
import { mainInterceptor } from '../../../services/axiosInterceptor/axiosInterceptor';

registerLocale("uk", uk);

function formatDateToUkrainian(dateString) {
    const formattedDate = dayjs(dateString).locale('uk').format('DD/MM/YYYY HH:mm');
    return formattedDate;
}

function formatDateToGet(date) {
    const formattedDate = dayjs(date);
    const formattedDateString = formattedDate.format('YYYY-MM-DD');
    return formattedDateString;
}

function formatStatus(status) {
    if (status === 0) {
        return 'Не підтверджено'
    } else if (status === 1) {
        return 'Підтверджено'
    } else if (status === 2) {
        return 'Скасовано'
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

function BookingTableRow({ row, onClickEvent, buttonsRef }) {

    function isStatus(value) {
        if (value === "Підтверджено" || value === "Не підтверджено" || value === "Скасовано") {
            return true
        } else {
            return false;
        }
    }

    function classFormatting(value) {
        if (value === "Підтверджено") {
            return "confirmed"
        } else if (value === "Не підтверджено") {
            return "unconfirmed";
        } else if (value === "Скасовано") {
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

    //Date picker and buttons functions
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [bookingsData, setBookingsData] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        
    }

    const filterSunday = (date) => {
        return date.getDay() !== 0;
    }
    const fetchBookingsData = async () => {
        try {
            const response = await mainInterceptor.get(`bookings/date?Date=${formatDateToGet(selectedDate)}`); //URL
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
            setBookingsData(transformedData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {

        fetchBookingsData();

    }, [selectedDate]);

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

    function onClickRefresh() {
        fetchBookingsData()
        console.log('Refresh data')
    }

    const patchBookingStatus = async (status) => {
        try {
            const statusChangeObj = {
                Id: selectedBookingId,
                status: status
            }
            await mainInterceptor.patch('bookings/update', statusChangeObj);
        } catch (error) {
            console.error('Error patching booking:', error);
        }
    };

    function onClickConfirm() {
        patchBookingStatus(1)
        setSelectedBookingStatus("Підтверджено")
        setTimeout(() => {
            fetchBookingsData()
        }, 500);
    }

    function onClickCancel() {
        patchBookingStatus(2)
        setSelectedBookingStatus("Скасовано")
        setTimeout(() => {
            fetchBookingsData()
        }, 500);
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