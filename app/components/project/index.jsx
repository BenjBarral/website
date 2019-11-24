import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import appData from "text.json";
import { Link } from "react-router-dom";

import { media, Wrapper, Container, Title, Text, P } from "styles";

const Wrap = styled(Wrapper)`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  /* position: absolute; */
`;

const Content = styled(P)`
  max-width: 650px;
  text-align: justify;
  /*overflow: "visible !important";*/
  line-height: 1.5rem;
  /* opacity: ${p => (p.nearTopOfPage ? 1 : 0)}; */
  /* transition: 0.5s opacity; */
`;

const Img = styled.img`
  border: none;
  position: absolute;
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;
  /* width: 100%; */
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

const ProjectTitle = styled.span`
  text-shadow: 2px 2px #e6d2e6;
`;

const ProjectText = styled(P)`
  text-shadow: 1px 1px #e6d2e6;
`;

const ProjectMedia = styled.div`
  position: relative;
  padding-top: 56.25%;
`;

function mapStateToProps(state) {
  return {
    // nearTopOfPage: state.scroll.nearTopOfPage
  };
}
// <ScrollPromptLeft>
//   <Link to="/projects">
//     <Wrapper flex justifycenter>
//       <Wrapper padleft={140} margintop={-4}>
//         <Text tone3 lightblack title bold lead textshadow="tone2dark">
//           Projects
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

const Project = ({ projectid }) => {
  let project = appData.projectList.find(p => {
    return p.id == projectid;
  });
  if (project == null) {
    return (
      <Wrap>
        <Container flex centerboth>
          <Content>
            <Text title sizetitle tone1dark textshadow="tone2dark">
              Project Not Found
            </Text>
          </Content>
        </Container>
      </Wrap>
    );
  }
  let mediaContent;
  if (project.mediaType == "video") {
    mediaContent = <IFrame src={project.mediaUrl} />;
  } else if (project.mediaType == "image") {
    mediaContent = <Img src={project.mediaUrl} />;
  }
  return (
    <Wrap>
      <Container flex centerboth>
        <Content>
          <Text title sizetitle tone1dark textshadow="tone2dark">
            <ProjectTitle>{project.title}</ProjectTitle>
            <P>
              <ProjectMedia>{mediaContent}</ProjectMedia>
              <ProjectText tone1dark title>
              <div dangerouslySetInnerHTML={{"__html":project.copy}} />
              </ProjectText>
            </P>
          </Text>
        </Content>
      </Container>
    </Wrap>
  );
};
// <Container flex centerboth>
//   <HomeContent nearTopOfPage={nearTopOfPage} margin>
//     <P tone1dark>
//       <Text title sizetitle tone1dark textshadow="tone2dark">
//         <ProjectTitle>{copy.homepageTitle}</ProjectTitle>
//       </Text>
//     </P>
//     <ProjectText tone1dark title>
//       {copy.homepageParagraph}
//     </ProjectText>
//   </HomeContent>
// </Container>
// <ScrollPrompt nearTopOfPage={nearTopOfPage}>
//   <a href="#contact">
//     <Text tone2 lightblack title bold lead>
//       <i className="fa fa-chevron-down" />
//     </Text>
//   </a>
// </ScrollPrompt>

export default connect(mapStateToProps, undefined)(Project);
