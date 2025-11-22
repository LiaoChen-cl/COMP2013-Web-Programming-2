import FormComponents from "./FormComponents";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
     //Status
        const [formData, setFormData] = useState({
            username: "",
            password: "",
        });
        const [postResponse, setPostResponse] = useState("");


        //Handlers
        const handleOnChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        };

        const handleRegister = async () => {
            try {
                const response = await axios.post("http://localhost:3000/register", {
                    ...formData
                });
                setPostResponse(response.data.message);
            } catch (error) {
                console.log(error);
            }
        };

        const handleOnSubmit = (e) => {
            e.preventDefault();
            handleRegister();
            setFormData({
                username: "",
                password: "",
            });
        }

    return (
      <div>
        <FormComponents
          formData={formData}
          postResponse={postResponse}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          currentPage="Register"
          nextPage="login"
          
        />
      </div>
    );
}