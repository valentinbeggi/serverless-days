import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TalkCardItem from "../components/talkCard"
import Location from "../components/location"
import Contact from "../components/contact"
import Tickets from "../components/tickets"
import Team from "../components/team"
import Title from "../components/title"
import Sponsors from "../components/sponsors"
import Streams from "../components/streams"

import DialogContent from "../components/dialogContent"
import Dialog from "@material-ui/core/Dialog"

import classes from "./index.module.scss"
import talkLogo from "../images/talks.svg"

export default function Template({ data }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [dialogData, setDialogData] = useState(false)

  const {
    allMarkdownRemark: { edges },
  } = data
  const talks = edges.map(element => element.node.frontmatter)

  const closeDialog = useCallback(() => {
    setDialogIsOpen(false)
    setDialogData(null)
  }, [setDialogData, setDialogIsOpen])

  const openDialog = useCallback(
    dataIndex => {
      setDialogIsOpen(true)
      setDialogData(talks[dataIndex])
    },
    [setDialogData, setDialogIsOpen, talks]
  )

  return (
    <Layout>
      <SEO />
      <Title />
      <ol className={classes.talksList} id="talks">
        <li className={classes.talkHeader}>
          <img alt="" src={talkLogo} />
          <h2>Talks</h2>
        </li>
        {talks
          .sort((talk1, talk2) => new Date(talk1.hour) - new Date(talk2.hour))
          .map((talk, index) => (
            <TalkCardItem
              openDialog={() => {
                openDialog(index)
              }}
              {...talk}
              key={talk.hour}
            />
          ))}
      </ol>
      <Location id="location" />
      <Streams id="streams" />
      <Team id="team" />
      <Contact id="contact" />
      <Sponsors id="sponsor" />
      {
        <Dialog
          open={dialogIsOpen}
          onClose={closeDialog}
          maxWidth="xl"
          fullWidth
        >
          {dialogData && (
            <DialogContent closeDialog={closeDialog} {...dialogData} />
          )}
        </Dialog>
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___hour], order: ASC }
      filter: { fileAbsolutePath: { regex: "/(talks)/.*/" } }
    ) {
      edges {
        node {
          frontmatter {
            hour
            title
            description
            biographie
            name
            job
            company
            picture {
              childImageSharp {
                small: fixed(width: 43, height: 43, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
                medium: fluid(maxWidth: 164, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
                large: fixed(width: 398, height: 200, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            twitter
            isParty
          }
        }
      }
    }
  }
`
