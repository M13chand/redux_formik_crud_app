import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "./users/userSlice";

const TABLE_HEAD = [
  "UserName",
  "Email",
  "Gender",
  "Hobbies",
  "Country",
  "Message",
  "Image",
  "",
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.userSlice);

  const handleEdit = (user) => {
    navigate(`/updateform/${user.id}`, { state: user });
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <Card className="h-full w-full  overflow-scroll mt-5">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={user.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {user.username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {user.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {user.gender}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {user.hobbies.join(" ")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {user.country}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {user.msg}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {
                        <div className="h-[100px] w-[100px]">
                          <img
                            className="h-full bg-cover"
                            src={user.imageReview}
                            alt=""
                          />
                        </div>
                      }
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal space-x-4">
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Home;
