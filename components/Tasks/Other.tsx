import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Other = () => {
  const [sfid, setSfid] = useState<String>("");
  const [userState, setUserState] = useState("");
  const { data } = useSession();

  useEffect(() => {
    const fetchSfid = async () => {
      try {
        const response = await axios.post(
          "https://mysteps.freedomcare.com/api/getSfid",
          {
            email: data?.user?.email,
          }
        );

        setSfid(response?.data.sfid);
        setUserState(response?.data?.state || "NY");
      } catch (error) {
        console.log(error);
      }
    };

    fetchSfid();
  }, []);

  //freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=0038G000009BRDmQAO

  //  // https://freedomcareny.my.salesforce-sites.com/issProject?recordId=${sfid}&state=NY&ShowRecordType=OtherDocs

  return (
    <>
      <iframe
        id="documents"
        src={`https://freedomcareny.my.salesforce-sites.com/issProject?recordId=${sfid}&state=${userState}&ShowRecordType=OtherDocs`}
        title="document management"
        className="w-full h-full"
      ></iframe>
    </>
  );
};

export default Other;
