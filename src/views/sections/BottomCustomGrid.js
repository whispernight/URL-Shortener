import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import firebase from 'components/Firebase/firebase';
import { primaryColor } from "assets/jss/material-kit-react.js";
import { green } from '@material-ui/core/colors';
//Components
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//Icons/Logos
import firebaseLogo from "assets/img/firebase-logo.png";
import reactLogo from "assets/img/react.png";
import AddIcon from '@material-ui/icons/Add';
import TrendingUp from "@material-ui/icons/TrendingUp";
import HttpIcon from '@material-ui/icons/Http';

const styles = {
    imagesBuiltWith: {
        width: "100px !important"
    },
    plusIconColor: {
        color: primaryColor[0],
        fontSize: 60
    },
};
const useStyles = makeStyles(styles);


function BottomCustomGrid() {
    
    const [timesShortened, settimesShortened] = useState(0);
    const [timesRedirected, settimesRedirected] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        //console.log('Run useEffect');
        timesShortenedF();
        timesRedirectedF();
    }, []);

    
    function timesShortenedF() {
        var future = new Date();
        future.setDate(future.getDate() - 30);
        firebase.database().ref('timesShortened').orderByValue().startAt(future.getSeconds()).on("value", function (snapshot) {
            //console.log(snapshot.numChildren());
            settimesShortened(snapshot.numChildren());
        });
    }

    function timesRedirectedF() {
        var future = new Date();
        future.setDate(future.getDate() - 30);
        firebase.database().ref('totalClicks').orderByValue().startAt(future.getSeconds()).on("value", function (snapshot) {
            //console.log(snapshot.numChildren());
            settimesRedirected(snapshot.numChildren());
        });
    }


    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="center" >
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={9} sm={9} md={9}>
                            <Card>
                                <CardBody>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Grid item>
                                            <TrendingUp color="primary" style={{ fontSize: 80 }} />
                                        </Grid>
                                        <Grid item>
                                            <h3>{timesShortened} URLs shortened</h3>
                                        </Grid>
                                    </Grid>
                                </CardBody>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card>
                        <CardHeader>
                            <h3>Fast and simple URL shortener</h3>
                        </CardHeader>
                        <CardBody>
                            <p>
                                <strong>SMLL</strong> is a free URL shortener. You can use it for free! Transform long and ugly links into beautiful and pretty tracable short URLs.
                                Share your links in any social media platforms, emails, blogs or anywhere you want!
                            </p>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="center" >
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={9} sm={9} md={9}>
                            <Card>
                                <CardBody>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Grid item>
                                            <HttpIcon style={{ color: green[500], fontSize: 80 }} />
                                        </Grid>
                                        <Grid item>
                                            <h3 className={classes.cardCategory}>{timesRedirected} redirections</h3>
                                        </Grid>
                                    </Grid>
                                </CardBody>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={9} sm={9} md={9}>
                            <Card>
                                <CardBody>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item>
                                            <h3>Built With</h3>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item>
                                            <img src={firebaseLogo} alt="Firebase Logo" className={classes.imagesBuiltWith} />
                                        </Grid>
                                        <Grid item>
                                            <AddIcon className={classes.plusIconColor}></AddIcon>
                                        </Grid>
                                        <Grid item>
                                            <img src={reactLogo} alt="React Logo" className={classes.imagesBuiltWith} />
                                        </Grid>
                                    </Grid>
                                </CardBody>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );

}

export default BottomCustomGrid;