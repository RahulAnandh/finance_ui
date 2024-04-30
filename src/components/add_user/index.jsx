import { useState } from "react";
import "./index.css";
const AddUserIndex = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    authorization: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              name="first_name"
              onChange={(e) => onChange(e)}
            />
          </label>
          <label>
            Last Name
            <input type="text" name="last_name" onChange={(e) => onChange(e)} />
          </label>
          <label>
            E-Mail
            <input type="email" name="email" onChange={(e) => onChange(e)} />
          </label>
          <label>
            Phone Number
            <input type="text" name="phone" onChange={(e) => onChange(e)} />
          </label>
          <label>
            Gender
            <select name="gender" id="cars" onChange={(e) => onChange(e)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Authorization
            <select
              name="authorization"
              id="cars"
              onChange={(e) => onChange(e)}
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="accounting_manager">Accounting Manager</option>
              <option value="accountant">Accountant</option>
              <option value="purchase_mananger">Purchase Mananger</option>
              <option value="sales_manager">Sales Manager</option>
              <option value="sales_excecutive">Sales Excecutive</option>
              <option value="hr_mananger">Human Resource Manager</option>
            </select>
          </label>
          <input type="submit" value="Add User" />
        </form>
      </div>
    </>
  );
};
export default AddUserIndex;
