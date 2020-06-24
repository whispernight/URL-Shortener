import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Header from 'components/Header/Header';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import classNames from "classnames";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/smll/views/home.js";
//Sections
import BottomCustomGrid from 'views/sections/BottomCustomGrid';
import Parallax from 'views/sections/Parallax';
import Shortener from "views/sections/Shortener.js";


const useStyles = makeStyles(styles);

function Home(props) {
    const classes = useStyles();
    const { ...rest } = props;

    return (
        <div>
            <Header
                brand="SMLL Link Shortener"
                rightLinks={<HeaderLinks />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                    height: 150,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax image={require("assets/img/bg-1.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem>
                            <div className={classes.brand}>
                                <h1 className={classes.title}>SMLL</h1>
                                <h3 className={classes.subtitle}>
                                    The Ultimate URL Shortener.
                                </h3>
                            </div>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main)}>
                <Shortener />
                <BottomCustomGrid />
            </div>
        </div>
    );
}

export default Home;