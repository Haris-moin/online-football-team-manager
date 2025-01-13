import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Space, Button, Tag } from "antd";
import Loading from "../../../components/Loading";
import PlayerTable from "../../../components/PlayerTable";
import TransferModal from "../../../components/TransferModal";
import { getUserTeam } from "../../../store/slices/teamSlice";

const MyTeam = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const { team, loading } = useSelector((state) => state.userTeam);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayerKey, setSelectedPlayerKey] = useState('');

  const handleTransfer = (key) => {
    setSelectedPlayerKey(key);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const getTeamDetails = useCallback(() => {
    dispatch(getUserTeam());
  }, [dispatch]);

  useEffect(() => {
    getTeamDetails();
  }, [getTeamDetails, team?.players?.length]);

  const renderTag = (text, color = "blue") => (
    <Tag className="text-uppercase" color={color}>
      {text}
    </Tag>
  );

  const renderActions = (record) => (
    <Space size="middle">
      <Button color="primary" variant="outlined"  onClick={() => handleTransfer(record.key)}>Transfer</Button>
    </Space>
  );

  const columns = [
    {
      title: 'SR No',
      dataIndex: 'srNo',
      key: 'srNo',
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      key: "position",
      dataIndex: "position",
      render: (position) => renderTag(position),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => renderActions(record),
    },
  ];

  const data =
    team?.players?.map((player) => ({
      key: player._id,
      name: player.name,
      position: player.position,
      isTransferListed: player.transferListed,
    })) || [];

  return (
    <div className="p-2">
      {loading ? (
        <div className="loader-overlay">
          <Loading />
        </div>
      ) : (
        <>
          <Space direction="vertical" size="middle" className="d-flex mb-2">
            <Title level={3}>Team Information</Title>
            <Text>
              <strong>Team Name:</strong> {team?.teamName || "N/A"}
            </Text>
            <Text>
              <strong>Budget:</strong> ${team?.budget?.toLocaleString() || "0"}
            </Text>
          </Space>
          <TransferModal
            isVisible={isModalVisible}
            onCancel={handleCancel}
            selectedPlayerKey={selectedPlayerKey}
            getTeamDetails={getTeamDetails}
          />
          <PlayerTable data={data} columns={columns} />
        </>
      )}
    </div>
  );
};

export default MyTeam;
