import React, { useEffect, useState } from "react";
import { Table, Space, Input, Row, Col, Divider, Typography } from "antd";

import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import DriversInfoModal from "./DriversInfoModal";
import AddDriverModal from "./AddDriverModal";
import AddDriverImageModal from "./AddDriverImageModal";
import EditDriverModal from "./EditDriverModal";

import axios from "axios";

function DriversTableList() {
  const [drivers, setDrivers] = useState([]);
  const { Search } = Input;
  const [dataFromModal, setDataFromModal] = useState("");
  const { Title } = Typography;

  useEffect(() => {
    axios
      .get("/api/v1/drivers/")
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setDrivers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearch = (value) => {
    axios
      .post("/api/v1/drivers/search_drivers", { value: value })
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        setDrivers(data);
        //console.log("success");
      });

    //console.log(value);
  };

  const modalClosed = () => {
    console.log("Passed data from modal", dataFromModal);
    axios.get("/api/v1/drivers/").then((res) => {
      //console.log(res);

      let data = res.data;
      setDrivers(data);
    });
  };

  return (
    <div class="drivers-table">
      <Row justify="space-between">
        <Col span={4}>
          <Space direction="vertical">
            <Search
              placeholder="Search Drivers"
              onSearch={onSearch}
              allowClear={true}
              enterButton
            />
          </Space>
        </Col>
        <Col span={4}>
          <AddDriverModal
            info={""}
            passedData={setDataFromModal}
            afterClosing={modalClosed}
          />
        </Col>
      </Row>
      <Divider>
        <Title level={4}>List of Drivers</Title>
      </Divider>

      <Row>
        <Table dataSource={drivers} scroll={{ x: 1000, y: 500 }} sticky>
          {/* <ColumnGroup title="Id" dataIndex="id" key="id"></ColumnGroup> */}
          {/* <ColumnGroup title="Name" key="name"> */}
          <Column
            title="Firstname"
            dataIndex="firstName"
            key="firstName"
          ></Column>
          <Column
            title="Middlename"
            dataIndex="middleName"
            key="middleName"
          ></Column>
          <Column title="Lastname" dataIndex="lastName" key="lastName"></Column>
          {/* </ColumnGroup> */}
          <ColumnGroup
            title="Contact"
            dataIndex="contactNumber"
            key="contactNumber"
          ></ColumnGroup>
          <ColumnGroup
            title="Address"
            dataIndex="address"
            key="address"
          ></ColumnGroup>
          <ColumnGroup
            title="Email"
            dataIndex="email"
            key="email"
          ></ColumnGroup>
          <ColumnGroup
            title="Actions"
            key="actions"
            fixed="right"
            width="30vh"
            render={(value) => (
              <Space>
                <DriversInfoModal
                  info={value}
                  passedData={setDataFromModal}
                  afterClosing={modalClosed}
                />
                <EditDriverModal
                  info={value}
                  passedData={setDataFromModal}
                  afterClosing={modalClosed}
                />
                <AddDriverImageModal info={value} />
              </Space>
            )}
          ></ColumnGroup>
        </Table>
      </Row>
    </div>
  );
}

export default DriversTableList;
