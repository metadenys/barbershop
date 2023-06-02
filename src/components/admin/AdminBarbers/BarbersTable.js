import './barbers_table.scss';
import { useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
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

function AddBarberModal() {
    const [isWindowOpen, setIsWindowOpen] = useState(false);

    const openWindow = () => {
        setIsWindowOpen(true);
    };

    const closeWindow = () => {
        setIsWindowOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Ім\'я занадто коротке!')
            .max(50, 'Ім\'я занадто довге!')
            .required('*Обов\'язкове поле'),
        rank: Yup.string()
            .min(2, 'Ім\'я занадто коротке!')
            .max(50, 'Ім\'я занадто довге!')
            .required('*Обов\'язкове поле')
    });

    return (
        <div>
            <button onClick={openWindow} className='table_button'>Додати</button>

            {isWindowOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <Formik
                            initialValues={{
                                name: '',
                                rank: '',
                                bio: '',
                                photo: null,
                            }}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                alert(JSON.stringify(values, null, 2));
                            }}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <div className='add_barber_form'>
                                    <div className='add_barber_form_title'>Додати барбера</div>
                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="name">Ім'я барбера:</label>
                                            <Field type="text" id="name" name="name" />
                                        </div>
                                        <ErrorMessage name="name" component="div" className="error" />
                                    </div>

                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="rank">Ранг:</label>
                                            <Field as="select" id="rank" name="rank">
                                                <option value="">Виберіть ранг</option>
                                                <option value="Silver">Silver</option>
                                                <option value="Gold">Gold</option>
                                                <option value="Platinum">Platinum</option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="rank" component="div" className="error" />
                                    </div>

                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="photo">Фото:</label>
                                            <Field type="file" id="photo" name="photo" />
                                        </div>
                                        <ErrorMessage name="photo" component="div" className="error" />
                                    </div>

                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="bio">Опис:</label>
                                            <Field as="textarea" id="bio" name="bio" />
                                        </div>
                                        <ErrorMessage name="bio" component="div" className="error" />
                                    </div>
                                </div>

                                <div className='add_barber_modal_buttons'>
                                    <button type="submit" className='add_barber_button'>Зберегти</button>
                                    <button onClick={closeWindow} className='add_barber_button'>Скасувати</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
}

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
        if (value === "rank") {
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
                                            {cell.column.id === "photoUrl" ? <div className='miniphoto_wrapper'><img src={cell.value} alt="" className="barber_miniphoto" /></div> : cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='table_buttons_container'>
                <AddBarberModal />
            </div>
        </div>
    )
}

export default BarbersTable;