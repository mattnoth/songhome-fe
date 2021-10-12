import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
import { useTable } from "react-table";


// import style from "./styles.css";


function SongTable({ baseUrl }) {

    const [songlist, setSonglist] = useState([])
    const songsUrl = `songs/`

    const [loading, setLoading] = useState(true)

    React.useEffect(function () {
        Axios(baseUrl + songsUrl)
            .then((data) => {
                setSonglist(data.data)

                setLoading(false)

            })
            .catch(console.error)
    }, [])

    const data = React.useMemo(
        () => {
            console.log(songlist)

            const object = songlist.map((song) => {
                return {
                    name: song.name,
                    status: song.status,
                    FooBar: "hello"
                }
            })
            return object;

        },
        [songlist]
    );


    //map the song list that i can add an edit key too 

    // const parseColumnsFromSeedData = () => {

    //     let returnObject ={ 
    //         Header: songlist.
    //         accessor
    //     }

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name", // accessor is the "key" in the data
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "FooBar",
                accessor: "FooBar"
            }

        ],
        [songlist]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // footerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) {
        return (
            <div>loading....</div>
        )

    }

    return (
        <>
            {
                console.log(songlist, "in jsx")

            }

            <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                {/* <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps}>{column.render("Footer")}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
            </table>
        </>
    );
}

export default SongTable;
