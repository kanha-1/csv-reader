import React from 'react'
import { Grid, Box } from '@mui/material'
import { makeStyles } from "@mui/styles"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ViewCsvData from './ViewCsvData';
const useStyles = makeStyles((theme) => ({
    drdBox: {
        border: '2px solid Black',
        height: "100px",
        width: "30%",
        marginTop: 50,
        cursor: "pointer",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
}));

function DragUpload() {
    const [CsvData, setCsvData] = React.useState([])
    const classes = useStyles()

    // const url = 'http://localhost:8080/api/upload'

    const uploadFile = (event) => {
        const fileReader = new FileReader();
        event.preventDefault();
        const file = event.dataTransfer.files[0]
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            fileReader.readAsText(file);
        }
    }
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setCsvData(array);
    };
    const headerKeys = Object.keys(Object.assign({}, ...CsvData));
    return (
        <Grid container justifyContent="center">
            <div className={classes.drdBox}
                onDragOver={(event) => {
                    event.preventDefault()
                }}
                onDrop={uploadFile}
            >
                <CloudUploadIcon />
                {/* <Box ml={2}>
                    {CsvData ? <Box>SelectedFile.csv</Box> :
                        <Box> Drag Your File</Box>
                    }
                </Box> */}.
                <Box> Drag Your File</Box>
            </div>
            {/* <Grid container justifyContent="center">
                <Box mt={4}>
                    <Button variant="contained" onClick={viewCsv}>View</Button>
                </Box>
            </Grid> */}

            <Grid item xs={10}>
                {CsvData.length > 0 && (
                    <Box mt={7}>
                        <ViewCsvData headerKeys={headerKeys} CsvData={CsvData} />
                    </Box>
                )}
            </Grid>
        </Grid>
    )
}

export default DragUpload