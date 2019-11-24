import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import appData from "text.json";
import { Link } from "react-router-dom";

import { media, Wrapper, Container, Title, Text, P } from "styles";

let thumbnails = {};

function importAll(r) {
  r.keys().forEach(item => {
    thumbnails[`${item.replace("./", "")}`] = r(item);
  });
}

importAll(require.context("assets/thumbnails", false, /\.(png|jpg|svg)$/));

const Wrap = styled(Wrapper)`
  position: relative;
  /* display: flex; */
  overflow: visible;
  width: 100%;
  height: 100%;
  /* position: absolute; */
`;

const LinkWrapper = styled(Wrapper)`
  cursor: pointer;
  align-items: center;
`;

const Content = styled(Wrapper)`
  max-width: 650px;
  text-align: justify;
  line-height: 1.5rem;
  /* opacity: ${p => (p.nearTopOfPage ? 1 : 0)}; */
  /* transition: 0.5s opacity; */
`;

const IFrame = styled.iframe`
  border: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* width: 100%; */
`;

const ScrollPromptLeft = styled.div`
  position: fixed;
  left: 0px;
  display: flex;
  align-items: center;
  top: 0%;
  width: 75px;
  height: 100%;
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
    animation: scrollPromptMoveLeft 3s infinite, scrollPromptFlash 3s infinite;
  }
  transition: 0.2s opacity;
`;

const ProjectListTitle = styled.span`
  text-shadow: 2px 2px #e6d2e6;
`;

const ProjectListSubTitle = styled.span`
  text-shadow: 2px 2px #e6d2e6;
`;

const ProjectListText = styled(P)`
  text-shadow: 2px 2px #e6d2e6;
`;

const ProjectListMedia = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

const Thumbnail = styled.img`
  max-width: 100px;
  max-height: 75px;
  margin-right: 15px;
  box-shadow: 1px 1px 0px 0px #eaf0a4;
`;

function mapStateToProps(state) {
  return {
    projectList: appData.projectList
    // nearTopOfPage: state.scroll.nearTopOfPage
  };
}
// <ScrollPromptLeft>
//   <Link to="/">
//     <Wrapper flex justifycenter>
//       <Wrapper padleft={120} margintop={-4}>
//         <Text tone3 lightblack title bold lead textshadow="tone2dark">
//           Home
//         </Text>
//       </Wrapper>
//       <Wrapper>
//         <Text tone2 lightblack title bold lead>
//           <i className="fa fa-chevron-left" />
//         </Text>
//       </Wrapper>
//     </Wrapper>
//   </Link>
// </ScrollPromptLeft>

const ProjectList = ({ projectList }) => (
  <Wrap>
    <Container flex centerboth>
      <Content>
        <Text title sizetitle tone1dark textshadow="tone2dark">
          <ProjectListTitle>Projects</ProjectListTitle>
          {projectList.map(project => {
            return (
              <Link to={`/projects/${project.id}`}>
                <LinkWrapper thinmargin flex>
                  <Thumbnail src={thumbnails[project.thumbnail]} />
                  <P tight>
                    <Text title lead tone1dark textshadow="tone2dark">
                      <ProjectListSubTitle>{project.title}</ProjectListSubTitle>
                    </Text>
                    <ProjectListText tight tone1dark title small>
                      {project.copyShort}
                    </ProjectListText>
                  </P>
                </LinkWrapper>
              </Link>
            );
          })}
        </Text>
      </Content>
    </Container>
  </Wrap>
);
// <Container flex centerboth>
//   <HomeContent nearTopOfPage={nearTopOfPage} margin>
//     <P tone1dark>
//       <Text title sizetitle tone1dark textshadow="tone2dark">
//         <ProjectListTitle>{copy.homepageTitle}</ProjectListTitle>
//       </Text>
//     </P>
//     <ProjectListText tone1dark title>
//       {copy.homepageParagraph}
//     </ProjectListText>
//   </HomeContent>
// </Container>
// <ScrollPrompt nearTopOfPage={nearTopOfPage}>
//   <a href="#contact">
//     <Text tone2 lightblack title bold lead>
//       <i className="fa fa-chevron-down" />
//     </Text>
//   </a>
// </ScrollPrompt>

export default connect(mapStateToProps, undefined)(ProjectList);
