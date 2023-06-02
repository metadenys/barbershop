import './barbers_table.scss';
import { useMemo } from 'react';
import { useTable } from "react-table";

const testDataBarbers = [
    {
        name: "DENYS",
        rank: "silver",
        bio: "Test Bio",
        photoUrl: "../assets/img/first_barber.jpg",
    },
    {
        name: "MAX",
        rank: "gold",
        bio: "Test Bio",
        photoUrl: "../assets/img/second_barber.jpg",
    },
    {
        name: "ARTHUR",
        rank: "platinum",
        bio: "Test Bio",
        photoUrl: "../assets/img/third_barber.jpg",
    }
]

function BarbersTable() {

    const barbersData = useMemo(() => testDataBarbers, [])

    const columns = useMemo(() => [
        {
            Header: "Ім'я",
            accessor: "name"
        },
        {
            Header: "Ранг",
            accessor: "rank"
        },
        {
            Header: "Фото",
            accessor: "photoUrl"
        }
    ], [])
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: barbersData })

    function isRank(value) {
        if (value==="rank") {
            return true
        } else {
            return false
        }
    }

    return (
        <div className='admin_barbers_table'>
            <div className='barbers_table_container'>
                <table {...getTableProps()} className='barbers_table'>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                <th>№</th>
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
                            return (
                                <tr {...row.getRowProps()}>
                                    <td>{row.index + 1}</td>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className={isRank(cell.column.id) ? `rank_${cell.value}` : undefined}>
                                            {cell.column.id === "photoUrl" ? <img src={cell.value} alt="" className="barber_miniphoto"/> : cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BarbersTable;