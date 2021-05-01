import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Input,
  Row,
  Col,
  Divider,
  Typography,
  Button,
} from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

import axios from "axios";
import { Link } from "react-router-dom";

function JeepneyRoute() {
  const { Search } = Input;
  const { Title } = Typography;
  const [barangays, setBarangays] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/barangays/")
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setBarangays(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      title: "Barangay",
      dataIndex: "barangayName",
      key: "barangayname",
    },
    {
      title: "Actions",
      key: "action",

      render: (record) => (
        <Space size="middle">
          <Link to={`/jeepney-routes/${record.id}`}>
            <Button type="primary" className="modal-button-view">
              <span className="desktop-view">
                <UnorderedListOutlined /> View Route
              </span>
              <span className="mobile-view">
                <UnorderedListOutlined />
              </span>
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const onSearch = (value) => {
    // axios
    //   .post("/api/v1/drivers/search_drivers", { value: value })
    //   .then((_res) => {
    //     console.log(_res);
    //     let data = _res.data;
    //     setDrivers(data);
    //     //console.log("success");
    //   });
    // //console.log(value);
  };

  return (
    <div>
      <Row>
        <Space direction="vertical">
          <Search
            placeholder="Search Barangay"
            onSearch={onSearch}
            allowClear={true}
            enterButton
          />
        </Space>
      </Row>
      <Divider>
        <Title level={4}>Route List</Title>
      </Divider>

      <Row>
        <Table
          dataSource={barangays}
          columns={columns}
          scroll={{ x: 500 }}
          sticky
        ></Table>
      </Row>
    </div>
  );
}

export default JeepneyRoute;
