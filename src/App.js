import React from 'react';
import {Row, Col, Form, Input, Select} from "antd";
import './App.css';

const {FormItem} = Form;
const {Option} = Select;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        order: 1,
        user: ""
      }]
    }
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
   * 序号变化
   */
  onOrderChange = (value, i) => {
    const newData = this.state.data.map((record, j) => {
      return i === j ? {...record, order: value} : record;
    });
    this.setData(newData);
  }
  /**
   * 用户变化
   */
  onUserChange = (value, i) => {
    const newData = this.state.data.map((record, j) => {
      return i === j ? {...record, user: value} : record;
    });
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
          const {order, user} = record;
          return (
            <Row key={index}>
              <Col span={8}>
                <Input value={order} onChange={(e) => this.onOrderChange(e.target.value, index)}/>
              </Col>
              <Col span={8}>
                <Select style={{width: 120}} value={user} onChange={(value) => this.onUserChange(value, index)}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col>
              <Col span={8}>
                <a href="javascript:;" style={{marginRight: "8px"}} onClick={() => this.onAdd(index)}>+</a>
                <a href="javascript:;" onClick={() => this.onDelete(index)}>-</a>
              </Col>
            </Row>
          )
        })}
      </div>
    )
  }
}

export default Form.create()(App);
