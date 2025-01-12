import { Button, Space, Table, Tag, Typography, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTransferListedPlayers, toggleTransfer, purchasePlayer } from "../../../store/slices/transferSlice";
import { useEffect } from "react";
import Loading from "../../../components/Loading";

const TransferList = () => {
  const {Title} =  Typography;
  const dispatch = useDispatch();
  const {loading, players} = useSelector((state) => state.transfer);

  const handleBuyPlayer = (playerId) =>{
    dispatch(purchasePlayer({playerId}));
  }

  const getTransferPlayers = async () => {
    dispatch(getTransferListedPlayers());
  };

  const handleRemoveTransfer = async (playerId) =>{
      dispatch(toggleTransfer({ playerId }));
     await getTransferPlayers()
    };
    
  const renderTag = (text, color = "blue") => (
    <Tag className="text-uppercase" color={color}>
      {text}
    </Tag>
  );

  const renderActions = (record) => (
    <Space size="middle">
      {record.isTeamMember ? (
        <Button danger onClick={() => handleRemoveTransfer(record.key)}>
          Remove
        </Button>
      ) : (
        <Button onClick={() => handleBuyPlayer(record.key)}> Buy</Button>
      )}
    </Space>
  );

  const data = players?.map(player => ({
    key: player._id,
    name: player.name,
    teamName: player.team.teamName,
    position: player.position,
    askingPrice: player.askingPrice,
    isTeamMember: player.isTeamMember
  })) || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Position",
      key: "position",
      dataIndex: "position",
      render: (position) => renderTag(position),
    },
    {
      title: "Asking Price",
      dataIndex: "askingPrice",
      key: "askingPrice",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => renderActions(record),
    },
  ];

  useEffect(() => {
    getTransferPlayers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-2">
          <div className="mb-2">
          <Title level={3}>Transfer Market</Title>
          </div>
          <Table dataSource={data} columns={columns} />
        </div>
      )}
    </>
  );
};

export default TransferList;
