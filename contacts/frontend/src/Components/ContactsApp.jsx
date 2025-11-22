///////////////////////////////////////////////////////////////////////////////////
// Importing Files
import { useEffect, useState } from "react";
import axios from "axios";
import ContactsCardContainer from "./ContactsCardContainer";
import ContactForm from "./ContactForm";


export default function ContactsApp() {
  //////////////////////////////////////////
  // States
  const [contactData, setContactData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  //////////////////////////////////////////
  // useEffect
  useEffect(() => {
    handleContactsDB();
  }, [postResponse]);

  //////////////////////////////////////////
  // React Hook Form
 
  //////////////////////////////////////////
  // Handlers
  // Fetching data from the database
  const handleContactsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/contacts");
      setContactData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  // Handle to reset the form
  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      image: ""
    });
  };

  // Handle the onChange event for the form
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      };
    });
  };


  // Handle the submission data
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        handleOnUpdate(formData._id);
        handleResetForm();
        setIsEditing(false);
      } else {
        await axios
          .post("http://localhost:3000/contacts", formData)
          .then((response) => {
            setPostResponse(response.data.m);
            console.log(response);
          })
          .then(() => handleResetForm());
        handleContactsDB();
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  // Handling edit contact
  const handleOnEdit = async (id) => {
    try {
       const contactToEdit = await axios.get(`http://localhost:3000/contacts/${id}`);
      console.log(contactToEdit);
      setFormData({
        name: contactToEdit.data.name,
        phone: contactToEdit.data.contact.phone,
        email: contactToEdit.data.contact.email,
        address: contactToEdit.data.contact.address,
        image: contactToEdit.data.image,
      });
      setIsEditing(true);
      // handleContactsDB();
      // setPostResponse("Contact updated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handling update contact in the database by id
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/contacts/${id}`, 
        formData
      );
      setPostResponse({message: result.data.message, date: result.data.date});
       
      // handleContactsDB();
      // setPostResponse("Contact updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Handling delete contact from the database by id
  const handleOnDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/contacts/${id}`)
        .then((response) => {
          setPostResponse(response.data.message);
        });
      // handleContactsDB();
      // setPostResponse("Contact deleted successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  //////////////////////////////////////////
  // Render

 
  

  return (
    <div>
      <ContactForm
         name={formData.name}
        email={formData.email}
        address={formData.address}
        phone={formData.phone}
        image={formData.image}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
        isEditing={isEditing}
      />
      <p style={{ color: "green" }}>{postResponse?.message}</p>
      <ContactsCardContainer
        contacts={contactData}
        handleOnDelete={handleOnDelete}
        handleOnEdit={handleOnEdit}
      />
    </div>
  );
}