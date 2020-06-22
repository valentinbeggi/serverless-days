import React, { Component } from "react"
import { FormattedMessage } from "gatsby-plugin-intl"

import classes from "./styles.module.scss"
import titleImage from "../../images/titleImage.svg"

class Title extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.informations}>
          <h1 className={classes.title}>
            <FormattedMessage id="title.title" />
            <br />
            <span className={classes.location}>
              <FormattedMessage id="title.location-year" />
            </span>
          </h1>
          <div className={classes.mobileTitleImageContainer}>
            <img alt="" src={titleImage} />
          </div>
          <h2 className={classes.subtitle}>
            <FormattedMessage id="title.subtitle" />
          </h2>
          <p className={classes.rendezVous}>
            <FormattedMessage id="title.rendez-vous.when" />
            <br />
          </p>
          <a
            target="_blank"
            href="https://www.meetup.com/fr-FR/Paris-Serverless-Architecture-Meetup/events/271290160/"
            className={classes.nextSessionButton}
          >
            <FormattedMessage id="title.rendez-vous.cta" />
          </a>
        </div>
        <div className={classes.desktopTitleImageContainer}>
          <img className={classes.desktopTitleImage} alt="" src={titleImage} />
        </div>
      </div>
    )
  }
}

export default Title
