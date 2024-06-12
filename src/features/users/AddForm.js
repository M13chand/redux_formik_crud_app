import {
  Button,
  Card,
  Checkbox,
  Input,
  Option,
  Radio,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
const AddForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
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
  const {
    handleReset,
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      hobbies: [],
      msg: "",
      country: "",

      imageUrl: null,
    },
    onSubmit: (val) => {
      const newUser = {
        username: val.username,
        email: val.email,
        gender: val.gender,
        hobbies: val.hobbies,
        msg: val.msg,
        country: val.country,
        imageReview: val.imageReview,
        id: nanoid(),
      };
      dispatch(addUser(newUser));
      nav(-1);
    },
    validationSchema: userSchema,
  });

  return (
    <div className="m-5 ">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Your Detail
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details here.
        </Typography>
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="max-w-96 mb-6 ">
            <Input
              label="Username"
              name="username"
              onChange={handleChange}
              onReset={handleReset}
              value={values.username}
            />
            {errors.username && touched.username && (
              <p className="text-red-500 text-xs px-2 py-2">
                {errors.username}
              </p>
            )}
          </div>
          <div className="max-w-96 mb-6 ">
            <Input
              name="email"
              label="Email"
              onChange={handleChange}
              onReset={handleReset}
              value={values.email}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs px-2 py-2">{errors.email}</p>
            )}
          </div>

          <div>
            <h1>Select your gender</h1>
            {radioData.map((rad, i) => {
              return (
                <Radio
                  key={i}
                  name="gender"
                  onChange={handleChange}
                  label={rad.label}
                  value={rad.value}
                  color={rad.color}
                />
              );
            })}
          </div>
          <div>
            <h1>Select your Hobbies</h1>
            {checkData.map((ch, i) => {
              return (
                <Checkbox
                  key={i}
                  name="hobbies"
                  onChange={handleChange}
                  label={ch.label}
                  value={ch.value}
                  color={ch.color}
                />
              );
            })}
          </div>
          <div className="flex w-72 flex-col gap-6 py-6 ">
            <Select
              size="md"
              name="country"
              label="Select Country"
              error={errors.country}
              onChange={(e) => setFieldValue("country", e)}>
              <Option value="nepal">Nepal</Option>
              <Option value="india">India</Option>
              <Option value="china">China</Option>
              <Option value="london">London</Option>
              <Option value="usa">USA</Option>
            </Select>
          </div>
          {errors.country && touched.country && (
            <p className="text-red-500 text-xs px-2 py-2">{errors.country}</p>
          )}

          <div className="w-96 pb-6">
            <Textarea
              onReset={handleReset}
              onChange={handleChange}
              label="Message"
              name="msg"
              value={values.msg}
            />
          </div>

          <div>
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
              <p className="text-red-500 text-xs px-2 py-2">{errors.image}</p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="mt-6" fullWidth>
              Submit
            </Button>
            <Button type="reset" className="mt-6" fullWidth>
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddForm;

const radioData = [
  {
    label: "Male",
    color: "blue",
    value: "male",
  },
  {
    label: "Female",
    color: "pink",
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
