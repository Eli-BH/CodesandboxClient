import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Other = () => {
  const [sfid, setSfid] = useState<String>("");
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchSfid();
  }, []);

  //freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=0038G000009BRDmQAO

  return (
    <>
      <iframe
        onDoubleClick={() =>
          alert(
            `https://freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=${sfid}&ShowRecordType=OtherDocs&state=NY`
          )
        }
        id="documents"
        src={`https://freedomcareny--lightning.sandbox.my.salesforce-sites.com/issProject?recordId=${sfid}&ShowRecordType=OtherDocs&state=NY`}
        title="document management"
        className="w-full h-full"
      ></iframe>
    </>
  );
};

export default Other;
