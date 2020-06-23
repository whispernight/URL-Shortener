import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";




const styles = {
    primaryHeader: {
        color: "#1976d2 !important"
    },
    headerTitle: {
        height: "120px"
    }
};
const useStyles = makeStyles(styles);


function CustomHeader() {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" alignItems="center" className={classes.headerTitle}>
            <Grid item>
                <h1 classes={classes.primaryHeader}>Welcome to <strong>SMLL</strong></h1>
            </Grid>
        </Grid>
    );

}

export default CustomHeader;