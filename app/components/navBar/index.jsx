import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

import { media, Wrapper, Text } from "styles";

const Wrap = styled(Wrapper)`
  position: fixed;
  top: 15px;
  left: 25px;
  z-index: 1000;
  display: flex;
`;

const NavItem = styled(Wrapper)`
  margin-right: 10px;
  text-shadow: 2px 2px #e6d2e6;
  :hover {
    text-decoration: underline;
    a {
      color: #e5f9ae;
    }
  }
  text-decoration: ${p => (p.selected ? "underline" : "none")};
  a {
    color: #5e246c;
  }
`;

const NavBar = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: -9990;
  box-shadow: inset 0px 0px 0px 6px #43c6ac;
  background: linear-gradient(45deg, #43c6ac, #f8ffae);
  ${"" /* background: linear-gradient(225deg, #22c1c3, #fdbb2d); */} ${"" /* ${media.phone`
        background: linear-gradient(0deg, #fff, rgba(255, 212, 0, 0.37));
    `} */}
    &:before {
    box-shadow: inset 0px 0px 0px 6px #f8ffae;
    display: block;
    background: linear-gradient(225deg, #43c6ac, #f8ffae);
    ${"" /* background: linear-gradient(45deg, #22c1c3, #fdbb2d); */} ${"" /* ${media.phone`
            background: linear-gradient(0deg, #fff, rgba(0, 243, 255, 0.37));
        `} */}
        height: 100%;
    width: 100%;
    position: fixed;
    z-index: -9999;
    content: "";
    opacity: ${p => (p.atBottom ? 1 : 0)};
    transition: opacity 2s;
  }
`;

function mapStateToProps(state) {
  return {
    nearTopOfPage: state.scroll.nearTopOfPage,
    nearBottomOfPage: state.scroll.nearBottomOfPage
  };
}

class NavBarComponent extends Component {
  render() {
    let match = useRouteMatch();
    return (
      <Wrap>
        <NavItem selected={match.path == "/"}>
          <Link to="/">
            <Text title lead tone1dark textshadow="tone2dark">
              Home
            </Text>
          </Link>
        </NavItem>
        <NavItem selected={match.path == "/projects"}>
          <Link to="/projects">
            <Text title lead tone1dark textshadow="tone2dark">
              Projects
            </Text>
          </Link>
        </NavItem>
        <NavItem selected={match.path == "/contact"}>
          <Link to="/contact">
            <Text title lead tone1dark textshadow="tone2dark">
              Contact
            </Text>
          </Link>
        </NavItem>
      </Wrap>
    );
  }
}

export default connect(mapStateToProps)(NavBarComponent);
