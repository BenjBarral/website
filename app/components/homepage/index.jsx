import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AwesomeSlider from "react-awesome-slider";
// import AwesomeSliderStyles from "react-awesome-slider/src/styles";
import "react-awesome-slider/dist/styles.css";
import { useRouteMatch, useParams, Link } from "react-router-dom";

import copy from "text.json";

import ProjectList from "components/projectList";
import Project from "components/project";
import { media, Wrapper, Container, Title, Text, P } from "styles";

const Wrap = styled(Wrapper)`
  position: fixed;
  overflow: visible;
  height: 100%;
  width: 100%;
  transition: top 1s;
  top: ${p => (p.selected ? "0" : "-100%")};
  left: 0;
`;

const Home = styled(Wrapper)`
  /* position: relative; */
  /* display: flex; */
  overflow: visible;
  height: 100%;
  width: 100%;
`;

const HomeContent = styled(Wrapper)`
  max-width: 650px;
  text-align: left;
  line-height: 1.5rem;
  opacity: ${p => (p.nearTopOfPage ? 1 : 0)};
  transition: 0.5s opacity;
`;

const ScrollPrompt = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 75px;
  text-align: center;
  a {
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  i {
    font-size: 30px;
    position: absolute;
    left: 50%;
    top: 0px;
    animation: scrollPromptMove 3s infinite, scrollPromptFlash 3s infinite;
  }
  opacity: ${p => (p.nearTopOfPage ? 1 : 0)};
  transition: 0.2s opacity;
`;

const ScrollPromptRight = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0%;
  width: 75px;
  height: 100%;
  text-align: center;
  color: #43c6ac;
  a {
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  i {
    font-size: 30px;
    position: absolute;
    left: 50%;
    top: 0px;
    animation: scrollPromptMoveRight 3s infinite, scrollPromptFlash 3s infinite;
    color: #43c6ac;
  }
  opacity: ${p => (p.nearTopOfPage ? 1 : 0)};
  transition: 0.2s opacity;
`;

const HomepageTitle = styled.span`
  text-shadow: 2px 2px #e6d2e6;
`;

const Portrait = styled.img`
  height: 150px;
  width: 150px;
`;

const HomepageText = styled(P)`
  text-shadow: 2px 2px #e6d2e6;
`;

const HomepageP = styled(P)`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    ${media.phone`
      flex-direction: column-reverse;
      align-items: center;
      `};
  `;

function mapStateToProps(state) {
  return {
    nearTopOfPage: state.scroll.nearTopOfPage
  };
}

// <ScrollPromptRight nearTopOfPage={nearTopOfPage}>
//   <Link to="/projects">
//     <Wrapper flex justifycenter>
//       <Wrapper padright={120} margintop={-4}>
//         <Text tone2 lightblack title textshadow="tone2dark">
//           Projects
//         </Text>
//       </Wrapper>
//       <Wrapper>
//         <Text tone2 lightblack title bold lead>
//           <i className="fa fa-chevron-right" />
//         </Text>
//       </Wrapper>
//     </Wrapper>
//   </Link>
// </ScrollPromptRight>
// <ScrollPrompt nearTopOfPage={nearTopOfPage}>
//   <a href="#contact">
//     <Text tone2 lightblack title bold lead>
//       <i className="fa fa-chevron-down" />
//     </Text>
//   </a>
// </ScrollPrompt>
class Homepage extends Component {
  componentDidUpdate() {
    window.test = this.slider;
  }
  componentDidMount() {
    window.test = this.slider;
    console.log(this.slider);
    this.slider.touchStart = null;
    this.slider.touchMove = null;
    this.slider.touchEnd = null;
  }
  getSlider() {
    let match = useRouteMatch();
    let pageState = 0;
    if (match.path == "/projects") pageState = 1;
    else if (match.path == "/projects/:projectid") pageState = 2;
    let selected = false;
    if (match.path != "/contact") {
      selected = true;
    }
    const { nearTopOfPage } = this.props;
    let slider = (
      <AwesomeSlider
        organicArrows={false}
        fillParent={true}
        bullets={false}
        selected={pageState}
        infinite={false}
      >
        <Wrapper flex width="100%" height="100%">
          <Home>
            <Container flex centerboth>
              <HomeContent nearTopOfPage={nearTopOfPage} margin>
                <HomepageP tone1dark>
                  <Text title sizetitle tone1dark textshadow="tone2dark">
                    <HomepageTitle>{copy.homepageTitle}</HomepageTitle>
                  </Text> <div><Portrait src="benj.jpg" /></div>
                </HomepageP>
                <HomepageText tone1dark title>
                <div dangerouslySetInnerHTML={{"__html":copy.homepageParagraph}} />
                </HomepageText>
              </HomeContent>
            </Container>
          </Home>
        </Wrapper>
        <Wrapper flex width="100%" height="100%">
          <ProjectList />
        </Wrapper>
        <Wrapper flex width="100%" height="100%">
          <Project projectid={match.params["projectid"]} />
        </Wrapper>
      </AwesomeSlider>
    );
    this.slider = slider;
    return slider;
  }
  render() {
    let match = useRouteMatch();
    let selected = false;
    if (match.path != "/contact") {
      selected = true;
    }
    return (
      <Wrap selected={selected} amount={window.innerHeight}>
        {this.getSlider()}
      </Wrap>
    );
  }
}

export default connect(mapStateToProps, undefined)(Homepage);
