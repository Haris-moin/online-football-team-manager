import { Button, Space, Tag, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransferListedPlayers,
  toggleTransfer,
  purchasePlayer,
} from "../../../store/slices/transferSlice";
import { useCallback, useEffect } from "react";
import Loading from "../../../components/Loading";
import PlayerTable from "../../../components/PlayerTable";

const TransferList = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const { loading, players } = useSelector((state) => state.transfer);

  const handleBuyPlayer = (playerId) => {
    dispatch(purchasePlayer({ playerId }));
  };

  const getTransferPlayers = useCallback(() => {
    dispatch(getTransferListedPlayers());
  }, [dispatch]);

  useEffect(() => {
    getTransferPlayers();
  }, [getTransferPlayers, players.length]);

  const handleRemoveTransfer = async (playerId) => {
    dispatch(toggleTransfer({ playerId }));
    await getTransferPlayers();
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

  const data =
    players?.map((player) => ({
      key: player._id,
      name: player.name,
      teamName: player.team.teamName,
      position: player.position,
      askingPrice: player.askingPrice,
      isTeamMember: player.isTeamMember,
    })) || [];

  const columns = [
    {
      title: "SR No",
      dataIndex: "srNo",
      key: "srNo",
      render: (text, record, index) => index + 1,
    },
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-2">
          <div className="mb-2">
            <Title level={3}>Transfer Market</Title>
          </div>
          <PlayerTable data={data} columns={columns} />
        </div>
      )}
    </>
  );
};

export default TransferList;
