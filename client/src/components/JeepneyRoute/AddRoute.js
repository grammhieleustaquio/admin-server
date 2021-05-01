import React, { useState } from "react";
import { Form, Input, Modal, Button, Upload, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function AddRoute(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [routeList, setRouteList] = useState([]);
  const [form] = Form.useForm();

  // const checking = (file) => {
  //   setFilename(file);
  //   //console.log(filename);
  // };
  // const unchecking = () => {
  //   setFilename("Choose file");
  //   //console.log(filename);
  // };

  const showModal = () => {
    setIsModalVisible(true);
    //console.log(props.info);
  };

  const handleCancel = () => {
    setIfCanceled(true);
    setIsModalVisible(false);
  };
  const handleClose = () => {
    if (ifCanceled) {
    } else {
      props.afterClosing();
    }
  };

  const onFinish = (values) => {
    console.log(values);
    props.passedData(props.info);
    setConfirmLoading(true);
    setIfCanceled(false);
    setTimeout(() => {
      setIsModalVisible(false);
      setConfirmLoading(false);
    }, 2000);

    axios
      .post("/api/v1/jeeproutes/add_route", values)
      .then((res) => {
        Modal.success({
          content: "Route Added",
          okButtonProps: {
            style: {borderRadius: '50px'}
          },
        });
      })
      .catch((error) => console.log(error));
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to Add Route",
      okButtonProps: {
        style: {borderRadius: '50px'}
      },
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    //console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" className="modal-button-add" onClick={showModal}>
        <span className="desktop-view"><PlusOutlined /> Add Route</span>
        <span className="mobile-view"><PlusOutlined /></span>
      </Button>

      <Modal
        title="Add Route:"
        visible={isModalVisible}
        confirmLoading={confirmLoading}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button key="back" className="modal-button"  onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            className="modal-button" 
            loading={confirmLoading}
            onClick={onFinish}
          >
            Add
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          id="myForm"
        >
          <Form.Item
            label="Barangay ID"
            name="barangayId"
            rules={[
              { required: true, message: "Please input Route!" },
            ]}
          >
            <Input placeholder="Route"/>
          </Form.Item>
          <Form.Item
            label="Route"
            name="routeDescription"
            rules={[
              { required: true, message: "Please input Route!" },
            ]}
          >
            <Input placeholder="Route"/>
          </Form.Item>

          <Form.Item
            label="Point Number"
            name="pointNumber"
            rules={[
              { required: true, message: "Please input Route!" },
            ]}
          >
            <Input placeholder="Route"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddRoute;
