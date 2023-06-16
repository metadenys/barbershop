import './clients_table.scss';
import {  useMemo, useState, useEffect } from 'react';
import { useTable } from "react-table";
import { mainInterceptor } from '../../../services/axiosInterceptor/axiosInterceptor';

function ClientsTable() {
    
    const [clientsResponseData, setClientsResponseData] = useState([]);

    const fetchClientsData = async () => {
        try {
            const response = await mainInterceptor.get('clients');
            const transformedData = response.data.data.map(client => ({
                id: client.id,
                name: client.name,
                phoneNumber: client.phoneNumber,
                email: client.email,
            }));
            setClientsResponseData(transformedData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {

        fetchClientsData();

    }, []);

    const clientsData = useMemo(() => clientsResponseData, [clientsResponseData])

    const columns = useMemo(() => [
        {
            Header: "Ім'я",
            accessor: "name"
        },
        {
            Header: "Телефон",
            accessor: "phoneNumber"
        },
        {
            Header: "Email",
            accessor: "email"
        }
    ], [])
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: clientsData })

    return (
        <div className='admin_clients_table'>
            <div className='clients_table_container'>
                <table {...getTableProps()} className='clients_table'>
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
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
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

export default ClientsTable;