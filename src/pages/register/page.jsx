import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { Input } from "../../Components/ui/input";
import { Button } from "../../Components/ui/button";
import * as Yup from "yup";
import { AxiosError } from "axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import Cookies from "js-cookie";


const Register = () => {
  const navigate = useNavigate();

  const [user, SetUser] = useContext(AuthContext);
  const { getFieldProps, handleSubmit, touched, errors, resetForm } = useFormik(
    {
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        roleId: 2,
        password: "",
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        roleId: Yup.number().required(),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Required"),
      }),
      onSubmit: async (detail) => {
        try {
          const { data } = await axios.post(
            `https://book-e-sell-node-api.vercel.app/api/user`,
            detail
          );
          toast("success", { position: "bottom-right" });
          SetUser(data.result);
          Cookies.set("id", `${data.result.id}`);
          navigate("/");
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response.data);
          }
          toast(error.response.data.error);
        }
      },
    }
  );
  return (
    <>
      <div className="flex flex-col max-w-xl gap-3 p-4  mx-auto my-20 ">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        <label>Fist name</label>
        <Input
          type="text"
          id="firstName"
          label="firstName"
          {...getFieldProps("firstName")}
          className="border border-black"
        />
        <label>Last name</label>
        <Input
          type="text"
          id="lastName"
          label="lastName"
          {...getFieldProps("lastName")}
          className="border border-black"
        />
        <label>Email</label>
        <Input
          type="text"
          id="email"
          label="email"
          {...getFieldProps("email")}
          className="border border-gray-500"
        />
        {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null}
        <label>Password</label>
        <Input
          type="password"
          id="password"
          label="password"
          {...getFieldProps("password")}
          className="border border-black"
        />
        
        {touched.password && errors.password ? (
          <p className="text-red-500">{errors.password}</p>
        ) : null}

        <Button onClick={() => handleSubmit()} type="submit">Register</Button>
      </div>
    </>
  );
};

export default Register;
