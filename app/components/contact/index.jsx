import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { media, Wrapper, Container, Title, P, Text } from "styles";
import { useRouteMatch } from "react-router-dom";

const Wrap = styled(Wrapper)`
  position: fixed;
  overflow: visible;
  height: 100%;
  width: 100%;
  transition: top 1s;
  top: ${p => (p.selected ? "0" : "100%")};
  left: 0;
`;

const ContactPage = styled(Wrapper)`
  position: relative;
  padding-top: 84px;
  height: calc(100% - 84px - 103px);
  display: flex;
  justify-content: center;
  align-items: center;
  /* opacity: ${p => (p.nearBottomOfPage ? 1 : 0)};
  transition: 0.5s opacity; */
  ${media.phone`
        padding: 0px;
        height: 100%;
    `};
`;

const ContactWrapper = styled(Wrapper)`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  width: calc(100% - 48px);
  max-width: 650px;
  overflow: hidden;
  ${media.phone`
        justify-content: space-evenly;
        height: 100%;
        margin: 0;
    `};
`;

const ContactLink = styled.a`
  display: flex;
  align-items: baseline;
  width: 100%;

  ${media.phone`
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `} text-shadow: 2px 2px #e6d2e6;
`;

const Icon = styled.i`
  font-size: 24px;
  display: none;
  ${media.phone`
        display: inline-block;
    `};
`;

const ContactType = styled(P)`
  ${media.desktop`
        font-weight: unset;
    `};
  ${media.phone`
    margin: 0;
    `};
`;

const ContactValue = styled(P)`

  ${media.phone`
    margin: 0;
    `};
    ${media.desktop`
      ${p => p.min?`
        min-width: 210px;
        `:""};
      `};
`;

const Lines = styled.div`
  flex-grow: 1;
  overflow: hidden;
  margin: 0 4px;
  ${media.phone`
        display: none;
    `};
`;

function mapStateToProps(state) {
  return {
    nearBottomOfPage: state.scroll.nearBottomOfPage
  };
}

class Contact extends Component {
  componentDidMount() {
    // let match = useRouteMatch();
    // if (match.path == "/contact") {
    //   scrollTo(window.innerHeight, 0);
    // } else {
    //   scrollTo(0, 0);
    // }
    // console.log(match);
  }
  componentDidUpdate() {
    // let match = useRouteMatch();
    // if (match.path == "/contact") {
    //   scrollTo(window.innerHeight, 0);
    // } else {
    //   scrollTo(0, 0);
    // }
    // console.log(match);
  }
  render() {
    const { nearBottomOfPage } = this.props;
    let selected = false;
    let match = useRouteMatch();
    if (match.path == "/contact") {
      selected = true;
    }

    return (
      <Wrap selected={selected}>
        <ContactPage overflowauto nearBottomOfPage={nearBottomOfPage}>
          <ContactWrapper margin overflowauto flex justifycenter>
            <ContactLink
              href="mailto:benjybarral@gmail.com?Subject=Hi%20Elliott!"
              target="_blank"
            >
              <ContactType tone1dark lead title bold>
                <Icon className="fa fa-envelope-square" /> Email
              </ContactType>
              <Lines>
                <Text tone1dark lead title>
                  {".".repeat(500)}
                </Text>
              </Lines>
              <ContactValue tone1dark lead title>
                benjybarral@gmail.com
              </ContactValue>
            </ContactLink>
            <ContactLink href="http://github.com/BenjBarral" target="_blank">
              <ContactType tone1dark lead title bold>
                <Icon className="fa fa-github-square" /> Github
              </ContactType>
              <Lines>
                <Text tone1dark lead title>
                  {".".repeat(500)}
                </Text>
              </Lines>
              <ContactValue tone1dark lead title>
                @BenjBarral
              </ContactValue>
            </ContactLink>
            <ContactLink href="https://www.linkedin.com/in/benjamin-barral-8a097b129/" target="_blank">
              <ContactType tone1dark lead title bold>
                <Icon className="fa fa-linkedin-square" /> LinkedIn
              </ContactType>
              <Lines>
                <Text tone1dark lead title>
                  {".".repeat(500)}
                </Text>
              </Lines>
              <ContactValue min tone1dark lead title>
                /in/benjamin-barral
              </ContactValue>
            </ContactLink>
            <ContactLink
              href="https://drive.google.com/file/d/1G7_l5a_VapbvegXFv3W2tBsjqlp13Jg1/view?usp=sharing"
              target="_blank"
            >
              <ContactType tone1dark lead title bold>
                <Icon className="fa fa-file-text" /> CV
              </ContactType>
              <Lines>
                <Text tone1dark lead title>
                  {".".repeat(500)}
                </Text>
              </Lines>
              <ContactValue tone1dark lead title nowrap>
                Benjamin Barral
              </ContactValue>
            </ContactLink>
          </ContactWrapper>
        </ContactPage>
      </Wrap>
    );
  }
}

export default connect(mapStateToProps, undefined)(Contact);
