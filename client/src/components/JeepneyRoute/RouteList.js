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
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import AddRoute from "./AddRoute";
import EditRoute from "./EditRoute";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function RouteList() {
  const { Search } = Input;
  const { Title } = Typography;
  let dataHistory = useHistory();
  const [routeList, setRouteList] = useState([]);
  const [barangayData, setBarangayData] = useState([]);
  let [value, setValue] = useState();
  const [dataFromModal, setDataFromModal] = useState("");

  useEffect(() => {
    value = dataHistory.location.pathname.split("/jeepney-routes/");
    axios
      .post("/api/v1/barangays/search_barangay_id", { value: value[1] })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setBarangayData(data);
        //console.log(data);
      });
    axios
      .post("/api/v1/jeeproutes/get_route", { value: value[1] })
      .then((res) => {
        // console.log(res);
        let data = res.data;
        setRouteList(data);
        // console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteRoute = (routeId) => {
    console.log("delete", routeId);
    axios
      .delete("/api/v1/jeeproutes/delete_route", {
        params: {
          id: routeId,
        },
      })
      .then((res) => {
        let routeListCopy = [...routeList];
        routeListCopy = routeListCopy.filter((route) => route.id !== routeId);
        setRouteList(routeListCopy);
        Modal.success({
          content: "Route has been removed",
          okButtonProps: {
            style: { borderRadius: "50px" },
          },
        });
      })
      .catch((error) => console.log(error));
  };

  const modalClosed = () => {
    console.log("Passed data from modal", dataFromModal);
    axios.get("/api/v1/jeeproutes/").then((res) => {
      //console.log(res);

      let data = res.data;
      setRouteList(data);
    });
  };

  const columns = [
    {
      title: "Point Number",
      dataIndex: "pointNumber",
      key: "pointnumber",
    },
    {
      title: "Description",
      dataIndex: "routeDescription",
      key: "routedescription",
    },
    {
      title: "Actions",
      key: "action",

      render: (record) => (
        <Space size="middle">
          <EditRoute
                  info={value}
                  passedData={setDataFromModal}
                  afterClosing={modalClosed}
                />
          <Button
            type="danger"
            className="modal-button"
            onClick={() => {
              deleteRoute(record.id);
            }}
          >
            <span className="desktop-view">
              <DeleteOutlined/> Delete
            </span>
            <span className="mobile-view">
            <DeleteOutlined />
            </span>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between">
        <Col span={4}>
          <Space direction="vertical">
            <Link to={"/jeepney-routes"}>
              <Button type="primary" className="modal-button-view">
                <span className="desktop-view">
                  <ArrowLeftOutlined /> Back to List
                </span>
                <span className="mobile-view">
                  <ArrowLeftOutlined />
                </span>
              </Button>
            </Link>
          </Space>
        </Col>
        <Col span={4}>
          <AddRoute
            info={value}
            passedData={setDataFromModal}
            afterClosing={modalClosed}
          />

        </Col>
      </Row>
      <Divider>
        <Title level={4}>
          {/* Barangay{" "} */}
          {barangayData[0] == null ? " " : barangayData[0].barangayName} Route
          Points
        </Title>
      </Divider>

      <Row>
        <Table
          dataSource={routeList}
          columns={columns}
          scroll={{ x: 500 }}
          sticky
        ></Table>
      </Row>
    </div>
  );
}

export default RouteList;
