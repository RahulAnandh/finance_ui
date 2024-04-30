import { Card, Row, Col } from "antd";
const DashbordIndex = () => {
  return (
    <>
      <Row span={24}>
        <Col span={6}>
          <Card></Card>
        </Col>
        <Col span={6}>
          <Card></Card>
        </Col>
        <Col span={6}>
          <Card></Card>
        </Col>
        <Col span={6}>
          <Card></Card>
        </Col>
      </Row>
      <Row></Row>
      <Row></Row>
      <Row></Row>
    </>
  );
};
export default DashbordIndex;
