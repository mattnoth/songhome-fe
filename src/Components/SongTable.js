import React, { useState, useEffect, useMemo } from 'react'
import Axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


import MaUTable from '@material-ui/core/Table'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'


import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'



import { useTable } from "react-table";
import { Link } from 'react-router-dom'

function SongTable({ baseUrl }) {

    // SongTable is a work in progress -- 
    //@TODO Integrate MUI table components 

    //** @const type state for songs */
    const [songlist, setSonglist] = useState([])
    const songsUrl = `songs/`
    const [loading, setLoading] = useState(true)

    //** fetch call for grabbing songs @- re to do, build a data store using redux*/

    useEffect(function () {
        Axios(baseUrl + songsUrl)
            .then((data) => {
                setSonglist(data.data)
                setLoading(false)
            })
            .catch(console.error)
    }, [baseUrl, songsUrl])


    //** data is req for react table; memoizes the row data by using the accessor as the key for the column  */
    const data = useMemo(
        () => {
            const object = songlist.map((song) => {
                return {
                    name: <Link to={`/song/${song.id}/`}> {song.name} </Link>,
                    key: song.key,
                    bpm: song.bpm,
                    status: song.status,
                    edit: <Link to={`/song/${song.id}/edit`}> EDIT </Link>
                }
            })
            return object;

        },
        [songlist]
    );

    //** memoizes column data, uses accessor as the key for data, and gives access to each header object */
    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name", // accessor is the "key" in the data
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
                Header: "Notes",
                accessor: "status",
            },
            {
                Header: "Edit",
                accessor: "edit"

            },


        ],
        []
    );

    /** Use Table is the basic hook for React table that deconstructes table's data and columns
     * @TODO -- add in MUI Themeing, add editable cells 
     */

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) {
        return (
            <CircularProgress />
        )
    }
    return (
        <TableContainer>
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell {...column.getHeaderProps()}>{column.render("Header")}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>

            </MaUTable>
        </TableContainer>
    );
}

export default SongTable;
