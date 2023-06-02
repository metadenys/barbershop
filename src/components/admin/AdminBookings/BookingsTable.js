import './bookings_table.scss';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useTable } from "react-table";

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
    }
]

function BookingTableRow({ row, onClickEvent, buttonsRef }) {

    function isStatus(value) {
        if (value === "confirmed" || value === "unconfirmed" || value === "cancelled") {
            return true
        } else {
            return false;
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
                <td {...cell.getCellProps()} className={isStatus(cell.value) ? `status_${cell.value}` : undefined}>
                    {cell.column.id === "id" ? row.index + 1 : cell.render("Cell")}
                </td>
            ))}
        </tr>
    );
}
function BookingsTable() {

    const bookingsData = useMemo(() => testDataBookings, [])

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
            accessor: "date"
        },
        {
            Header: "Час",
            accessor: "time"
        },
        {
            Header: "Ціна",
            accessor: "totalPrice"
        },
        {
            Header: "Ім'я клієнта",
            accessor: "client.name"
        },
        {
            Header: "Телефон клієнта",
            accessor: "client.phone"
        },
        {
            Header: "Статус",
            accessor: "status"
        }
    ], [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: bookingsData });

    const [selectedBookingId, setSelectedBookingId] = useState()
    const [selectedBookingStatus, setSelectedBookingStatus] = useState()

    const [buttonStyleCancel, setButtonStyleCancel] = useState({ display: 'none' });
    const [buttonStyleConfirm, setButtonStyleConfirm] = useState({ display: 'none' });

    useEffect(() => {
        if (selectedBookingId && selectedBookingStatus === "confirmed") {
            setButtonStyleCancel({ display: 'block' })
            setButtonStyleConfirm({ display: 'none' })
        } else if (selectedBookingId && selectedBookingStatus === "unconfirmed") {
            setButtonStyleCancel({ display: 'block' })
            setButtonStyleConfirm({ display: 'block' })
        } else {
            setButtonStyleCancel({ display: 'none' })
            setButtonStyleConfirm({ display: 'none' })
        }
    }, [selectedBookingId]);

    function onClickEvent(values) {
        if (values.status !== "cancelled") {
            setSelectedBookingId(values.id)
            setSelectedBookingStatus(values.status)
            console.log(values.id)
        } else {
            setSelectedBookingId(null)
        }
    }
    
    function onClickRefresh() {
        console.log('Refresh data')
    }

    function onClickConfirm() {
        console.log({ status: 'confirmed', id: selectedBookingId })
    }
    
    function onClickCancel() {
        console.log({ status: 'cancelled', id: selectedBookingId })
    }

    const tableRef = useRef()
    const buttonsRef = useRef()

    const handleClickOutside = () => {
        setSelectedBookingId(null)
    }

    useOutsideClick(tableRef, handleClickOutside, buttonsRef)

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
                            return <BookingTableRow row={row} onClickEvent={onClickEvent} setSelectedBookingId={setSelectedBookingId} buttonsRef={buttonsRef}/>
                        })}
                    </tbody>
                </table>
            </div>
            <div className='table_buttons_container' ref={buttonsRef}>
                <button className='table_button' onClick={onClickRefresh}>Оновити</button>
                <button className='table_button_confirm' style={buttonStyleConfirm} onClick={onClickConfirm}>Підтвердити</button>
                <button className='table_button_cancel' style={buttonStyleCancel} onClick={onClickCancel}>Скасувати</button>
            </div>
        </div>
    );
}

export default BookingsTable;