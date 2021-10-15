import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useTable } from "react-table";


function SongTable({ baseUrl }) {

    // SongTable is a work in progress -- 
    // @TODO is to create automatically generated Edit column || For that the Edit Route 
    // @TODO add each route to the table; make each cell editable, similar to the Edit forum 

    const [songlist, setSonglist] = useState([])
    const songsUrl = `songs/`
    const [loading, setLoading] = useState(true)

    useEffect(function () {
        Axios(baseUrl + songsUrl)
            .then((data) => {
                setSonglist(data.data)
                setLoading(false)

            })
            .catch(console.error)
    }, [baseUrl, songsUrl])

    const data = React.useMemo(
        () => {
            const object = songlist.map((song) => {
                return {
                    name: song.name,
                    status: song.status,
                    key: song.key,
                    bpm: song.bpm,
                    edit: 'Link to Edit'
                }
            })
            return object;

        },
        [songlist]
    );

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
                Header: "Key",
                accessor: "key"
            },
            {
                Header: "BPM",
                accessor: "bpm"
            },
            {
                Header: "Edit",
                accessor: "edit"
            },


        ],
        [songlist]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
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
