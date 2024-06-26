import React from "react";
import * as Yup from "yup";
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
  Checkbox,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./userSlice";
import { useNavigate, useParams } from "react-router";
const UpdateForm = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userSlice);
  const { id } = useParams();

  const existUser = users.find((user) => user.id === id);

  const FILE_SIZE = 200 * 1024;

  const userSchema = Yup.object({
    username: Yup.string()
      .required("Username Required")
      .min(3, "Username must be at least 3 characters long")
      .matches(
        /^[a-zA-Z_]+$/,
        "Username can only contain letters  and underscores"
      ),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "must be a valid format like example@domain.com"
      ),
    hobbies: Yup.array().min(1).required(),

    image: Yup.mixed()
      .test("fileType", "invalid Image", (e) => {
        const filesType = ["image/jpeg", "image/jpg", "image/png"];
        return filesType.includes(e.type);
      })
      .test("fileSize", "The file is too large", (value) => {
        return value && value.size <= FILE_SIZE;
      })
      .required("Image is required"),
  });

  const { handleChange, handleSubmit, values, setFieldValue, errors, touched } =
    useFormik({
      initialValues: {
        username: existUser.username,
        email: existUser.email,
        gender: existUser.gender,
        hobbies: existUser.hobbies,
        msg: existUser.msg,
        country: existUser.country,
        imageReview: existUser.imageReview,
        // image: null
      },
      onSubmit: (val) => {
        dispatch(updateUser({ ...val, id: existUser.id }));
        nav(-1);
      },
      validationSchema: userSchema
    });

  return (
    <div className="max-w-[400px] p-2">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Update Your Detail
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Post.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 space-y-6 ">
          <div>
            <Input
              error={errors.username && touched.username}
              name="username"
              onChange={handleChange}
              value={values.username}
              label="Username"
            />
            {errors.username && touched.username && (
              <p className="text-pink-400">{errors.username}</p>
            )}
          </div>

          <div>
            <Input
              name="email"
              onChange={handleChange}
              value={values.email}
              label="Email"
            />
            {errors.email && touched.email && (
              <p className="text-pink-400">{errors.email}</p>
            )}
          </div>

          <div>
            <h1>Select Your Gender</h1>
            <div className="flex gap-10">
              {radioData.map((radio, i) => {
                return (
                  <Radio
                    key={i}
                    checked={values.gender === radio.value}
                    name="gender"
                    onChange={handleChange}
                    label={radio.label}
                    value={radio.value}
                    color={radio.color}
                  />
                );
              })}
            </div>

            <div>
              <h1>Select Your Hobby</h1>
              <div className="flex w-max gap-4">
                {checkData.map((check, i) => {
                  return (
                    <Checkbox
                      key={i}
                      checked={values.hobbies.includes(check.value)}
                      name="hobbies"
                      onChange={handleChange}
                      label={check.label}
                      value={check.value}
                      color={check.color}
                    />
                  );
                })}
              </div>
              {errors.hobbies && touched.hobbies && (
                <p className="text-pink-400">{errors.hobbies}</p>
              )}
            </div>

            <div className="w-72 my-3">
              <Select
                value={values.country}
                name="country"
                onChange={(e) => setFieldValue("country", e)}
                label="Select Country">
                <Option value="nepal">Nepal</Option>
                <Option value="india">India</Option>
                <Option value="china">China</Option>
              </Select>
            </div>

            <div className="w-96">
              <Textarea
                name="msg"
                onChange={handleChange}
                value={values.msg}
                label="Message"
              />
            </div>

            <div className="w-96 my-3">
              <h1>Please Select an Image</h1>
              <Input
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.addEventListener("load", (e) => {
                    setFieldValue("imageReview", e.target.result);
                  });
                  setFieldValue("image", file);
                }}
                type="file"
              />

              {values.imageReview && <img src={values.imageReview} alt="" />}

              {errors.image && touched.image && (
                <p className="text-pink-400">{errors.image}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateForm;

const radioData = [
  {
    label: "Male",
    color: "red",
    value: "male",
  },
  {
    label: "Female",
    color: "purple",
    value: "female",
  },
];

const checkData = [
  {
    label: "Cricket",
    color: "green",
    value: "cricket",
  },
  {
    label: "Football",
    color: "blue",
    value: "football",
  },
  {
    label: "Coding",
    color: "orange",
    value: "coding",
  },
  {
    label: "Dance",
    color: "purple",
    value: "dance",
  },
];
