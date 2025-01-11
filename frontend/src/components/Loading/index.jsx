import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
 
const Icon = <LoadingOutlined spin style={{ fontSize: 35 }} />;
 
function Loading() {

  return (
    <div className="center">
      <Spin indicator={Icon} />
    </div>
  );
}

 
export default Loading;