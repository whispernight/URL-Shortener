import React, { useState } from 'react';
import firebase from 'components/Firebase/firebase';
import styles from "assets/jss/smll/views/shortener.js";

//MaterialUI
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
//Components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const useStyles = makeStyles(styles);
function Shortener() {
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

    const copyURLEvent = (event, value) => {
        navigator.clipboard.writeText(resultURL).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    function validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    const handleChangeURL = (prop) => (event) => {
        //console.log(event.target.value);
        let invalid = !validateUrl(event.target.value);
        if (invalid) {
            setinvalidURL(true)
            return;
        }
        setinvalidURL(false);
        setoriginalURL(event.target.value);
    };

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                {resultURL === "" &&
                    <GridContainer direction="row" justify="center" alignItems="center">
                        <GridItem className={classes.grid + " " + classes.inputColor} xs={6} sm={6} md={6}>
                            <CustomInput
                                className={classes.inputColor}
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
                        </GridItem>
                        <GridItem className={classes.grid} xs={6} sm={2} md={2}>
                            <Button
                                type="button"
                                color="success"
                                onClick={createRedirectURLRecord}
                                disabled={invalidURL}
                            >
                                Shorten URL!</Button>
                        </GridItem>
                    </GridContainer>
                }
                {resultURL !== "" &&
                    <GridContainer direction="row" justify="center" alignItems="center" className={classes.sideToSide}>
                        <GridItem className={classes.grid} xs={6} sm={6} md={6}>
                            <h2 className={classes.subtitle}>{resultURL}</h2>
                        </GridItem>
                        <GridItem className={classes.grid} xs={6} sm={2} md={1}>
                            <Tooltip
                                id="copy-tooltip"
                                title="Copy URL"
                                placement={window.innerWidth > 959 ? "top" : "left"}
                                classes={{ tooltip: classes.tooltip }}
                            >
                                <Button
                                    color="info"
                                    onClick={copyURLEvent}
                                >
                                    <i className={classes.socialIcons + " fa fa-clone"} />
                                </Button>
                            </Tooltip>
                        </GridItem>
                        <GridItem className={classes.grid} xs={6} sm={2} md={2}>
                            <Button
                                color="warning"
                                onClick={tryAgainReset}
                            >Try again</Button>
                        </GridItem>
                    </GridContainer>
                }
            </div>
        </div>
    );

}

export default Shortener;