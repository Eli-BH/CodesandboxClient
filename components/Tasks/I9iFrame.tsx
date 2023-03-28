import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
const I9iFrame = (): JSX.Element => {
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

        console.log(response?.data);
        setSfid(response?.data.sfid);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSfid();
  }, []);
  // https://freedomcareny--lightning.sandbox.lightning.force.com/lightning/n/I9Page
  return (
    <>
      <iframe
        id="documents"
        src={`https://freedomcareny--dev.sandbox.my.salesforce-sites.com/issProject?recordId=${sfid}&ShowRecordType=EmploymentDocs&state=NY`}
        title="document management"
        className="w-full h-full"
      ></iframe>
    </>
  );
};

export default I9iFrame;
