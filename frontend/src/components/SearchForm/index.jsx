import PropTypes from "prop-types";
import { Button, Form, Input, Row, Col } from "antd";

const SearchForm = ({ onSearch, onClear}) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onClear();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSearch}
      onReset={handleReset}
      preserve={false}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Player Name" name="playerName">
            <Input className="p-1" placeholder="Enter player name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Team Name" name="teamName">
            <Input className="p-1" placeholder="Enter team name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Maximum Price" name="price">
            <Input className="p-1" type="number" placeholder="Enter maximum price" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} className="d-flex gap-2">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
       
          <Button type="default" htmlType="reset">
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default SearchForm;
