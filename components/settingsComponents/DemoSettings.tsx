import React from 'react'

const NameChange = ({title}):JSX.Element =>(
    
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col justify-evenly items-center bg-stone-50 rounded-md"
    >
        
        <p>{title}</p>
        <label className="w-3/4 flex flex-col">
            First Name: 

            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="First Name"
            />
      </label>

      <label className="w-3/4 flex flex-col">
            Last Name: 
            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="Last Name"
            />
      </label>

    </form>
);

const AddressChange = ({title}):JSX.Element =>(
    
    <form
      autoComplete="off"
      className="h-[90%] flex flex-col justify-evenly items-center bg-stone-50 rounded-md"
    >
        
        <p>{title}</p>
        <label className="w-3/4 flex flex-col">
            Address: 

            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="Street Address"
            />
      </label>

      <label className="w-3/4 flex flex-col">
            City/Town: 
            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="City"
            />
      </label>

      <label className="w-3/4 flex flex-col">
            State: 
            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="State"
            />
      </label>

      <label className="w-3/4 flex flex-col">
            Zip Code: 
            <input
                className="w-full mb-3"
                type="number"
                autoComplete="off"
                placeholder="Zip Code"
            />
      </label>

    </form>
);


const NumberChange = ({title}):JSX.Element =>(
    
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col justify-evenly items-center bg-stone-50 rounded-md"
    >
        
        <p>{title}</p>
        <label className="w-3/4 flex flex-col">
            Phone Number: 

            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="Phone Number"
            />
      </label>
    </form>
);


const PasswordChange = ({title}):JSX.Element =>(
    
    <form
      autoComplete="off"
      className="h-[80%] flex flex-col justify-evenly items-center bg-stone-50 rounded-md"
    >
        
        <p>{title}</p>
        <label className="w-3/4 flex flex-col">
            Password: 

            <input
                className="w-full"
                type="text"
                autoComplete="off"
                placeholder="Password"
            />
      </label>
    </form>
);




const DemoSettings = ({setting}):JSX.Element => {

    const settingsRoutes = ():JSX.Element =>{
        switch (setting) {
            case "name":
                return <NameChange title={titles[setting]}/>

            case "address":
                return <AddressChange title={titles[setting]}/>
            
            case "number":
               return <NumberChange title={titles[setting]}/>

            case "password":
                return <PasswordChange title={titles[setting]}/>
        
            default:
                break;
        }
    }
{/**
const settings:string[] = ["Change Name", "Change Address", "Change Number","Change Password", "Change Profile Photo"];
const links:string[] = ["name", "address", "number", "password", "photo"];
*/}

    const titles = {
        name : "Change Name",
        address : "Change Address",
        number : "Change Number",
        password : "Change Password",
        photo : "Change Profile Photo"
    }

  return (
    //Switch Statement Here
    <>{settingsRoutes()}</>
  )
}

export default DemoSettings