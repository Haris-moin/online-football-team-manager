import PropTypes from 'prop-types';
import { Form, Modal, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { toggleTransfer } from '../../store/slices/transferSlice';


const TransferModal = ({ isVisible, onCancel, selectedPlayerKey }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onCancelModal = () =>{
    form.resetFields();
    onCancel();
  }

  const handleApply = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        askingPrice: values?.price,
        playerId: selectedPlayerKey,
      };
     dispatch(toggleTransfer(payload));
     form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  return (
    <Modal
      title="Transfer Player"
      open={isVisible}
      onCancel={onCancelModal}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="price"
          label="Asking Price"
          rules={[{ required: true, message: "Please enter a price" }]}
        >
          <Input
            type="number"
            placeholder="Enter price"
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "+") {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

TransferModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedPlayerKey: PropTypes.string.isRequired,
};

export default TransferModal;
