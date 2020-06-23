import React, { useState } from 'react';
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import firebase from 'components/Firebase/firebase';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CustomHeader from 'components/CustomHeader/CustomHeader';
import BottomCustomGrid from 'components/BottomCustomGrid/BottomCustomGrid';


const styles = {
    sideToSide: {
        backgroundColor: "#3c4858",
        color: "#eeeeee",
        height: "200px"
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
            <CustomHeader />
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
            <BottomCustomGrid />
        </div>
    );
}

export default Home;