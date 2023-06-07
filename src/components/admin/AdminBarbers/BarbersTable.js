import './barbers_table.scss';
import { useMemo, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTable } from "react-table";
import * as Yup from 'yup'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import FormData from 'form-data'

/*
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
*/
function AddBarberModal() {

    const [ranksData, setRanksData] = useState([])

    useEffect(() => {
        const fetchRanksData = async () => {
            try {
                const response = await axios.get('https://localhost:5001/api/v1/ranks');
                setRanksData(response.data.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchRanksData();
    }, []);

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
            .required('*Обов\'язкове поле'),
        bio: Yup.string()
            .min(4, 'Опис занадто короткий!')
            .max(50, 'Опис занадто довгий!')
            .required('*Обов\'язкове поле')
    });

    const serverUrl = "https://localhost:5001/api/v1/barbers"

    const handleSubmit = async (values, { setSubmitting }) => {
        if (!values.photo) {
            setSubmitting(false);
            return;
        }
        const form = new FormData();
        form.append('FirstName', values.name);
        form.append('Description', values.bio);
        form.append('Photo', values.photo, values.photo.name);
        form.append('RankId', values.rank);
        const notifyError = () => toast.error("Упс!Щось пішло не так...")
        const notifySuccess = () => {
            toast.success("Успішно!");
            closeWindow()
        }

        await axios.post(serverUrl, form)
            .then(() => notifySuccess())
            .catch(() => notifyError())
    };

    return (
        <div>
            <button onClick={openWindow} className='table_button'>Додати</button>

            {isWindowOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <Formik
                            initialValues={{
                                name: "",
                                rank: "",
                                bio: "",
                                file: undefined
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >{({ setFieldValue }) => (
                            <Form>
                                <div className='add_barber_form'>
                                    <div className='add_barber_form_title'>Додати барбера</div>
                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="name">Ім'я барбера:</label>
                                            <Field type="text" id="name" name="name" />
                                        </div>
                                        <ErrorMessage name="name" component="div" className="error_add_barber" />
                                    </div>

                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="rank">Ранг:</label>
                                            <Field as="select" id="rank" name="rank">
                                                <option value="">Виберіть ранг</option>
                                                {ranksData.map((rank) => (
                                                    <option key={rank.id} value={rank.id}>
                                                        {rank.status}
                                                    </option>))}
                                            </Field>
                                        </div>
                                        <ErrorMessage name="rank" component="div" className="error_add_barber" />
                                    </div>

                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="file">Фото:</label>
                                            <input
                                                id='file'
                                                name="file"
                                                type="file"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue("photo", file);
                                                }}
                                                accept='.jpg, .png'
                                            />
                                        </div>
                                        <div className='error_add_barber'>*Обов'язкове фото в форматі .jpg або .png</div>
                                    </div>

                                    <div>
                                        <div className='barber_add_input'>
                                            <label htmlFor="bio">Опис:</label>
                                            <Field as="textarea" id="bio" name="bio" />
                                        </div>
                                        <ErrorMessage name="bio" component="div" className="error_add_barber" />
                                    </div>
                                </div>

                                <div className='add_barber_modal_buttons'>
                                    <button type="submit" className='add_barber_button'>Зберегти</button>
                                    <button onClick={closeWindow} className='add_barber_button'>Скасувати</button>
                                </div>
                            </Form>
                        )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
}

function BarbersTable() {

    const [barbersResponseData, setBarbersResponseData] = useState([]);

    const fetchBarbersData = async () => {
        try {
            const response = await axios.get('https://localhost:5001/api/v1/barbers'); //URL
            const transformedData = response.data.data.map(barber => ({
                id: barber.id,
                name: barber.firstName,
                bio: barber.description,
                rank: barber.rank.status,
                photoUrl: barber.photoUrl
            }));
            setBarbersResponseData(transformedData);
        } catch (error) {
            console.error('Error fetching barbers:', error);
        }
    };

    useEffect(() => {

        fetchBarbersData();

    }, []);

    const barbersData = useMemo(() => barbersResponseData, [barbersResponseData])

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
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                rtl={false}
                theme="light"
            />
        </div>
    )
}

export default BarbersTable;