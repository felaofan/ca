import React from 'react';
import {Row, Col, Form, Input, Select, Button} from "antd";
import './App.css';

const {Item: FormItem} = Form;
const {Option} = Select;


class Tr extends React.Component {
  render() {
    const {dataSource, form, onAdd, onDelete} = this.props;
    const {getFieldDecorator} = form;
    const {order, user} = dataSource;

    return (
      <Row>
        <Col span={8}>
          {}
          <FormItem>
            {
              getFieldDecorator("order", {
                rules: [
                  {
                    required: true,
                    message: "必填"
                  }
                ],
                initialValue: order,
              })(<Input />)
            }
          </FormItem>

        </Col>
        <Col span={8}>
          <FormItem>
            {
              getFieldDecorator("user", {
                initialValue: user,
              })(
                <Select style={{width: 120}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )
            }
          </FormItem>
        </Col>
        <Col span={8}>
          <Button onClick={() => onAdd()}>+</Button>
          <Button onClick={() => onDelete()}>-</Button>
        </Col>
      </Row>
    )
  }
}

const FormTr = Form.create({
  // 字段变化时，通知父组件
  onFieldsChange(props, changedFields) {
    const fields = {};
    Object.keys(changedFields).forEach(key => {
      fields[key] = changedFields[key].value;
    });
    console.log(changedFields)
    props.onChange(fields);
  },
  // 将父组件中的值映射到表单中
  mapPropsToFields(props) {
    return Form.createFormField({
      ...props.dataSource,
    });
  },
})(Tr);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        order: 1,
        user: ""
      }]
    };
  }

  /**
   * 在当前行下新增一行
   * 新增行序号为前一行序号
   * @param i
   */
  onAdd = (i) => {
    const newData = [...this.state.data];
    const preOrder = newData[i].order;

    newData.splice(i + 1, 0, {
      order: preOrder
    });
    this.setData(newData);
  }
  /**
   * 删除当前行
   * @param i
   */
  onDelete = (i) => {
    const newData = this.state.data.filter((record, j) => i !== j);

    this.setData(newData);
  }

  /**
   * 每次setData之前，统一处理数据
   * 传入的数据有可能
   * @param newData
   */
  setData(newData) {
    const dataLength = newData.length;
    // 先按降序排列，然后重新设置序号
    const _data = newData.sort((a, b) => a.order < b.order).map((record, index) => {
      return {
        ...record,
        order: dataLength - index
      }
    })
    this.setState({
      data: _data
    })
  }

  render() {
    const {data} = this.state;

    return (
      <div>
        {data.map((record, index) => {
          return (
            <FormTr
              key={index}
              index={index}
              dataSource={record}
              onAdd={() => this.onAdd(index)}
              onDelete={() => this.onDelete(index)}
              onChange={(changedFields) => {
                this.setData(data.map((record, j) => {
                  if (index !== j) {
                    return record;
                  }
                  return {
                    ...record,
                    ...changedFields
                  }
                }))
              }}
            />
          )
        })}
      </div>
    )
  }
}

export default Form.create()(App);
