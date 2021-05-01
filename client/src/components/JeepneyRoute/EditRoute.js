import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import axios from "axios";
import { EditOutlined  } from "@ant-design/icons";

function EditRoute(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ifCanceled, setIfCanceled] = useState(false);
  const [ifChanged, setIfChanged] = useState();

  const showModal = () => {
    form.setFieldsValue({
      id: props.info.id,
      barangayId: props.info.barangayId,
      pointNumber: props.info.pointNumber,
      routeDescription: props.info.routeDescription
    });
    setIsModalVisible(true);
    setIfChanged(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
    //console.log(ifChanged);
    setConfirmLoading(true);
    setIfCanceled(false);
    props.passedData(props.info);

    axios
      .post("/api/v1/jeeproute/update_route", {
      id: values.id,
      barangayId: values.barangayId,
      pointNumber: values.pointNumber,
      routeDescription: values.routeDescription
      })
      .then((res) => {
        setTimeout(() => {
          setIsModalVisible(false);
          setConfirmLoading(false);
        }, 2000);
        {
          ifChanged
            ? Modal.success({
                content: "Successfully Updated Route",
                okButtonProps: {
                  style: {borderRadius: '50px'}
                },
              })
            : Modal.success({
                content: "Route is up to date",
                okButtonProps: {
                  style: {borderRadius: '50px'}
                },
              });
        }
      })
      .catch((error) => console.log(error));

    //console.log(ifChanged);
  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      content: "Failure to Update Route",
      okButtonProps: {
        style: {borderRadius: '50px'}
      },
    });
    setTimeout(() => {
      setIsModalVisible(true);
      setConfirmLoading(false);
    }, 2000);
    // console.log("Failed:", errorInfo);
  };
  const onValuesChange = (changedValues, allValues) => {
    //console.log("Changed", allValues, changedValues);
    setIfChanged(true);
  };

  return (
    <div>
      <Button type="primary" className="modal-button-edit" onClick={showModal}>
        <span className="desktop-view"><EditOutlined /> Edit</span>
        <span className="mobile-view"><EditOutlined /></span>
      </Button>
      <Modal
        title="Update Route"
        confirmLoading={confirmLoading}
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={handleCancel}
        afterClose={handleClose}
        destroyOnClose={true}
        footer={[
          <Button key="back" className="modal-button" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="myForm" className="modal-button" htmlType="submit" type="primary">
            Update
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          id="myForm"
        >
          <Form.Item label="Route ID:" name="id">
            <Input disabled={true} bordered={false} />
          </Form.Item>
          <Form.Item
            label="Barangay Id:"
            name="barangayId"
            rules={[
              { required: true, message: "Please input Barangay Id!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Point Number:"
            name="pointNumber"
            rules={[
              { required: true, message: "Please input Point Number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Route Description:"
            name="routeDescription"
            rules={[
              { required: true, message: "Ple ase input Route Description!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditRoute;
