import React from "react";
import { Box, Modal, Pagination, Typography } from "@mui/material";
import BaseTable from "react-base-table";

import { User } from "./utils/types";
import { columns } from "./utils/constants";
import { UserService } from "./lib/UsersService";

import "react-base-table/styles.css";

const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "background.paper",
  left: "50%",
  p: 4,
  position: "absolute",
  top: "50%",
  width: 500,
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export function UsersView() {
  const userService = new UserService();
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const limit = 10;
  const skip = (page - 1) * limit;

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleClose = () => setModalOpen(false);

  React.useEffect(() => {
    try {
      setLoading(true);
      setUsers([]);

      const fetchProducts = async () => {
        const products = await userService.getUsers(limit, skip);
        setUsers(products);
        setLoading(false);
      };

      fetchProducts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline underline-offset-2 mb-3">
        UsersView
      </h1>
      <div className="w-full flex justify-end items-center">
        <BaseTable
          data={users}
          width={850}
          height={550}
          loading={loading}
          columns={columns}
          rowEventHandlers={{
            onClick: (rowData) => {
              setModalOpen(true);
              setSelectedUser(rowData.rowData);
            },
          }}
        />
      </div>
      <div className="flex justify-center items-center h-20">
        <Pagination
          count={100 / 10}
          size="large"
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={selectedUser?.image}
            alt={selectedUser?.firstName}
            className="w-48 h-36 object-cover object-bottom"
          />
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </Typography>
          <ul className="w-full space-y-2 mt-5">
            <li>Gender: {selectedUser?.gender}</li>
            <li>Birthday: {selectedUser?.birthDate}</li>
            <li>
              Weight: {selectedUser?.weight}kg and Height:{" "}
              {selectedUser?.height}cm
            </li>
            <li>
              Website:{" "}
              <a href={selectedUser?.domain} target="_blank">
                {selectedUser?.domain}
              </a>
            </li>
            <li>Phone number: {selectedUser?.phone}</li>
            <li>
              Address: {selectedUser?.address.city},{" "}
              {selectedUser?.address.address}.
            </li>
            <li>University: {selectedUser?.university}</li>
          </ul>
        </Box>
      </Modal>
    </div>
  );
}
