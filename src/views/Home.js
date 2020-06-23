import React, { useState, useEffect } from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import firebase from 'components/Firebase/firebase';
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import firebaseLogo from "firebase-logo.png";
import reactLogo from "react.png";
import AddIcon from '@material-ui/icons/Add';
import { primaryColor } from "jss/baseStyle.js";
import TrendingUp from "@material-ui/icons/TrendingUp";
import HttpIcon from '@material-ui/icons/Http';
import { green } from '@material-ui/core/colors';


const styles = {
    sideToSide: {
        backgroundColor: "#3c4858",
        color: "#eeeeee",
        height: "200px"
    },
    primaryHeader: {
        color: "#1976d2 !important"
    },
    imagesBuiltWith: {
        width: "100px !important"
    },
    plusIconColor: {
        color: primaryColor[0],
        fontSize: 60
    },
    gridContent: {
        direction: "row",
        justify: "center",
        alignItem: "center"
    },
    customChartTimesShortened: {
        color: "#ffffff"
    },
    cardCategory: {
        color: "#3c4858"
    },
    cardTitle: {
        color: "#3c4858"
    },
    headerTitle: {
        height: "120px"
    },
    grid: {
        marginLeft: "10px",
        marginRight: "10px"
    },
    inputColor: {
        color: "#FFF"
    }
};


const useStyles = makeStyles(styles);


function Home() {
    const classes = useStyles();

    const [originalURL, setoriginalURL] = useState("");
    const [invalidURL, setinvalidURL] = useState(true);
    const [resultURL, setresultURL] = useState("");
    const [timesShortened, settimesShortened] = useState(0);
    const [timesRedirected, settimesRedirected] = useState(0);


    useEffect(() => {
        //console.log('Run useEffect');
        timesShortenedF();
        timesRedirectedF();
    }, []);


    const createRedirectURLRecord = (event, value) => {
        //console.log("New Short URL: " + originalURL);
        if (originalURL === "")
            return;
        let newURLRecord = {
            originalURL: originalURL,
            clicks: []
        }
        let newKey = firebase.database().ref('shortenedURLS').push(newURLRecord).key;
        firebase.database().ref('timesShortened/').push(Date.now());
        let newShortURL = window.location.href + newKey;
        //console.log("New Short URL: " + newShortURL);
        setresultURL(newShortURL);
    }

    const tryAgainReset = (event, value) => {
        setinvalidURL(true);
        setresultURL("");
    }

    function validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

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


    const handleChangeURL = (prop) => (event) => {
        //console.log(event.target.value);
        if (setinvalidURL(!validateUrl(event.target.value))) {
            return;
        }
        setinvalidURL(false);
        setoriginalURL(event.target.value);
    };

    return (
        <div>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.headerTitle}>
                <Grid item>
                    <h1 classes={classes.primaryHeader}>Welcome to <strong>SMLL</strong></h1>
                </Grid>
            </Grid>
            {resultURL === "" &&
                <Grid container direction="row" justify="center" alignItems="center" className={classes.sideToSide}>
                    <Grid item className={classes.grid + " " + classes.inputColor} xs={6} sm={6} md={6}>
                        <CustomInput
                            labelText="URL"
                            id="url"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                onChange: handleChangeURL(),
                                className: classes.inputColor
                            }}
                            success={!invalidURL}
                        />
                    </Grid>
                    <Grid item className={classes.grid} xs={6} sm={2} md={2}>
                        <Button
                            color="primary"
                            onClick={createRedirectURLRecord}
                            disabled={invalidURL}
                            isCenterMain>
                            Shorten URL!</Button>
                    </Grid>
                </Grid>
            }
            {resultURL !== "" &&
                <Grid container direction="row" justify="center" alignItems="center" className={classes.sideToSide}>
                    <Grid item className={classes.grid} xs={6} sm={6} md={6}>
                        <h2>{resultURL}</h2>
                    </Grid>
                    <Grid item className={classes.grid} xs={6} sm={2} md={2}>
                        <Button
                            color="warning"
                            onClick={tryAgainReset}
                            disabled={invalidURL}
                            isCenterMain>
                            Try again</Button>
                    </Grid>
                </Grid>
            }
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
                                            <h3 className={classes.cardCategory}>{timesShortened} URLs shortened</h3>
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

export default Home;