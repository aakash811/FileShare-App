import * as React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({ responce }) => (
  <Html>
    <Head />
    <Preview>File-Share</Preview>
    <Body style={main}>
      <Container>
        <Section style={logo}>
          {/* <Img src={`${baseUrl}/static/yelp-logo.png`} /> */}
        </Section>

        <Section style={content}>
          <Row>
            {/* <Img
              style={image}
              width={620}
              src={`${baseUrl}/static/yelp-header.png`}
            /> */}
          </Row>

          <Row style={{ ...boxInfos, paddingBottom: "0" }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Hi {responce.emailToSend.split("@")[0]},
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {responce.userName} shared a file with you
              </Heading>

              <Text style={paragraph}>
                <b>File Name: {responce.fileName} </b>
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>
                  File Size: {(responce.fileSize / 1024 / 1024).toFixed(2)}MB
                </b>
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                <b>File Type: {responce.fileType} </b>
              </Text>

              <Text style={paragraph}>
                Now you can share your files using File-Shareif.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                Click below button to access the file
              </Text>
            </Column>
          </Row>
          <a href={responce.shortUrl}> Click To Download</a>
          <Row style={{ ...boxInfos, paddingTop: "5px" }}>
            <Column style={containerButton} colSpan={2}>
              <Button style={button} href={responce.shortUrl}>
                {" "}
                Click here to Download
              </Button>
            </Column>
          </Row>
        </Section>

        <Section style={containerImageFooter}>
          {/* <Img
            style={image}
            width={620}
            src={`${baseUrl}/static/yelp-footer.png`}
          /> */}
        </Section>

        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "rgb(0,0,0, 0.7)",
          }}
        >
          © 2024 | File Share Inc @copyrights., India
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
